from sqlalchemy import *


# deal with db connection
def connectdb():
    host = "104.196.175.120"
    password = "che2q"
    user = "hl3023"
    # host = "localhost"
    # password = ""
    # user = "HaikuoLiu"
    url = "postgresql://%s:%s@%s/postgres" % (user, password, host)
    db = create_engine(url)
    conn = db.connect()
    if conn: print "connected to db"
    else: print "connection failed"
    return conn;

# if conn == null:
conn = connectdb()
