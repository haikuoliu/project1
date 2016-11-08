from utils.constants_funcs import *
from utils.crossdomain import *
from utils.time_format import *
import json
from . import routes
import time
from flask import g


# Create a new push
# http://127.0.0.1:8080/api/pushes/create
@routes.route('/api/pushes/create', methods=['GET', 'POST'])
@crossdomain(origin='*')
def pushes_create():
    if request.method == 'POST':
        try:
            aid = int(request.form.get('aid'))
            sid = int(request.form.get('sid'))
            set_id = int(request.form.get('set_id'))
            exe_sql = "SELECT filters, size, description FROM user_sets WHERE set_id = %s"
            row = g.conn.execute(exe_sql, set_id).fetchone()
            filters = row["filters"]
            size = row["size"]
            price = UNIT_PRICE * int(size)
            description = row["description"]
            filters_dic = json.loads(filters)
            age_range = filters_dic["age"]
            if filters_dic["sex"] == "male":
                sex = True
            elif filters_dic["sex"] == "female":
                sex = False
            else:
                sex = None
            # Get filtered uid
            if (sex == None):
                exe_sql = "SELECT uid FROM users WHERE age(birth) >= %s AND age(birth) <= %s"
                rows = g.conn.execute(exe_sql, (str(int(age_range[0])) + "years", str(int(age_range[1])) + "years")).fetchall()
            else:
                exe_sql = "SELECT uid FROM users WHERE age(birth) >= %s AND age(birth) <= %s AND sex = %s"
                rows = g.conn.execute(exe_sql, (str(int(age_range[0])) + "years", str(int(age_range[1])) + "years", sex)).fetchall()
            for row in rows:
                # exe_sql = "INSERT INTO user_ads(uid, aid)"
                exe_sql = "SELECT * FROM user_ads WHERE uid = %s AND aid = %s"
                # already have records, increase count
                if g.conn.execute(exe_sql, row["uid"], aid).fetchone():
                    exe_sql = "UPDATE user_ads SET count = count + 1 WHERE uid = %s AND aid = %s"
                    g.conn.execute(exe_sql, row["uid"], aid)
                # no records, add record
                else:
                    exe_sql = "INSERT INTO user_ads(uid, aid, count) VALUES(%s, %s, 1)"
                    g.conn.execute(exe_sql, row["uid"], aid)
            # Insert into pushes table
            exe_sql = "INSERT INTO pushes(sid, aid, set_id, time, price, count) VALUES(%s, %s, %s, now(), %s, %s)"
            g.conn.execute(exe_sql, sid, aid, set_id, price, size)
            ret = {}
            ret[STATUS] = SUCCESS
            result = {
                "sid": sid,
                "aid": aid,
                "price": price,
                "size": size,
                "description": description,
                "time": int(time.time()) * 1000,
            }
            ret[RESULT] = result
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# Retrieve sponsor's pushes list
# http://127.0.0.1:8080/api/pushes/sponsor?sid=1
@routes.route('/api/pushes/sponsor', methods=['GET', 'POST'])
@crossdomain(origin='*')
def pushes_get_list():
    if request.method == 'GET':
        try:
            sid = request.args.get('sid')
            exe_sql = "SELECT * FROM pushes WHERE sid = %s"
            rows = g.conn.execute(exe_sql, sid).fetchall()
            pushes = []
            for row in rows:
                exe_sql = "SELECT description FROM user_sets WHERE set_id = %s"
                description = g.conn.execute(exe_sql, row["set_id"]).fetchone()["description"]
                push = {
                    "set_id": row["set_id"],
                    "sid": row["sid"],
                    "aid": row["aid"],
                    "price": row["price"],
                    "size": row["count"],
                    "description": description,
                    "time": date_to_timestamp(row["time"])
                }
                pushes.append(push)
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = pushes
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)
