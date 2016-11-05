from utils.constants import *
from utils.crossdomain import *
import json
from . import routes
from flask import g


# # Create a new User_Sets
# @routes.route('/api/user_sets/create', methods=['GET', 'POST'])
# @crossdomain(origin='*')
# def user_sets_create():
#     if request.method == 'POST':
#         try:
#             sid = request.args.get('sid')
#             filters = request.args.get('filters')
#             description = request.args.get('description')
#             exe_sql = "INSERT INTO ads(sid, url, description) VALUES(%s, %s, %s)"
#             g.conn.execute(exe_sql, sid, url, description)
#             ret = {}
#             exe_sql = "SELECT aid FROM ads ORDER BY aid DESC LIMIT 1"
#             ret[STATUS] = SUCCESS
#             ret[RESULT] = {"aid": g.conn.execute(exe_sql, sid, url, description).fetchone()["aid"]}
#             print ret
#             return json.dumps(ret)
#         except Exception, e:
#             print e
#             return default_error_msg(e.message)

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
# http://127.0.0.1:8080/api/user_sets/get?set_id=1
@routes.route('/api/user_sets/get', methods=['GET'])
@crossdomain(origin='*')
def user_sets_get():
    if request.method == 'GET':
        try:
            set_id = request.args.get('set_id')
            exe_sql = "SELECT * FROM user_sets WHERE set_id = %s"
            ret = {}
            ret[STATUS] = SUCCESS
            set_info = g.conn.execute(exe_sql, set_id).fetchone()
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