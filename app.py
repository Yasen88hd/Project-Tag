from dotenv import dotenv_values
from pymysql.err import IntegrityError
from flask import Flask, request, url_for, redirect, make_response, session, jsonify

from inspect import cleandoc

from db import db
from functools import wraps

config = dotenv_values(".env")
app = Flask(__name__)
app.secret_key = config['APP_SECRET_KEY'].encode('utf-8')

def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'userId' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return wrap

def getUserByName(user):
    with db.cursor() as cursor:
        sql = "SELECT id, password FROM users WHERE username = %s"
        cursor.execute(sql, (user,))
        results = cursor.fetchall()
        if (len(results) == 0):
            return None

        return {
            'id': int(results[0][0]),
            'username': user,
            'password': results[0][1]
        }

def getUserById(id : int):
    with db.cursor() as cursor:
        sql = "SELECT username, password FROM users WHERE id = %s"
        cursor.execute(sql, (id,))
        result = cursor.fetchone()
        if (result is None):
            return None

        return {
            'id': id,
            'username': result[0],
            'password': result[1]
        }

@app.route("/")
def index():
    return "<p>Goodbye, Cruel World!</p>"

@app.route("/home")
@login_required
def home():
    return "<p>Hello, World!</p>"

@app.route("/api/addFriend", methods=['POST'])
@login_required
def addFriend():
    friendName = request.form.get('username')

    user = getUserById(session['userId'])
    friend = getUserByName(friendName)

    if (friend is not None):
        with db.cursor() as cursor:
            sql = cleandoc("""
                INSERT INTO notifications (receiverId, type) VALUE (%s, 'friend_request');
                INSERT INTO friend_requestnotifications (notificationId, senderId) VALUE (LAST_INSERT_ID(), %s);
            """)
            cursor.execute(sql, (friend['id'], user['id'] ))
    else:
        return "User doesn't exist", 402

@app.route("/api/acceptFriend", methods=['POST'])
@login_required
def acceptFriend():
    senderName = request.form.get('username')

    user = getUserById(session['userId'])
    sender = getUserByName(senderName)

    if (sender is not None):
        with db.cursor() as cursor:
            sql = cleandoc("""
                SELECT n.id
                FROM notifications AS n
                INNER JOIN friend_requestnotifications AS f
                ON n.id = f.notificationId
                WHERE f.senderId = %s AND n.receiverId = %s
            """)
            cursor.execute(sql, (sender['id'], user['id'] ))
            notificationId = cursor.fetchone()
            if (notificationId is not None):
                sql = cleandoc("""
                    DELETE FROM friend_requestnotifications WHERE notificationId = %s;
                    DELETE FROM notifications WHERE id = %s;
                    INSERT INTO friends (firstUserId, secondUserId) VALUE (%s, %s);
                """)
                cursor.execute(sql, (notificationId, notificationId, sender['id'], user['id'] ))
            else:
                return "Invalid request", 402
    else:
        return "User doesn't exist", 402

@app.route("/api/denyFriend", methods=['POST'])
@login_required
def denyFriend():
    senderName = request.form.get('username')

    user = getUserById(session['userId'])
    sender = getUserByName(senderName)

    if (sender is not None):
        with db.cursor() as cursor:
            sql = cleandoc("""
                SELECT n.id
                FROM notifications AS n
                INNER JOIN friend_requestnotifications AS f
                ON n.id = f.notificationId
                WHERE f.senderId = %s AND n.receiverId = %s
            """)
            cursor.execute(sql, (sender['id'], user['id'] ))
            notificationId = cursor.fetchone()
            if (notificationId is not None):
                sql = cleandoc("""
                    DELETE FROM friend_requestnotifications WHERE notificationId = %s;
                    DELETE FROM notifications WHERE id = %s;
                """)
                cursor.execute(sql, (notificationId, notificationId ))
            else:
                return "Invalid request", 402
    else:
        return "User doesn't exist", 402

@app.route("/api/removeFriend", methods=['POST'])
@login_required
def removeFriend():
    friendName = request.form.get('username')

    user = getUserById(session['userId'])
    friend = getUserByName(friendName)

    if (friend is not None):
        with db.cursor() as cursor:
            sql = cleandoc("""
                DELETE FROM friends
                WHERE (firstUserId = %s AND secondUserId = %s)
                    OR (firstUserId = %s AND secondUserId = %s)
            """)
            cursor.execute(sql, (friend['id'], user['id'], user['id'], friend['id']))
            deletedRows = cursor.rowcount
            if (deletedRows == 0):
                return 'Invalid request', 402
    else:
        return "User doesn't exist", 402

@app.route("/api/getFriends", methods=['GET'])
@login_required
def getFriends():
    user = getUserById(session['userId'])

    with db.cursor() as cursor:
        sql = cleandoc("""
            SELECT u.id, u.username, u.isOnline FROM friends AS f
            INNER JOIN users AS u
            ON u.id != %s AND (u.id = f.firstUserId OR u.id = f.secondUserId)
            WHERE f.firstUserId = %s OR f.secondUserId = %s
        """)
        cursor.execute(sql, (user['id'], user['id'], user['id']))
        results = [{
                        'id': item[0],
                        'username': item[1],
                        'isOnline': item[2]
                    } for item in cursor.fetchall()]

    return jsonify(results)

@app.route("/api/login", methods=['POST'])
def login():
    if ('userId' in session):
        return redirect(url_for('home'))
    user = request.form.get('username')
    passwd = request.form.get('password')
    if (user is not None
            and passwd is not None):

        if (not (isinstance(user, str) and len(user) > 0)):
            raise Exception(f"Username is empty")
        if (not (isinstance(passwd, str) and len(passwd) == 96)):
            raise Exception("Password is empty")

        user = getUserByName(user)
        if (user is None):
            return 'Wrong username', 402
        if (user['password'] != passwd):
            return 'Wrong password', 402

        session['userId'] = user['id']
        return 'Success'
    else:
        return 'Invalid username or password', 402

@app.route("/api/register", methods=['POST'])
def register():
    user = request.form.get('username')
    passwd = request.form.get('password')
    if (user is not None
            and passwd is not None):

        if (not (isinstance(user, str) and len(user) > 0)):
            raise Exception("Username is empty")
        if (not (isinstance(passwd, str) and len(passwd) == 96)):
            raise Exception("Password is empty")

        with db.cursor() as cursor:
            try:
                sql = 'INSERT INTO users (username, password) VALUE (%s, %s)'
                cursor.execute(sql, (user,passwd))
            except IntegrityError as e:
                if (e.args[0] == 1062): # Duplicate entry
                    return 'Username is already taken', '402'
                else:
                    raise e
        return 'Success'

if __name__ == "__main__":
    app.run(debug=True)
