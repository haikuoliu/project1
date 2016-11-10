import json
from flask import g
from utils.time_format import *


# Useful functions
# uid likes eid?
def is_like(uid, eid):
    exe_sql = "SELECT count(*) > 0 AS islike FROM likes WHERE uid = %s AND eid = %s"
    islike = g.conn.execute(exe_sql, uid, eid).fetchone()["islike"]
    return islike


# Get topics that an event belongs
def topics_of_event(eid):
    exe_sql = "SELECT belongs.topic AS topic FROM events, belongs " \
              "WHERE events.eid = %s AND events.eid = belongs.eid"
    res = g.conn.execute(exe_sql, eid)
    rows = res.fetchall()
    topics = []
    for row in rows:
        topics.append(row["topic"])
    return topics


# Given a filter, return a list of filtered user info.
# attr is a list of user info that this function returns (plus uid), like["age, sex"].
def decode_filters(filters, attrs=[]):
    filters_dic = json.loads(filters)
    age = None
    sex = None
    # age
    if "age" in filters_dic and filters_dic["age"] != "":
        age = filters_dic["age"]
    else:
        age = None
    # sex
    if "sex" in filters_dic and filters_dic["sex"] != "":
        if filters_dic["sex"] == "male":
            sex = True
        elif filters_dic["sex"] == "female":
            sex = False
    return filtered_user_info(attrs=attrs, age=age, sex=sex)


# Get the filtered users info.
# Supported args: age, sex, post_topics, subscribe_topics, reg_time, email
# attr is a list of user info that this function returns (plus uid), like["age, sex"].
def filtered_user_info(attrs=[], age=None, sex=None, post_topics=None, subscribe_topics=None, reg_time=None, email=None):
    # get all uid
    exe_sql = "SELECT uid FROM users"
    args = ()
    # add age constraints
    if age != None:
        age_sql = "SELECT uid FROM users WHERE age(birth) >= %s AND age(birth) <= %s"
        exe_sql = exe_sql + INTERSECT + age_sql
        # get users whose age between [age[0], age[1]], arg type is int.
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
    # if post_topics != None:
    #     if len(post_topics) > 0:
    #         # len > 1
    #         if len(post_topics) > 1:
    #             pass
    #         # len == 1
    #         else:
    #             pass
    # select those attributes
    select = "SELECT uid"
    for attr in attrs:
        select = select + ", " + attr
    exe_sql = select + " FROM users WHERE uid IN (" + exe_sql + ")"
    rows = g.conn.execute(exe_sql, args).fetchall()
    return rows


# store all constants

NULL = "null"

SUCCESS = "success"

FAIL = "fail"

STATUS = "status"

RESULT = "result"

CODE = "code"

MSG = "msg"

UNIT_PRICE = 5

INTERSECT = " INTERSECT "

def default_error_msg(e):
    ret = json.dumps({
                        STATUS: FAIL,
                        RESULT: {
                            CODE: "0",
                            MSG: e
                        }
                    })
    return ret
