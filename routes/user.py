from flask import request
from utils.connect_db import *
from utils.constants import *
from utils.time_format import *
import json
from . import routes
import time


# return all info of an user
# /api/users/view_profile?myid=1&otherid=2
@routes.route('/api/users/view_profile', methods=['GET'])
def view_user_profile():
    if request.method == 'GET':
        try:
            myid = request.args.get('myid')
            otherid = request.args.get('otherid')
            exe_sql = "select * from users where uid = %s"
            res = conn.execute(exe_sql, otherid)
            row = res.fetchone()
            ret = {}
            if row:
                ret[STATUS] = SUCCESS
                u_info = {
                    "uid"  : row["uid"],
                    "email": row["email"],
                    "birth": date_to_timestamp(row["birth"]),
                    "sex"  : row["sex"],
                    "name" : row["name"]
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
            return json.dumps(ret)
        except:
            return json.dumps({
                "status": 'fail',
                "result": {
                    "msg": "Unknown Error"
                }
            })


# return topics subscribed by an user
# /api/users/subscribes?id=2
@routes.route('/api/users/subscribes', methods=['GET'])
def user_subscribes():
    if request.method == 'GET':
        id = request.args.get('id')
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
        return json.dumps(ret)
