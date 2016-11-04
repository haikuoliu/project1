from sqlalchemy import *
from flask import request
from utils.connect_db import *
from utils.constants import *
from utils.time_format import *
import json
import time
import calendar
from datetime import datetime, date

#
# host = "localhost"
# password = ""
# user = "HaikuoLiu"
# url = "postgresql://%s:%s@%s/postgres" % (user, password, host)
# db = create_engine(url)
# conn = db.connect()
#
#
# def add_b_safe(conn, value):
#     cc = "cc"
#     res = conn.execute("update cc set b = %s; update dd set b = %s;", (value, "4"))
#    #  res = conn.execute("update cc set b = %s;" % value )
#     if res.returns_rows:
#         for row in res:
#             print row
# add_b_safe(conn, "abcd")


# id = 1
# dbres = conn.execute("select * from users", id)
# # row = dbres.fetchone()
# # res = {""}
# res = []
# for row in dbres:
#     tmp = {}
#     tmp['time'] = row['reg_t']
#     res.append(tmp)
#
# ret = {
#     "status": "succ",
#     "result": res
# }
# print ret



# print time.mktime(tmp[1].timetuple())
# return json.dumps(list(rows[0])[3:])


# These are the key lines:

# # We now have a pointer to a remote database
# db = create_engine(url)
#
# # We now actually create the connection.  This means that the database has allocated resources
# # to a network connection and returned a handle to the connection.
# conn = db.connect()
#
# print conn;
# res = conn.execute("select * from users")
# rows = res.fetchall()
# print rows


myid = 2
otherid = 1
exe_sql = "select * from users where uid = %s"
res = conn.execute(exe_sql, otherid)
row = res.fetchone()
ret = {}
if row:
    ret[STATUS] = SUCCESS
    timestamp1 = time.mktime(row["birth"].timetuple())
    dt = datetime.fromtimestamp(timestamp1)
    print dt
    u_info = {
        "uid": row["uid"],
        "email": row["email"],
        "birth_tmp": row["birth"],
        "birth": date_to_timestamp(row["birth"]),
        "sex": row["sex"],
        "name": row["name"]
    }
    exe_sql = "select count(*) as count from follows where source = %s and destination = %s"
    res = conn.execute(exe_sql, (myid, otherid))
    if res.fetchone()["count"] == "1":
        u_info["isFollow"] = TRUE
    else:
        u_info["isFollow"] = FALSE
    exe_sql = "select count(*) as count from follows where destination = %s;"
    res = conn.execute(exe_sql, otherid)
    u_info["follows"] = int(res.fetchone()["count"])
    ret[RESULTS] = u_info
else:
    ret[STATUS] = FAIL
    fail_info = dict()
    fail_info[CODE] = "0"
    fail_info[MSG] = "User None Exist"
    ret[RESULTS] = fail_info
print ret