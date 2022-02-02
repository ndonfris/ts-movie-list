

import json

f = open('./MovieGenres.json')

arr = json.load(f)

for data in arr['genres']:
    print("{label: '"+data['name']+"', value:'"+data['name']+"'},")
