from utils.connect_db import *
from utils.constants import *
from utils.crossdomain import *
import json
from . import routes


# create/edit events
@routes.route('/api/event/create', methods=['GET', 'POST'])
@crossdomain(origin='*')
def event_create_edit():
    if request.method == 'POST':
        try:
            eid = request.args.get('eid')
            event_type = request.args.get('event_type')
            description = request.args.get('description')
            uid = request.args.get('uid')
            topics = request.args.get('topics')
            topics = topics.replace("[", "").replace("]", "").replace("\"", "").split(",")
            url = request.args.get('url')
            content = request.args.get('content')
            title = request.args.get('title')
            ret = {}
            ret[STATUS] = SUCCESS
            if eid == "-1":  # create
                if event_type == "blog":
                    exe_sql = "INSERT INTO events(time, event_type, description, uid, title, content) " \
                              "VALUES(now(), %s, %s, %s, %s, %s)"
                    conn.execute(exe_sql, (event_type, description, uid, title, content))
                elif event_type == "picture":
                    exe_sql = "INSERT INTO events(time, event_type, description, uid, title, url) " \
                              "VALUES(now(), %s, %s, %s, %s, %s)"
                    conn.execute(exe_sql, (event_type, description, uid, title, url))
                else:
                    raise Exception("The event type should be either blog or picture")
                # get eid
                exe_sql = "SELECT eid FROM events ORDER BY eid DESC LIMIT 1"
                res = conn.execute(exe_sql)
                row = res.fetchone()
                eid = row["eid"]
                # update belongs
                for topic in topics:
                    exe_sql = "INSERT INTO belongs(eid, topic) VALUES (%s, %s)"
                    conn.execute(exe_sql, (eid, topic))
            else:  # edit
                if event_type == "blog":
                    exe_sql = "UPDATE events SET time = now(), event_type = %s, description = %s, uid = %s, title = %s, content = %s"\
                              "WHERE eid = %s"
                    conn.execute(exe_sql, (event_type, description, uid, title, content, eid))
                elif event_type == "picture":
                    exe_sql = "UPDATE events SET time = now(), event_type = %s, description = %s, uid = %s, title = %s, url = %s"\
                              "WHERE eid = %s"
                    conn.execute(exe_sql, (event_type, description, uid, title, url, eid))
                # update belongs
                exe_sql = "DELETE FROM belongs WHERE eid = %s"  # delete first
                conn.execute(exe_sql, eid)
                # then add
                for topic in topics:
                    exe_sql = "INSERT INTO belongs(eid, topic) VALUES (%s, %s)"
                    conn.execute(exe_sql, (eid, topic))
            ret[RESULT] = {"eid": eid}
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# can't use now!!
# delete an event
@routes.route('/api/event/delete', methods=['GET', 'POST'])
@crossdomain(origin='*')
def event_delete():
    if request.method == 'POST':
        try:
            eid = request.args.get('eid')
            uid = request.args.get('uid')
            exe_sql = "DELETE FROM events WHERE eid = %s AND uid = %s"
            conn.execute(exe_sql, (eid, uid))
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = "null"
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# get an event
# http://127.0.0.1:8080/api/event?eid=1
@routes.route('/api/event', methods=['GET'])
@crossdomain(origin='*')
def event_get():
    if request.method == 'GET':
        try:
            eid = request.args.get('eid')
            exe_sql = "SELECT * FROM events, users WHERE eid = %s AND events.uid = users.uid"
            res = conn.execute(exe_sql, eid)
            row = res.fetchone()
            event = {
                "eid": eid,
                "event_type": row["event_type"],
                "description": row["description"],
                "uid": row["uid"],
                "user_name": row["name"],
                "url": row["url"],
                "content": row["content"],
                "title": row["title"]
            }
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = event
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# create comments
@routes.route('/api/event/comments', methods=['GET', 'POST'])
@crossdomain(origin='*')
def event_create_comments():
    if request.method == 'POST':
        try:
            eid = request.args.get('eid')
            uid = request.args.get('uid')
            content = request.args.get('content')
            exe_sql = "INSERT INTO comments(uid, eid, time, content) VALUES(%s, %s, now(), %s)"
            conn.execute(exe_sql, (uid, eid, content))
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = "null"
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)
