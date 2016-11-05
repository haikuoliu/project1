from utils.constants import *
from utils.crossdomain import *
import json
from . import routes
from flask import g


# Retrieve all topics
# http://127.0.0.1:8080/api/topics/all
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
                exe_sql = "SELECT count(*) AS count FROM belongs, topics " \
                          "WHERE topics.name = belongs.topic AND topics.name = %s"
                res = g.conn.execute(exe_sql, row["name"])
                row_count = res.fetchone()
                topic = {
                    "topic_name": row["name"],
                    "description": row["description"],
                    "count": row_count["count"]
                }
                topics.append(topic)
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = topics
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)
