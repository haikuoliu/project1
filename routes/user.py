from flask import request
from utils.connect_db import *
from utils.constants import *
import json
from . import routes
import time





# return all info of a user
# get: /api/users?id=1
@routes.route('/api/users', methods=['POST', 'GET'])
def user_api():
    if request.method == 'GET':
        id = request.args.get('id')
        res = conn.execute("select * from users where uid=%s", id)
        rows = res.fetchall()
        print list(rows[0])
        # print time.mktime(tmp[1].timetuple())
        return json.dumps(list(rows[0])[3:])
