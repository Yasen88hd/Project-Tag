# import pymysql
#
# def connect():
#     return pymysql.connect(
#         host='localhost',
#         user='Anon',
#         database='biketag',
#         autocommit=True, # Auto commit ENABLED
#     )

from mysql.connector import pooling

connection_pool = pooling.MySQLConnectionPool(
    pool_name="the_pool",
    pool_size=20,
    pool_reset_session=True,
    host='localhost',
    database='biketag',
    user='Anon',
    autocommit=True
)