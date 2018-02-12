import csv
import sys
from collections import defaultdict
import datetime
import json
from typing import List, Dict, Tuple, Any
import pandas as pd


if len(sys.argv) is not 2:
    exit(1)

with open(sys.argv[1], 'r') as file:
    data = pd.read_csv(file)


# Headings of note:

fixed_map = defaultdict((lambda: defaultdict(list)))


def fix_date_time(dt: str) -> int:
    return int(datetime.datetime(int(dt[:4]), int(dt[5:7]),
                                 int(dt[8:10]), int(dt[10:12]),
                                 int(dt[13:15]), int(dt[16:18])).timestamp())



with open(sys.argv[1], 'r') as file:
    for row in csv.DictReader(file, delimiter=',', quotechar='"'):
        fixed_map[row['truck_name']][fix_date_time(row['date_fixed'])].append({'y': float(row['latitude']),
                                                                               'x': float(row['longitude'])})
earliest_time = min([truck_data.keys() for truck_name, truck_data in fixed_map.items()])


def get_bounds(data: Dict[str, Dict[float, List[Dict[str, float]]]]) -> Tuple[Any, Any, Any, Any]:
    min_lat, max_lat, min_lon, max_lon = 90, -90, 180, -180
    for time in [truck_data.keys() for truck_name, truck_data in fixed_map.items()]:
        for entry in time:
            min_lat = min([min_lat, entry['y']])
            max_lat = max([max_lat, entry['y']])
            min_lon = min([min_lon, entry['x']])
            max_lon = max([max_lon, entry['x']])
    return min_lat, max_lat, min_lon, max_lon

min_lat, max_lat, min_lon, max_lon = get_bounds(fixed_map)
d_lat = max_lat - min_lat
d_lon = max_lon - min_lon

nat = max(d_lat, d_lon)


def make_relative(time: List[Dict[str, float]]) -> List[Dict[str, float]]:
    for entry in time:
        entry['y'] = (entry['y'] - min_lat) / nat
        entry['x'] = (entry['x'] - min_lon) / nat
    return time


rel_map = defaultdict((lambda: defaultdict(list)))

for truck_name, truck_data in fixed_map.items():
    for key, value in truck_data.items():
        rel_map[truck_name][key - earliest_time] = make_relative(value)

with open(sys.argv[1] + '.js', 'w') as file:
    file.write('var a = ')
    json.dump(rel_map, file, sort_keys=True, indent=0, separators=(',', ': '))

