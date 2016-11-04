from utils.connect_db import *
from utils.constants import *
from utils.crossdomain import *
import json
from . import routes


# Retrieve Users's Posts
# http://127.0.0.1:8080/api/posts/user?uid=4
@routes.route('/api/posts/user', methods=['GET'])
@crossdomain(origin='*')
def users_posts():
    if request.method == 'GET':
        try:
            uid = request.args.get('uid')
            exe_sql = "SELECT * FROM events, users WHERE users.uid = %s AND events.uid = users.uid"
            res = conn.execute(exe_sql, uid)
            rows = res.fetchall()
            feeds = []
            for row in rows:
                exe_sql = "SELECT count(*) AS count FROM events, likes " \
                          "WHERE likes.eid = events.eid AND events.eid = %s GROUP BY events.eid"
                res = conn.execute(exe_sql, row["eid"])
                row_likes = res.fetchone()
                likes = row_likes["count"]
                event = {
                    "eid": row["eid"],
                    "event_type": row["event_type"],
                    "description": row["description"],
                    "uid": uid,
                    "user_name": row["name"],
                    "url": row["url"],
                    "likes": likes,
                    "content": row["content"],
                    "title": row["title"]
                }
                feeds.append(event)
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = feeds
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)
