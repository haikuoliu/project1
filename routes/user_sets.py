from utils.constants_funcs import *
from utils.crossdomain import *
import json
from . import routes
from flask import g


# Create a new User_Sets
# http://127.0.0.1:8080/api/user_sets/create
@routes.route('/api/user_sets/create', methods=['GET', 'POST'])
@crossdomain(origin='*')
def user_sets_create():
    if request.method == 'POST':
        try:
            sid = request.form.get('sid')
            filters = request.form.get('filters')
            description = request.form.get('description')
            size = len(decode_filters(filters))
            # Intert into data base
            exe_sql = "INSERT INTO user_sets(filters, description, sid, size) VALUES(%s, %s, %s, %s)"
            g.conn.execute(exe_sql, (filters, description, sid, size))
            # Get set_id
            exe_sql = "SELECT set_id FROM user_sets ORDER BY set_id DESC LIMIT 1"
            set_id = g.conn.execute(exe_sql).fetchone()["set_id"]
            ret = {}
            ret[STATUS] = SUCCESS
            result = {
                "set_id": set_id,
                "sid": sid,
                "filters": filters,
                "description": description,
                "size": size
            }
            ret[RESULT] = result
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# Delete a new User_Sets
# http://127.0.0.1:8080/api/user_sets/delete?set_id=1
@routes.route('/api/user_sets/delete', methods=['GET'])
@crossdomain(origin='*')
def user_sets_delete():
    if request.method == 'GET':
        try:
            set_id = request.args.get('set_id')
            exe_sql = "DELETE FROM user_sets WHERE set_id = %s"
            g.conn.execute(exe_sql, set_id)
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = NULL
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# Get User Sets
# http://127.0.0.1:8080/api/user_sets/get?set_id=2
@routes.route('/api/user_sets/get', methods=['GET'])
@crossdomain(origin='*')
def user_sets_get():
    if request.method == 'GET':
        try:
            set_id = request.args.get('set_id')
            # Update first
            update_size_of_user_sets(set_id)
            exe_sql = "SELECT * FROM user_sets WHERE set_id = %s"
            ret = {}
            ret[STATUS] = SUCCESS
            set_info = g.conn.execute(exe_sql, set_id).fetchone()
            if not set_info:
                raise Exception("No such set_id!")
            ret[RESULT] = {
                "sid": set_info["sid"],
                "filters": set_info["filters"],
                "description": set_info["description"],
                "size": set_info["size"]
            }
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# Get Sponsor's all User_Sets List
# http://127.0.0.1:8080/api/user_sets/sponsor?sid=1
@routes.route('/api/user_sets/sponsor', methods=['GET'])
@crossdomain(origin='*')
def user_sets_get_all():
    if request.method == 'GET':
        try:
            sid = request.args.get('sid')

            # Update first
            exe_sql = "SELECT set_id FROM user_sets WHERE sid = %s"
            rows = g.conn.execute(exe_sql, sid).fetchall()
            for row in rows:
                update_size_of_user_sets(row["set_id"])

            exe_sql = "SELECT * FROM user_sets WHERE sid = %s"
            rows = g.conn.execute(exe_sql, sid).fetchall()
            user_sets = []
            for row in rows:
                user_set = {
                    "sid": row["sid"],
                    "set_id": row["set_id"],
                    "filters": row["filters"],
                    "description": row["description"],
                    "size": row["size"]
                }
                user_sets.append(user_set)
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = user_sets
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# Get results of a specific filter
# http://127.0.0.1:8080/api/user_sets/filters/results
@routes.route('/api/user_sets/filters/results', methods=['GET', 'POST'])
@crossdomain(origin='*')
def filters_results():
    if request.method == 'POST':
        try:
            filters = request.form.get('filters')
            rows = decode_filters(filters=filters, attrs=["name", "birth", "email", "sex", "reg_t"])
            users = []
            for row in rows:
                if row["sex"] == True:
                    sex = "male"
                else:
                    sex = "female"
                user = {
                    "uid": row["uid"],
                    "birth": date_to_timestamp(row["birth"]),
                    "reg_t": date_to_timestamp(row["reg_t"]),
                    "email": row["email"],
                    "name": row["name"],
                    "sex": sex
                }
                users.append(user)
            ret = {}
            ret[STATUS] = SUCCESS
            result = {}
            result["users"] = users
            result["statics"] = {}
            ret[RESULT] = result
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)


# Update the size of 'set_id'
def update_size_of_user_sets(set_id):
    # Get filters
    exe_sql = "SELECT filters FROM user_sets WHERE set_id = %s"
    filters = g.conn.execute(exe_sql, set_id).fetchone()["filters"]
    filters_dic = json.loads(filters)
    age_range = filters_dic["age"]
    if filters_dic["sex"] == "male":
        sex = True
    elif filters_dic["sex"] == "female":
        sex = False
    else:
        sex = None
    # Get size of user_set
    if (sex == None):
        exe_sql = "SELECT count(*) AS size FROM users WHERE age(birth) >= %s AND age(birth) <= %s"
        size = g.conn.execute(exe_sql, (str(age_range[0]) + "years", str(age_range[1]) + "years")).fetchone()["size"]
    else:
        exe_sql = "SELECT count(*) AS size FROM users WHERE age(birth) >= %s AND age(birth) <= %s AND sex = %s"
        size = g.conn.execute(exe_sql, (str(age_range[0]) + "years", str(age_range[1]) + "years", sex)).fetchone()["size"]
    size = int(size)
    # Update
    exe_sql = "UPDATE user_sets SET size = %s WHERE set_id = %s"
    g.conn.execute(exe_sql, (size, set_id))
