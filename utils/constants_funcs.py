import json
from flask import g


# useful functions
# uid likes eid?
def is_like(uid, eid):
    exe_sql = "SELECT count(*) > 0 AS islike FROM likes WHERE uid = %s AND eid = %s"
    islike = g.conn.execute(exe_sql, uid, eid).fetchone()["islike"]
    print type(islike)
    return islike


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
