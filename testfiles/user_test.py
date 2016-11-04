from flask import request
from utils.connect_db import *
from utils.constants import *
import json
import time




# subscribes
id = 1
exe_sql = "select topic from subscribes where uid = %s"
res = conn.execute(exe_sql, id)
rows = res.fetchall()
ret = dict()
if rows:
    ret[STATUS] = SUCCESS
    topics = []
    for row in rows:
        topics.append(row["topic"])
    ret[RESULT] = topics
else:
    ret[STATUS] = FAIL
    fail_info = dict()
    fail_info[CODE] = "0"
    fail_info[MSG] = "None topics"
    ret[RESULT] = fail_info
print ret

