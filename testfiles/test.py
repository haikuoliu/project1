from sqlalchemy import *
#
# host = "localhost"
# password = ""
# user = "HaikuoLiu"
# url = "postgresql://%s:%s@%s/postgres" % (user, password, host)
# db = create_engine(url)
# conn = db.connect()
#
#
# def add_b_safe(conn, value):
#     cc = "cc"
#     res = conn.execute("update cc set b = %s; update dd set b = %s;", (value, "4"))
#    #  res = conn.execute("update cc set b = %s;" % value )
#     if res.returns_rows:
#         for row in res:
#             print row
# add_b_safe(conn, "abcd")

from utils.connect_db import *
import time

id = 1
dbres = conn.execute("select * from users", id)
# row = dbres.fetchone()
# res = {""}
res = []
for row in dbres:
    tmp = {}
    tmp['time'] = row['reg_t']
    res.append(tmp)

ret = {
    "status": "succ",
    "result": res
}
print ret



# print time.mktime(tmp[1].timetuple())
# return json.dumps(list(rows[0])[3:])


# These are the key lines:

# # We now have a pointer to a remote database
# db = create_engine(url)
#
# # We now actually create the connection.  This means that the database has allocated resources
# # to a network connection and returned a handle to the connection.
# conn = db.connect()
#
# print conn;
# res = conn.execute("select * from users")
# rows = res.fetchall()
# print rows