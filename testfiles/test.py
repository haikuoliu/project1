
from utils.connect_db import *
from utils.constants import *
from utils.crossdomain import *
import json



eid = 1
print eid
exe_sql = "SELECT events.eid AS eid, users.uid AS uid, name, comments.time AS time, comments.content AS content " \
          "FROM comments, users, events " \
          "WHERE events.eid = %s AND comments.uid = users.uid AND events.eid = comments.eid"
print exe_sql
res = conn.execute(exe_sql, eid)
rows = res.fetchall()
if rows:
    print "succ"
else:
    print "fail"
comments = []
for row in rows:
    comment = {
        "eid": row["eid"],
        "uid": row["uid"],
        "user_name": row["name"],
        "timestamp": row["time"],
        "content": row["content"]
    }
    comments.append(comment)
    print comment
ret = {}
ret[STATUS] = SUCCESS
ret[RESULT] = comments
print ret