from utils.constants_funcs import *
from utils.crossdomain import *
from utils.time_format import *
import json
from . import routes
from flask import g


# Retrieve Users's Posts
# http://127.0.0.1:8080/api/posts/user?uid=4&myid=1
@routes.route('/api/posts/user', methods=['GET'])
@crossdomain(origin='*')
def users_posts():
    if request.method == 'GET':
        try:
            uid = request.args.get('uid')
            myid = request.args.get('myid')
            exe_sql = "SELECT * FROM events, users WHERE users.uid = %s AND events.uid = users.uid"
            res = g.conn.execute(exe_sql, uid)
            rows = res.fetchall()
            feeds = []
            for row in rows:
                exe_sql = "SELECT count(*) AS count FROM events, likes " \
                          "WHERE likes.eid = events.eid AND events.eid = %s"
                res = g.conn.execute(exe_sql, row["eid"])
                row_likes = res.fetchone()
                likes = row_likes["count"]
                event = {
                    "eid": row["eid"],
                    "event_type": row["event_type"],
                    "description": row["description"],
                    "uid": uid,
                    "user_name": row["name"],
                    "likes": int(likes),
                    "islike": is_like(myid, row["eid"]),
                    "topics": topics_of_event(row["eid"]),
                    "url": row["url"],
                    "content": row["content"],
                    "title": row["title"]
                }
                print likes
                feeds.append(event)
                print feeds
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = feeds
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# Retrieve All Events of Specific Topics
# http://127.0.0.1:8080/api/posts/topic?topicName=science&myid=1
@routes.route('/api/posts/topic', methods=['GET'])
@crossdomain(origin='*')
def events_of_topic():
    if request.method == 'GET':
        try:
            topic_name = request.args.get('topicName')
            myid = request.args.get('myid')
            exe_sql = "SELECT * FROM events, belongs WHERE belongs.topic = %s AND events.eid = belongs.eid"
            res = g.conn.execute(exe_sql, topic_name)
            rows = res.fetchall()
            events = []
            for row in rows:
                exe_sql = "SELECT count(*) AS count FROM events, likes " \
                          "WHERE likes.eid = events.eid AND events.eid = %s"
                res = g.conn.execute(exe_sql, row["eid"])
                row_likes = res.fetchone()
                likes = row_likes["count"]
                exe_sql = "SELECT name FROM users WHERE uid = %s"
                res_name = g.conn.execute(exe_sql, row["uid"])
                name = res_name.fetchone()["name"]
                event = {
                    "eid": row["eid"],
                    "event_type": row["event_type"],
                    "description": row["description"],
                    "uid": row["uid"],
                    "user_name": name,
                    "likes": int(likes),
                    "islike": is_like(myid, row["eid"]),
                    "topics": topics_of_event(row["eid"]),
                    "url": row["url"],
                    "content": row["content"],
                    "title": row["title"]
                }
                print likes
                events.append(event)
                print events
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = events
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# Retrieve Feeds
# http://127.0.0.1:8080/api/posts/feeds?uid=1&offset=0&count=10&timestamp=1478411123
@routes.route('/api/posts/feeds', methods=['GET'])
@crossdomain(origin='*')
def users_feeds():
    if request.method == 'GET':
        try:
            uid = request.args.get('uid')
            ts = request.args.get('timestamp')
            count = request.args.get('count')
            offset = request.args.get('offset')
            exe_sql = "SELECT * FROM events, users WHERE " \
                      "events.uid = users.uid AND events.time < %s AND (events.eid in " \
                      "(SELECT events.eid FROM events, follows WHERE events.uid = follows.destination AND follows.source = %s) " \
                      "OR events.eid in " \
                      "(SELECT events.eid FROM subscribes, events, belongs WHERE events.eid = belongs.eid AND belongs.topic = subscribes.topic AND subscribes.uid = %s)" \
                      ")ORDER BY events.time DESC LIMIT %s OFFSET %s"
            res = g.conn.execute(exe_sql, (timestamp_to_datetime(ts), uid, uid, str(count), str(offset)))
            rows = res.fetchall()
            feeds = []
            for row in rows:
                exe_sql = "SELECT count(*) AS count FROM events, likes " \
                          "WHERE likes.eid = events.eid AND events.eid = %s"
                res = g.conn.execute(exe_sql, row["eid"])
                row_likes = res.fetchone()
                likes = row_likes["count"]
                event = {
                    "eid": row["eid"],
                    "event_type": row["event_type"],
                    "description": row["description"],
                    "uid": row["uid"],
                    "user_name": row["name"],
                    "likes": int(likes),
                    "islike": is_like(uid, row["eid"]),
                    "topics": topics_of_event(row["eid"]),
                    "url": row["url"],
                    "content": row["content"],
                    "title": row["title"]
                }
                print likes
                feeds.append(event)
                print feeds
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = feeds
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)
