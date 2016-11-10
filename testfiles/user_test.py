from flask import request
from utils.connect_db import *
from utils.constants_funcs import *
import json
from flask import g
from sqlalchemy import *
from utils.time_format import *
import hashlib


# host = "104.196.175.120"
# password = "che2q"
# user = "hl3023"
host = "localhost"
password = ""
user = "HaikuoLiu"
url = "postgresql://%s:%s@%s/postgres" % (user, password, host)
db = create_engine(url)
conn = db.connect()
if conn: print "connected to db"
else: print "connection failed"


# Get the filtered users info.
# Supported args: age, post_topics, subscribe_topics, reg_time, email
def filtered_user_info_test(age=None, sex=None, post_topics=None, subscribe_topics=None, reg_time=None, email=None):
    # get all uid
    exe_sql = "SELECT uid FROM users"
    args = ()
    # add age constraints
    if age != None:
        age_sql = "SELECT uid FROM users WHERE age(birth) >= %s AND age(birth) <= %s"
        exe_sql = exe_sql + INTERSECT + age_sql
        # get users between [age[0], age[1]]
        args = args + (str(age[0]) + "years", str(age[1]) + "years")

    if reg_time != None:
        reg_time_sql = "SELECT uid FROM users WHERE reg_t >= %s AND reg_t <= %s"
        exe_sql = exe_sql + INTERSECT + reg_time_sql
        # get users whose register time between [reg_time[0], reg_time[1]], arg type is timestamp
        args = args + (timestamp_to_datetime(reg_time[0]), timestamp_to_datetime(reg_time[1]))

    if sex != None:
        sex_sql = "SELECT uid FROM users WHERE sex = %s"
        exe_sql = exe_sql + INTERSECT + sex_sql
        # get users whose sex is male/female, sex should be True or False
        args = args + (sex,)
    print exe_sql
    print args
    rows = conn.execute(exe_sql, args).fetchall()
    return rows

# rows = filtered_user_info_test(age=[25, 30])

# rows = filtered_user_info_test(age=[1, 44], reg_time=[1475280000, 1478753407])

rows = filtered_user_info_test(sex=False)
print type(rows)
for row in rows:
    print row["uid"]
