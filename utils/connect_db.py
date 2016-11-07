from sqlalchemy import *


# deal with db connection
def connectdb():
    # Zehao's Local Test
    host = "localhost"
    password = "2311163-2315512"
    user = "postgres"
    url = "postgresql://%s:%s@%s/db-webblog" % (user, password, host)

    # Cloud Database
    # host = "104.196.175.120"
    # password = "che2q"
    # user = "hl3023"
    # url = "postgresql://%s:%s@%s/postgres" % (user, password, host)
    
    # Haikuo's Local Test
    # host = "localhost"
    # password = ""
    # user = "HaikuoLiu"
    # url = "postgresql://%s:%s@%s/postgres" % (user, password, host)
    db = create_engine(url)
    return db
    # conn = db.connect()
    # if conn: print "connected to db"
    # else: print "connection failed"
    # return conn;

# if conn == null:
# conn = connectdb()
