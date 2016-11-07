from utils.constants_funcs import *
from utils.crossdomain import *
import json
from . import routes
from flask import g


# Create an ad
# http://127.0.0.1:8080/api/sponserposts/create
@routes.route('/api/sponserposts/create', methods=['GET', 'POST'])
@crossdomain(origin='*')
def ads_create():
    if request.method == 'POST':
        try:
            sid = request.form.get('sid')
            url = request.form.get('url')
            description = request.form.get('description')
            exe_sql = "INSERT INTO ads(sid, url, description) VALUES(%s, %s, %s)"
            g.conn.execute(exe_sql, sid, url, description)
            ret = {}
            exe_sql = "SELECT aid FROM ads ORDER BY aid DESC LIMIT 1"
            ret[STATUS] = SUCCESS
            ret[RESULT] = {"aid": g.conn.execute(exe_sql, sid, url, description).fetchone()["aid"]}
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# Retrieve Sponsor's Ads List
# http://127.0.0.1:8080/api/sponserposts/sponsor?sid=12
@routes.route('/api/sponserposts/sponsor', methods=['GET'])
@crossdomain(origin='*')
def ads_of_sponsor():
    if request.method == 'GET':
        try:
            sid = request.args.get('sid')
            exe_sql = "SELECT ads.description AS description, ads.url AS url, sponsors.name AS name " \
                      "FROM sponsors, ads WHERE sponsors.sid = ads.sid AND ads.sid = %s"
            rows = g.conn.execute(exe_sql, sid).fetchall()
            ads = []
            for row in rows:
                ad = {
                    "sponsor_name": row["name"],
                    "url": row["url"],
                    "description": row["description"]
                }
                ads.append(ad)
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = ads
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# Retrieve Users's Ads
# http://127.0.0.1:8080/api/sponserposts/user?uid=1&num=4
@routes.route('/api/sponserposts/user', methods=['GET'])
@crossdomain(origin='*')
def ads_of_user():
    if request.method == 'GET':
        try:
            uid = request.args.get('uid')
            num = request.args.get('num')
            exe_sql = "SELECT * FROM user_ads WHERE uid = %s LIMIT %s"
            rows = g.conn.execute(exe_sql, (uid, num)).fetchall()
            ads = []
            for row in rows:
                exe_sql = "SELECT A.sid AS sid, A.url AS url, A.description AS description, S.name AS name " \
                          "FROM ads AS A, sponsors AS S " \
                          "WHERE A.sid = S.sid AND A.aid = %s"
                ad_info = g.conn.execute(exe_sql, row["aid"]).fetchone()
                ad = {
                    "sid": ad_info["sid"],
                    "sponsor_name": ad_info["name"],
                    "url": ad_info["url"],
                    "description": ad_info["description"]
                }
                ads.append(ad)
                exe_sql = "UPDATE user_ads SET count = COUNT - 1 WHERE aid = %s AND uid = %s"
                g.conn.execute(exe_sql, row["aid"], uid)
                exe_sql = "DELETE FROM user_ads WHERE count <= 0"
                g.conn.execute(exe_sql)
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = ads
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)
