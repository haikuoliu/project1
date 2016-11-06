# from utils.connect_db import *
from utils.constants import *
from utils.time_format import *
from utils.crossdomain import *
import json
from . import routes
from flask import g


# return all info of an user
# http://127.0.0.1:8080/api/users/view_profile?myid=1&otherid=2
@routes.route('/api/users/view_profile', methods=['GET'])
@crossdomain(origin='*')
def view_user_profile():
    if request.method == 'GET':
        try:
            myid = request.args.get('myid')
            otherid = request.args.get('otherid')
            exe_sql = "SELECT * FROM users WHERE uid = %s"
            res = g.conn.execute(exe_sql, otherid)
            row = res.fetchone()
            ret = {}
            ret[STATUS] = SUCCESS
            u_info = {
                "uid"  : row["uid"],
                "email": row["email"],
                "birth": date_to_timestamp(row["birth"]),
                "sex"  : row["sex"],
                "name" : row["name"]
            }
            exe_sql = "SELECT count(*) AS count FROM follows WHERE source = %s AND destination = %s"
            res = g.conn.execute(exe_sql, (myid, otherid))
            if res.fetchone()["count"] == 1:
                u_info["isFollow"] = True
            else:
                u_info["isFollow"] = False
            exe_sql = "SELECT count(*) AS count FROM follows WHERE destination = %s;"
            res = g.conn.execute(exe_sql, otherid)
            u_info["follows"] = int(res.fetchone()["count"])
            ret[RESULT] = u_info
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# return topics subscribed by an user
# http://127.0.0.1:8080/api/users/subscribes?id=2
@routes.route('/api/users/subscribes', methods=['GET'])
@crossdomain(origin='*')
def user_subscribes():
    if request.method == 'GET':
        try:
            id = request.args.get('id')
            exe_sql = "SELECT S.topic, T.description FROM subscribes as S, topics as T WHERE S.uid = %s and S.topic = T.name"
            res = g.conn.execute(exe_sql, id)
            rows = res.fetchall()
            ret = dict()
            ret[STATUS] = SUCCESS
            topics = []
            for row in rows:
                topics.append({
                    'topic_name': row["topic"],
                    'description': row["description"]
                })
            ret[RESULT] = topics
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# return topics subscribed by an user
# http://127.0.0.1:8080/api/users/follow?sour=2&dest=1&isFollow=1
@routes.route('/api/users/follow', methods=['GET'])
@crossdomain(origin='*')
def user_follows():
    if request.method == 'GET':
        try:
            source = request.args.get('sour')
            destination = request.args.get('dest')
            isFollow = request.args.get('isFollow')
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = NULL
            if isFollow == "1":
                exe_sql = "SELECT * FROM follows WHERE source = %s AND destination = %s"
                res = g.conn.execute(exe_sql, (source, destination))
                row = res.fetchall()
                print row
                # No record before:
                if row:
                    pass
                else:
                    exe_sql = "INSERT INTO follows(source, destination) VALUES(%s, %s)"
                    # INSERT statement does not return rows. It'll close automatically.
                    g.conn.execute(exe_sql, (source, destination))
            elif isFollow == "0":
                exe_sql = "DELETE FROM follows WHERE source = %s and destination = %s"
                # INSERT statement does not return rows. It'll close automatically.
                g.conn.execute(exe_sql, (source, destination))
            else:
                raise Exception("isFollow should be either 1 or 0!")
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# Retrieve the user list that a specific user follows
# http://127.0.0.1:8080/api/users/follow/list?uid=1
@routes.route('/api/users/follow/list', methods=['GET'])
@crossdomain(origin='*')
def user_follows_list():
    if request.method == 'GET':
        try:
            uid = request.args.get('uid')
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = NULL
            exe_sql = "SELECT * FROM follows, users WHERE source = %s AND users.uid = follows.destination"
            res = g.conn.execute(exe_sql, uid)
            rows = res.fetchall()
            dests = []
            for row in rows:
                print type(row["sex"])
                if row["sex"] == True:
                    sex = "male"
                else:
                    sex = "female"
                dest = {
                    "uid": row["uid"],
                    "email": row["email"],
                    "birth": date_to_timestamp(row["birth"]),
                    "sex": sex,
                    "name": row["name"],
                    "follows": followers_num(row["uid"]),
                }
                dests.append(dest)
            ret[RESULT] = dests
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# This guy follows how many people.
def followers_num(uid):
    exe_sql = "SELECT count(*) AS count FROM follows WHERE destination = %s"
    return g.conn.execute(exe_sql, uid).fetchone()["count"]

