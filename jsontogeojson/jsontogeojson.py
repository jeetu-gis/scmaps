from sys import argv
from os.path import exists
import simplejson as json 

 
in_file = "jsontogeojson/superchargers.json"
out_file = "jsontogeojson/out.geojson"

data = json.load(open(in_file))

geojson = {
    "type": "FeatureCollection",
    "features": [
    {
        "type": "Feature",
        "geometry" : {
            "type": "Point",
            "coordinates": [d.get('gps').get('longitude'), d.get('gps').get('latitude')],
            },
        "properties" : d,
     } for d in data]
}


output = open(out_file, 'w')
json.dump(geojson, output)

