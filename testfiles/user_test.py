from flask import request
from utils.connect_db import *
from utils.constants_funcs import *
import json
from flask import g
from sqlalchemy import *
from utils.time_format import *

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

uid = 1
num = 4
exe_sql = "SELECT * FROM user_ads WHERE uid = %s LIMIT %s"
rows = conn.execute(exe_sql, (uid, num)).fetchall()
ads = []
for row in rows:
    print row["aid"]
    exe_sql = "SELECT A.sid AS sid, A.url AS url, A.description AS description, S.name AS name " \
              "FROM ads AS A, sponsors AS S " \
              "WHERE A.sid = S.sid AND A.aid = %s"
    ad_info = conn.execute(exe_sql, row["aid"]).fetchone()
    ad = {
        "sid": ad_info["sid"],
        "sponsor_name": ad_info["name"],
        "url": ad_info["url"],
        "description": ad_info["description"]
    }
    ads.append(ad)
    exe_sql = "UPDATE user_ads SET count = COUNT - 1 WHERE aid = %s"
    conn.execute(exe_sql, row["aid"])
    exe_sql = "DELETE FROM user_ads WHERE count < 0"
    conn.execute(exe_sql)
ret = {}
ret[STATUS] = SUCCESS
ret[RESULT] = ads
print ret




