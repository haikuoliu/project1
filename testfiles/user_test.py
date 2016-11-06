from flask import request
from utils.connect_db import *
from utils.constants_funcs import *
import json
from flask import g
from sqlalchemy import *
from utils.time_format import *

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



sid = 1

# Update first
exe_sql = "SELECT set_id FROM user_sets WHERE sid = %s"
rows = conn.execute(exe_sql, sid).fetchall()

exe_sql = "SELECT * FROM user_sets WHERE sid = %s"
rows = conn.execute(exe_sql, sid).fetchall()
user_sets = []
for row in rows:
    user_set = {
        "sid": row["sid"],
        "set_id": row["set_id"],
        "filters": row["filters"],
        "description": row["description"],
        "size": row["size"]
    }
    user_sets.append(user_set)
ret = {}
ret[STATUS] = SUCCESS
ret[RESULT] = user_sets
print ret




