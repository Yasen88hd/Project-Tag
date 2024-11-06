from functools import wraps
from inspect import cleandoc

from flask import session, has_request_context, request, redirect, url_for, g

from db import connection_pool

def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'userId' not in session:
            if has_request_context():
                if (getattr(request, 'sid', None)):
                    # socketio context
                    raise ConnectionRefusedError('User not logged in')
                else:
                    # flask context
                    return redirect(url_for('index'))
        else:
            # makes user available down the pipeline
            g.user = getUserById(session['userId'])
        return f(*args, **kwargs)

    return wrap


def getUserByName(name):
    with connection_pool.get_connection() as cxn:
        with cxn.cursor() as cursor:
            sql = "SELECT id, password, isAdmin, isOnline FROM users WHERE username = %s"
            cursor.execute(sql, (name,))
            results = cursor.fetchall()
            if (len(results) == 0):
                return None

            user = results[0]

            return {
                'id': int(user[0]),
                'username': name,
                'password': user[1],
                'isAdmin': user[2],
                'isOnline': user[3]
            }


def getUserById(id: int):
    with connection_pool.get_connection() as cxn:
        with cxn.cursor() as cursor:
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


def getGameByUserId(id: int):
    with connection_pool.get_connection() as cxn:
        with cxn.cursor() as cursor:
            sql = cleandoc("""
                SELECT g.id, g.name, g.started, g.duration
                FROM game_players AS gp
                INNER JOIN games AS g ON g.id = gp.gameId
                WHERE gp.playerId = %s
            """)
            cursor.execute(sql, (id,))
            result = cursor.fetchone()
            if (result is None):
                return None

            return {
                'id': result[0],
                'name': result[1],
                'started': result[2],
                'duration': result[3]
            }