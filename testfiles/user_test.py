from flask import request
from utils.connect_db import *
from utils.constants import *
import json
import time


# view profile
# myid = "1"
# otherid = "2"
# exe_sql = "select * from users where uid = %s"
# res = conn.execute(exe_sql, myid)
# row = res.fetchone()
# ret = dict()
# if row:
#     ret[STATUS] = SUCCESS
#     u_info = dict()
#     u_info["uid"] = row["uid"]
#     u_info["email"] = row["email"]
#     u_info["birth"] = time.mktime(row["birth"].timetuple())
#     u_info["sex"] = row["sex"]
#     u_info["name"] = row["name"]
#     exe_sql = "select count(*) as count from follows where source = %s and destination = %s"
#     res = conn.execute(exe_sql, (myid, otherid))
#     if res.fetchone()["count"] == "1":
#         u_info["isFollow"] = TRUE
#     else:
#         u_info["isFollow"] = FALSE
#     exe_sql = "select count(*) as count from follows where destination = %s group by destination;"
#     res = conn.execute(exe_sql, otherid)
#     u_info["follows"] = int(res.fetchone()["count"])
#     ret[RESULTS] = u_info
# else:
#     ret[STATUS] = FAIL
#     fail_info = dict()
#     fail_info[CODE] = "0"
#     fail_info[MSG] = "User None Exist"
#     ret[RESULTS] = fail_info
# print ret


# subscribes
id = 1
exe_sql = "select topic from subscribes where uid = %s"
res = conn.execute(exe_sql, id)
rows = res.fetchall()
ret = dict()
if rows:
    ret[STATUS] = SUCCESS
    topics = []
    for row in rows:
        topics.append(row["topic"])
    ret[RESULTS] = topics
else:
    ret[STATUS] = FAIL
    fail_info = dict()
    fail_info[CODE] = "0"
    fail_info[MSG] = "None topics"
    ret[RESULTS] = fail_info
print ret

