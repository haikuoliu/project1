import json
from flask import g


# useful functions
# uid likes eid?
def is_like(uid, eid):
    exe_sql = "SELECT count(*) > 0 AS islike FROM likes WHERE uid = %s AND eid = %s"
    islike = g.conn.execute(exe_sql, uid, eid).fetchone()["islike"]
    return islike


# get topics that an event belongs
def topics_of_event(eid):
    exe_sql = "SELECT belongs.topic AS topic FROM events, belongs " \
              "WHERE events.eid = %s AND events.eid = belongs.eid"
    res = g.conn.execute(exe_sql, eid)
    rows = res.fetchall()
    topics = []
    for row in rows:
        topics.append(row["topic"])
    return topics

# store all constants

NULL = "null"

SUCCESS = "success"

FAIL = "fail"

STATUS = "status"

RESULT = "result"

CODE = "code"

MSG = "msg"

UNIT_PRICE = 5


def default_error_msg(e):
    ret = json.dumps({
                        STATUS: FAIL,
                        RESULT: {
                            CODE: "0",
                            MSG: e
                        }
                    })
    return ret
