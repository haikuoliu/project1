from utils.constants_funcs import *
from utils.crossdomain import *
from utils.time_format import *
import json
from . import routes
from flask import g

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
                    g.conn.execute(exe_sql, (event_type, description, uid, title, content))
                elif event_type == "picture":
                    exe_sql = "INSERT INTO events(time, event_type, description, uid, title, url) " \
                              "VALUES(now(), %s, %s, %s, %s, %s)"
                    g.conn.execute(exe_sql, (event_type, description, uid, title, url))
                else:
                    raise Exception("The event type should be either blog or picture")
                # get eid
                exe_sql = "SELECT eid FROM events ORDER BY eid DESC LIMIT 1"
                res = g.conn.execute(exe_sql)
                row = res.fetchone()
                eid = row["eid"]
                # update belongs
                for topic in topics:
                    exe_sql = "INSERT INTO belongs(eid, topic) VALUES (%s, %s)"
                    g.conn.execute(exe_sql, (eid, topic))
            else:  # edit
                if event_type == "blog":
                    exe_sql = "UPDATE events SET time = now(), event_type = %s, description = %s, uid = %s, title = %s, content = %s"\
                              "WHERE eid = %s"
                    g.conn.execute(exe_sql, (event_type, description, uid, title, content, eid))
                elif event_type == "picture":
                    exe_sql = "UPDATE events SET time = now(), event_type = %s, description = %s, uid = %s, title = %s, url = %s"\
                              "WHERE eid = %s"
                    g.conn.execute(exe_sql, (event_type, description, uid, title, url, eid))
                # update belongs
                exe_sql = "DELETE FROM belongs WHERE eid = %s"  # delete first
                g.conn.execute(exe_sql, eid)
                # then add
                for topic in topics:
                    exe_sql = "INSERT INTO belongs(eid, topic) VALUES (%s, %s)"
                    g.conn.execute(exe_sql, (eid, topic))
            ret[RESULT] = {"eid": eid}
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# delete an event
@routes.route('/api/event/delete', methods=['GET', 'POST'])
@crossdomain(origin='*')
def event_delete():
    if request.method == 'POST':
        try:
            eid = request.args.get('eid')
            uid = request.args.get('uid')
            exe_sql = "DELETE FROM events WHERE eid = %s AND uid = %s"
            g.conn.execute(exe_sql, (eid, uid))
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = "null"
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# get an event
# http://127.0.0.1:8080/api/event?eid=1&myid=1
@routes.route('/api/event', methods=['GET'])
@crossdomain(origin='*')
def event_get():
    if request.method == 'GET':
        try:
            eid = request.args.get('eid')
            myid = request.args.get('myid')
            exe_sql = "SELECT * FROM events, users WHERE eid = %s AND events.uid = users.uid"
            res = g.conn.execute(exe_sql, eid)
            exe_sql = "SELECT count(*) As count FROM likes WHERE eid = %s"
            likes = g.conn.execute(exe_sql, eid).fetchone()["count"]
            row = res.fetchone()
            event = {
                "eid": eid,
                "event_type": row["event_type"],
                "description": row["description"],
                "uid": row["uid"],
                "user_name": row["name"],
                "url": row["url"],
                "likes": likes,
                "islike": is_like(myid, eid),
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


# create comments & get comments
# http://127.0.0.1:8080/api/event/comments?eid=1
@routes.route('/api/event/comments', methods=['GET', 'POST'])
@crossdomain(origin='*')
def event_create_comments():
    if request.method == 'POST':
        try:
            eid = request.form.get('eid')
            uid = request.form.get('uid')
            content = request.form.get('content')
            exe_sql = "INSERT INTO comments(uid, eid, time, content) VALUES(%s, %s, now(), %s)"
            g.conn.execute(exe_sql, (uid, eid, content))
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = "null"
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)
    if request.method == 'GET':
        try:
            eid = request.args.get('eid')
            exe_sql = "SELECT events.eid AS eid, users.uid AS uid, name, comments.time AS time, comments.content AS content " \
                      "FROM comments, users, events " \
                      "WHERE events.eid = %s AND comments.uid = users.uid AND events.eid = comments.eid"
            res = g.conn.execute(exe_sql, eid)
            rows = res.fetchall()
            comments = []
            for row in rows:
                comment = {
                    "eid": row["eid"],
                    "uid": row["uid"],
                    "user_name": row["name"],
                    "timestamp": date_to_timestamp(row["time"]),
                    "content": row["content"]
                }
                comments.append(comment)
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = comments
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
        return default_error_msg(e.message)
