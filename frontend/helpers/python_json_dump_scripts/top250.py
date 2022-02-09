
import os
import sys
import json

f = open('../top250.json')

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
    new_dict["imdbID"] = data["url"]
    print(new_dict)
    result.append(new_dict)

file_path = os.getcwd().split('/')
if ('ts-movie-list' not in file_path):
    print("Error: you are not in a directory containing the server")
    sys.exit(1)

for directory in file_path[::-1]:
    if (directory != 'assets'):
        os.chdir('../')
    if (directory == 'ts-movie-list'):
        break

with open("./top250MoviesShort.json", 'w') as file:
    json.dump(result, file, indent=4)
