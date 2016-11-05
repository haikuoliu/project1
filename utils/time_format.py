import time


def date_to_timestamp(d):
    return int(time.mktime(d.timetuple())) * 1000
