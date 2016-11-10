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


email = "abc@gmail.com"
exe_sql = "SELECT count(*) AS count FROM users WHERE email = %s"
count = conn.execute(exe_sql, email).fetchone()["count"]
print type(count)
ret = {}
# if email exists
if count > 0:
    ret[STATUS] = FAIL
    ret[RESULT] = {
        "code": 1,
        "msg": "Email exists!"
    }
else:
    birth = "2000-02-13"
    password = "p"
    sex = "male"
    if sex == "male":
        sex = True
    else:
        sex = False
    name = "n"
    exe_sql = "INSERT INTO users(reg_t, birth, password, email, name, sex) " \
              "VALUES(now(), %s, %s, %s, %s, %s)"
    conn.execute(exe_sql, birth, hashlib.md5(password.encode()).hexdigest(), email, name, sex)
print ret


