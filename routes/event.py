from flask import request
from utils.connect_db import *
from utils.constants import *
from utils.time_format import *
import json
from . import routes


# return all info of an user
# http://127.0.0.1:8080/api/users/view_profile?myid=1&otherid=2
@routes.route('api/event/create', methods=['POST'])
def view_user_profile():
    if request.method == 'POST':
        try:
            eid = request.form['eid']
            event_type = request.form['event_type']
            description = request.form['description']
            uid = request.form['uid']
            eid = request.form['username']
            eid = request.form['topics']
            url = request.form['url']
            content = request.form['content']
            title = request.form['title']
            ret = {}
            ret[STATUS] = SUCCESS
            if eid == null: # create
                if event_type == "blog":
                    exe_sql = "INSERT INTO events(time, event_type, description, uid, title, content) " \
                              "VALUES(now(), %s, %s, %s, %s, %s)"
                    conn.execute(exe_sql, (event_type, description, uid, title, content))
                elif event_type == "picture":
                    exe_sql = "INSERT INTO events(time, event_type, description, uid, title, url) " \
                              "VALUES(now(), %s, %s, %s, %s, %s)"
                    conn.execute(exe_sql, (event_type, description, uid, title, url))
                else:
                    raise Exception("The event type should be either blog or picture")
                print ret
                return json.dumps(ret)
            else: # edit
                pass

        except Exception, e:
            print e
            return default_error_msg(e.message)
