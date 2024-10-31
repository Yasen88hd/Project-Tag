import pymysql

db = pymysql.connect(
    host='localhost',
    user='Anon',
    database='biketag',
    autocommit=True, # Auto commit ENABLED
)