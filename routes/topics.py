from utils.constants import *
from utils.crossdomain import *
import json
from . import routes
from flask import g


# Retrieve Users's Posts
# http://127.0.0.1:8080/api/posts/user?uid=4
@routes.route('/api/topics/all', methods=['GET'])
@crossdomain(origin='*')
def topics_all():
    if request.method == 'GET':
        try:
            exe_sql = "SELECT * FROM topics"
            res = g.conn.execute(exe_sql)
            rows = res.fetchall()
            topics = []
            for row in rows:
                exe_sql = "SELECT count(*) AS count FROM events, likes " \
                          "WHERE likes.eid = events.eid AND events.eid = %s GROUP BY events.eid"
                res = g.conn.execute(exe_sql, row["eid"])
                row_likes = res.fetchone()
                likes = row_likes["count"]
                event = {
                    "eid": row["eid"],
                    "event_type": row["event_type"],
                    "description": row["description"],
                    # "uid": uid,
                    "user_name": row["name"],
                    "url": row["url"],
                    "likes": likes,
                    "content": row["content"],
                    "title": row["title"]
                }
                topics.append(event)
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = topics
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)