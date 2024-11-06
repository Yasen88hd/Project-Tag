import random

from flask_socketio import SocketIO, emit, ConnectionRefusedError, disconnect, join_room, rooms, leave_room, send
import uuid
from mysql.connector import pooling
from sqlalchemy import false

from utils import *

io = SocketIO(manage_session=False)

#  GAME constants
TEAMS = ['Runners', 'Seekers']

@io.on('connect')
@login_required
def socket_connection():
    with connection_pool.get_connection() as cxn:
        with cxn.cursor() as cursor:
            sql = "SELECT sessionId FROM users WHERE id = %s"
            cursor.execute(sql, (session['userId'], ))
            sessionId = cursor.fetchone()[0]
            if False or sessionId and sessionId != request.sid:
                # Bypass so it wooooorks!!!
                raise ConnectionRefusedError('User already connected')
            else:
                sql = cleandoc("""
                    UPDATE users
                    SET sessionId = %s
                    WHERE id = %s
                """)
                cursor.execute(sql, (request.sid, session['userId'], ))
                print("Client connected with sid: " + request.sid)

@io.on('disconnect')
def socket_disconnection():
    with connection_pool.get_connection() as cxn:
        with cxn.cursor() as cursor:
            sql = cleandoc("""
                UPDATE users
                SET sessionId = NULL
                WHERE id = %s AND sessionId = %s
            """)
            cursor.execute(sql, (session['userId'], request.sid, ))
    print("Client disconnected with sid: " + request.sid)

@io.event
@login_required
def create_game(name):
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    code = ''.join(random.choice(alphabet) for i in range(4))
    with connection_pool.get_connection() as cxn:
        with cxn.cursor() as cursor:
            sql = "INSERT INTO games(name) VALUES(%s)"
            cursor.execute(sql, (name, ))
            sql = "INSERT INTO game_code(code, gameId) VALUE(%s, LAST_INSERT_ID())"
            cursor.execute(sql, (code, ))
    join_game(code)
    return code

@io.event
@login_required
def join_game(code):
    with connection_pool.get_connection() as cxn:
        with cxn.cursor() as cursor:
            sql = cleandoc("""
                SELECT (gameId) FROM game_code
                WHERE code = %s
            """)
            cursor.execute(sql, (code, ))
            result = cursor.fetchone()
            if (result is None):
                return 'Invalid code'
            else:
                gameId = result[0]

                room = f'game:{gameId}'
                join_room(room)

                sql = "INSERT INTO game_players(gameId, playerId) VALUE(%s, %s)"
                cursor.execute(sql, (gameId, session['userId'], ))

                # emit('player-joined', [{'username': g.user['username']}], to=room)
                # setup_player() # send player the settings & player list
                emit('joined_game')

@io.event
@login_required
def leave_game():
    game = getGameByUserId(session['userId'])
    if game:
        room = f'game:{game['id']}'
        emit('left_game')
        emit('player-left', [{'username': g.user['username']}], to=room)
        leave_room(room)
    else:
        emit('error', 'User not currently in game')

@io.event
@login_required
def start_game():
    game = getGameByUserId(session['userId'])
    if game:
        game_room = f'game:{game['id']}'
        with connection_pool.get_connection() as cxn:
            with cxn.cursor() as cursor:
                sql = cleandoc("""
                    SELECT u.sessionId
                    FROM game_players AS gp
                    INNER JOIN users AS u ON gp.playerId = u.id
                    WHERE gp.gameId = %s;
                """)
                cursor.execute(sql, (game['id'], ))
                SIDs = [item[0] for item in cursor.fetchall()]
                for sid in SIDs:
                    team = random.choice(TEAMS)
                    emit('game-started', team)
                    join_room(f'team_{team}:{game['id']}')

@io.event
@login_required
def update_location(location):
    raise NotImplementedError()
    game = getGameByUserId(session['userId'])
    if game:
        game_room = f'game:{game['id']}'
        with connection_pool.get_connection() as cxn:
            with cxn.cursor() as cursor:
                sql = cleandoc("""
                    UPDATE game_players
                    SET lastLocation = POINT(%s, %s)
                    WHERE playerId = %s;
                """)
                cursor.execute(sql, (location[0], location[1], session['userId'], ))
                emit('player-moved', (g.user['username'], location), to=game_room)

@io.event
@login_required
def catch_player(caught_name):
    raise NotImplementedError()
    # check if players are located near each other
    #

    caught_user = getUserByName(caught_name)
    game = getGameByUserId(session['userId'])
    if game:
        game_room = f'game:{game['id']}'
        with connection_pool.get_connection() as cxn:
            with cxn.cursor() as cursor:
                sql = cleandoc("""
                    SELECT team
                    FROM game_players
                    WHERE playerId = %s
                """)
                cursor.execute(sql, (session['userId'], ))
                newTeam = cursor.fetchone()[0]

                sql = "UPDATE game_players SET team = %s WHERE playerId = %s;"
                cursor.execute(sql, (newTeam, caught_user['id'], ))

                sql = cleandoc("""
                    INSERT INTO game_catches(gameId, catcherId, victimId)
                    VALUE (%s, %s, %s);
                """)
                cursor.execute(sql, (game['id'], session['userId'], caught_user['id'], ))

                emit('player-caught', (caught_name, g.user['username'], newTeam, ), to=game_room)

@io.event
@login_required
def update_settings():
    raise NotImplementedError()