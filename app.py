from flask_sqlalchemy import SQLAlchemy
from pymysql.err import IntegrityError
from flask import Flask, request, url_for, redirect, make_response, session, jsonify, g, send_from_directory, \
    has_request_context
from flask_session import Session

from socketio_setup import io
from utils import *

from dotenv import dotenv_values
from inspect import cleandoc
from functools import wraps

config = dotenv_values(".env")
app = Flask(__name__)
app.debug = True
app.secret_key = config['APP_SECRET_KEY'].encode('utf-8')
app.config['SESSION_TYPE'] = 'sqlalchemy'  # Use SQLAlchemy to handle session storage
app.config['SESSION_USE_SIGNER'] = True    # Adds an HMAC to session cookies
app.config['SESSION_PERMANENT'] = False    # Makes the session non-permanent
app.config['SESSION_SQLALCHEMY_TABLE'] = 'flask-sessions'  # Table name
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://localhost/biketag"
app.config['SESSION_SQLALCHEMY'] = SQLAlchemy(app)

# Initializes the SocketIO object
io.init_app(app)

# Create and initialize the Flask-Session object AFTER `app` has been configured
server_session = Session(app)

@app.after_request
def cors_bypass(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route("/")
def index():
    return cleandoc("""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Login</title>
            <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
            <script type="text/javascript" src="/assets/js/sha.js"></script>
        </head>
        <body>
            <form action="/api/login" method="POST" id="loginForm">
                <input type="text" name="username" placeholder="username" required>
                <input type="text" name="password" placeholder="password" required>
                <input type="submit" value="submit">
            </form>
        
            <script type="text/javascript">
                $("#loginForm").on('submit', function() {
                    pass = $("#loginForm input[name='password']").val();
        
                    const hash = new jsSHA("SHA-384", "TEXT");
                    hash.update(pass);
                    hashedPass = hash.getHash('HEX');
        
                    $("#loginForm input[name='password']").val(hashedPass);
                    return true;
                })
            </script>
        </body>
        </html>
    """)

@app.route('/assets/<path:path>')
def getAsset(path):
    return send_from_directory('assets', path)

@app.route('/test')
def socket_test():
    return send_from_directory('tests', 'socket_test_page.html')

@app.route("/home")
@login_required
def home():
    return "<p>Hello, World!</p>"

@app.route("/api/addFriend", methods=['POST'])
@login_required
def addFriend():
    friendName = request.form.get('username')

    friend = getUserByName(friendName)

    if (friend):
        with connection_pool.get_connection() as cxn:
            with cxn.cursor() as cursor:
                sql = cleandoc("""
                    INSERT INTO notifications (receiverId, type) VALUE (%s, 'friend_request');
                    INSERT INTO friend_request_notifications (notificationId, senderId) VALUE (LAST_INSERT_ID(), %s);
                """)
                cursor.execute(sql, (friend['id'], g.user['id'] ))
    else:
        return "User doesn't exist", 400

@app.route("/api/acceptFriend", methods=['POST'])
@login_required
def acceptFriend():
    senderName = request.form.get('username')
    sender = getUserByName(senderName)

    if (sender):
        with connection_pool.get_connection() as cxn:
            with cxn.cursor() as cursor:
                sql = cleandoc("""
                    SELECT n.id
                    FROM notifications AS n
                    INNER JOIN friend_request_notifications AS f
                    ON n.id = f.notificationId
                    WHERE f.senderId = %s AND n.receiverId = %s
                """)
                cursor.execute(sql, (sender['id'], g.user['id'] ))
                notificationId = cursor.fetchone()
                if (notificationId):
                    sql = cleandoc("""
                        DELETE FROM friend_request_notifications WHERE notificationId = %s;
                        DELETE FROM notifications WHERE id = %s;
                        INSERT INTO friends (firstUserId, secondUserId) VALUE (%s, %s);
                    """)
                    cursor.execute(sql, (notificationId, notificationId, sender['id'], g.user['id'] ))
                else:
                    return "Invalid request", 400
    else:
        return "User doesn't exist", 400

@app.route("/api/denyFriend", methods=['POST'])
@login_required
def denyFriend():
    senderName = request.form.get('username')

    sender = getUserByName(senderName)

    if (sender):
        with connection_pool.get_connection() as cxn:
            with cxn.cursor() as cursor:
                sql = cleandoc("""
                    SELECT n.id
                    FROM notifications AS n
                    INNER JOIN friend_request_notifications AS f
                    ON n.id = f.notificationId
                    WHERE f.senderId = %s AND n.receiverId = %s
                """)
                cursor.execute(sql, (sender['id'], g.user['id'] ))
                notificationId = cursor.fetchone()
                if (notificationId):
                    sql = cleandoc("""
                        DELETE FROM friend_request_notifications WHERE notificationId = %s;
                        DELETE FROM notifications WHERE id = %s;
                    """)
                    cursor.execute(sql, (notificationId, notificationId ))
                else:
                    return "Invalid request", 400
    else:
        return "User doesn't exist", 400

@app.route("/api/removeFriend", methods=['POST'])
@login_required
def removeFriend():
    friendName = request.form.get('username')

    friend = getUserByName(friendName)

    if (friend):
        with connection_pool.get_connection() as cxn:
            with cxn.cursor() as cursor:
                sql = cleandoc("""
                    DELETE FROM friends
                    WHERE (firstUserId = %s AND secondUserId = %s)
                        OR (firstUserId = %s AND secondUserId = %s)
                """)
                cursor.execute(sql, (friend['id'], g.user['id'], g.user['id'], friend['id']))
                deletedRows = cursor.rowcount
                if (deletedRows == 0):
                    return 'Invalid request', 400
    else:
        return "User doesn't exist", 400

@app.route("/api/getFriends", methods=['GET'])
@login_required
def getFriends():
    with connection_pool.get_connection() as cxn:
        with cxn.cursor() as cursor:
            sql = cleandoc("""
                SELECT u.id, u.username, u.isOnline FROM friends AS f
                INNER JOIN users AS u
                ON u.id != %s AND (u.id = f.firstUserId OR u.id = f.secondUserId)
                WHERE f.firstUserId = %s OR f.secondUserId = %s
            """)
            cursor.execute(sql, (g.user['id'], g.user['id'], g.user['id']))
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
    print(f'({user}, {passwd})')
    if (user and passwd):

        if (not (isinstance(user, str) and len(user) > 0)):
            raise Exception(f"Username is empty")
        if (not (isinstance(passwd, str) and len(passwd) == 96)):
            raise Exception("Password is invalid")

        user = getUserByName(user)
        if (user is None):
            return 'Wrong username', 400
        if (user['password'] != passwd):
            return 'Wrong password', 400

        session['userId'] = user['id']
        return 'Success'
    else:
        return 'Invalid username or password', 400

@app.route("/api/register", methods=['POST'])
def register():
    user = request.form.get('username')
    passwd = request.form.get('password')
    if (user and passwd):

        if (not (isinstance(user, str) and len(user) > 0)):
            raise Exception("Username is empty")
        if (not (isinstance(passwd, str) and len(passwd) == 96)):
            raise Exception("Password is empty")

        with connection_pool.get_connection() as cxn:
            with cxn.cursor() as cursor:
                try:
                    sql = 'INSERT INTO users (username, password) VALUE (%s, %s)'
                    cursor.execute(sql, (user,passwd))
                except IntegrityError as e:
                    if (e.args[0] == 1062): # Duplicate entry
                        return 'Username is already taken', '400'
                    else:
                        raise e
        return 'Success'

if __name__ == "__main__":
    app.run()
