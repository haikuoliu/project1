from utils.constants import *
from utils.crossdomain import *
import json
from . import routes
from flask import g



# to be discussed
# get all ads of an user
@routes.route('/api/ads/user', methods=['GET'])
@crossdomain(origin='*')
def user_ads():
    if request.method == 'GET':
        try:
            uid = request.args.get('uid')
            exe_sql = "SELECT * FROM ads, sponsors AS S WHERE uid = %s AND ads.sid = S.sid"
            res = g.conn.execute(exe_sql, uid)
            ads = []
            for row in res.fetchall():
                ads.append({
                    "sid": row["sid"],
                    "sponsor_name": row["name"],
                    "url": row["url"],
                    "description": row["description"]
                })
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = ads
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)
