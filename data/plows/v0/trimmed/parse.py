import csv
import sys
from collections import defaultdict
import msgpack
import datetime
import json
from pprint import pprint

if len(sys.argv) is not 2:
    exit(1)

fixed_map = defaultdict(list)


def fix_date_time(dt: str) -> float:
    return datetime.datetime(int(dt[:4]), int(dt[5:7]),
                             int(dt[8:10]), int(dt[10:12]),
                             int(dt[13:15]), int(dt[16:18])).timestamp()

with open(sys.argv[1], 'r') as file:
    for row in csv.DictReader(file, delimiter=',', quotechar='"'):
        fixed_map[fix_date_time(row['date_fixed'])].append({'lat': row['latitude'],
                                                            'lon': row['longitude']})

rel_map = dict()

earliest_time = min(fixed_map.keys())

for key, value in fixed_map.items():
    rel_map[key - earliest_time] = value

with open(sys.argv[1] + '.pk', 'wb') as file:
    json.dump(rel_map, file)
    #file.write(msgpack.packb(rel_map, use_bin_type=True))


