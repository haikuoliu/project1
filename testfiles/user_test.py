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


# useful functions
# uid likes eid?
def is_likes(uid, eid):
    exe_sql = "SELECT count(*) > 0 AS islike FROM likes WHERE uid = %s AND eid = %s"
    islike = conn.execute(exe_sql, uid, eid).fetchone()["islike"]
    print type(islike)
    return islike

# get topics that an event belongs
def topics_of_events(eid):
    exe_sql = "SELECT belongs.topic AS topic FROM events, belongs " \
              "WHERE events.eid = %s AND events.eid = belongs.eid"
    res = conn.execute(exe_sql, eid)
    rows = res.fetchall()
    topics = []
    for row in rows:
        topics.append(row["topic"])
    return topics



eid = 1
myid = 2
exe_sql = "SELECT * FROM events, users WHERE eid = %s AND events.uid = users.uid"
res = conn.execute(exe_sql, eid)
exe_sql = "SELECT count(*) As count FROM likes WHERE eid = %s"
likes = conn.execute(exe_sql, eid).fetchone()["count"]
row = res.fetchone()
event = {
    "eid": eid,
    "event_type": row["event_type"],
    "description": row["description"],
    "uid": row["uid"],
    "user_name": row["name"],
    "url": row["url"],
    "topics": topics_of_events(eid),
    "likes": likes,
    "islike": is_likes(myid, eid),
    "content": row["content"],
    "title": row["title"]
}
ret = {}
ret[STATUS] = SUCCESS
ret[RESULT] = event
print ret


