import sys
import json
from shapely.geometry import shape, Point
from shapely.prepared import prep
import numpy as np

bounds = json.load(open(sys.argv[-1], "r"))
geo_json_polygon = {
    "type": "Polygon",
    "coordinates": [[[pnt["lat"], pnt["lng"]] for pnt in bounds]],
}
polygon = shape(geo_json_polygon)
latmin, lonmin, latmax, lonmax = polygon.bounds

# create prepared polygon
prep_polygon = prep(polygon)

# construct a rectangular mesh
points = []
for lat in np.arange(latmin, latmax, (latmax - latmin) / 13):
    for lon in np.arange(lonmin, lonmax, (lonmax - lonmin) / 14):
        points.append(Point((round(lat, 4), round(lon, 4))))

valid_points = []
print(points)
hits = list(filter(prep_polygon.contains, points))
print(hits)

turbines = [
    {"id": f"WTG_{idx + 1}", "lat": pnt.x, "lng": pnt.y}
    for idx, pnt in enumerate(hits[:102])
]
print(len(turbines))
json.dump(turbines, open("assets/ea1_turbines.json", "w"), indent=4)
