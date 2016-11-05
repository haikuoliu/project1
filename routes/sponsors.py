from utils.constants import *
from utils.crossdomain import *
import json
from . import routes
from flask import g


# Return All Sponsors List
# http://127.0.0.1:8080//api/sponsors
@routes.route('/api/sponsors', methods=['GET'])
@crossdomain(origin='*')
def all_sponsors():
    if request.method == 'GET':
        try:
            exe_sql = "SELECT * FROM sponsors"
            res = g.conn.execute(exe_sql)
            rows = res.fetchall()
            sponsors = []
            for row in rows:
                sponsor = {
                    "sid": row["sid"],
                    "name": row["name"],
                }
                sponsors.append(sponsor)
            ret = {}
            ret[STATUS] = SUCCESS
            ret[RESULT] = sponsors
            print ret
            return json.dumps(ret)
        except Exception, e:
            print e
            return default_error_msg(e.message)
