from flask import request
from utils.connect_db import *
from utils.constants import *
import json
from flask import g
from sqlalchemy import *

# host = "104.196.175.120"
# password = "che2q"
# user = "hl3023"
host = "localhost"
password = ""
user = "HaikuoLiu"
url = "postgresql://%s:%s@%s/postgres" % (user, password, host)
db = create_engine(url)
conn = db.connect()
if conn: print "connected to db"
else: print "connection failed"





isLike = "0"
uid = 1
eid = 2
# cancle like
if isLike == "0":
    exe_sql = "DELETE FROM likes WHERE uid = %s AND eid = %s"
    g.conn.execute(exe_sql, uid, eid)
# create like
elif isLike == "1":
    exe_sql = "INSERT INTO likes(uid, eid) VALUES(%s, %s)"
    g.conn.execute(exe_sql, uid, eid)
else:
    raise Exception("isLike should be either 0 or 1")
ret = {}
ret[STATUS] = SUCCESS
ret[RESULT] = NULL
print ret

