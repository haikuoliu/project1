from utils.constants_funcs import *
from utils.crossdomain import *
import json
from . import routes
from flask import g


# Create or cancle like of events
# http://127.0.0.1:8080/api/likes?uid=12&eid=21&isLike=0
@routes.route('/api/likes', methods=['GET'])
@crossdomain(origin='*')
def like_event():
    if request.method == 'GET':
        try:
            isLike = request.args.get('isLike')
            uid = request.args.get('uid')
            eid = request.args.get('eid')
            print uid == "12"
            # cancle like
            if isLike == "0":
                exe_sql = "DELETE FROM likes WHERE uid = %s AND eid = %s"
                g.conn.execute(exe_sql, uid, eid)
            # create like
            elif isLike == "1":
                exe_sql = "INSERT INTO likes(uid, eid) VALUES(%s, %s)"
                g.conn.execute(exe_sql, uid, eid)
            else:
                raise Exception("isLike should be either 0 or 1")
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = NULL
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# Check whether user likes an event or not.
# http://127.0.0.1:8080/api/likes/islike?uid=1&eid=2
@routes.route('/api/likes/islike', methods=['GET'])
@crossdomain(origin='*')
def islike_event():
    if request.method == 'GET':
        try:
            uid = request.args.get('uid')
            eid = request.args.get('eid')
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = is_like(uid, eid)
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)
