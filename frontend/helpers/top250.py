
import json

f = open('./top250.json')

arr = json.load(f)

result = []
for data in arr:
    new_dict = dict()
    new_dict["Type"] = data["@type"]
    new_dict["Title"] = data["name"]
    new_dict["Poster"] = data["image"]
    if "datePublished" in data.keys():
        new_dict["Year"] = data["datePublished"]
    else:
        new_dict["Year"] = "N/a" 
    new_dict["imdbID"] =  data["url"]
    print(new_dict)
    result.append(new_dict)

with open("my250.json", 'w') as file:
    json.dump(result, file, indent=4)

