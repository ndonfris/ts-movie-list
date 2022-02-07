
import json

f = open('./top250.json')

arr = json.load(f)


def get_str_from_field(lis, field):
    string = ""
    for item in lis:
        if field in item.keys():
            string += item[field] + ", "
    string = string.rstrip()
    string = string[:-1]
    return string


result = []
for data in arr:
    new_dict = dict()
    new_dict["Title"] = data["name"]
    if "datePublished" in data.keys():
        new_dict["Year"] = data["datePublished"]
        new_dict["Released"] = data["datePublished"]
    else:
        new_dict["Year"] = "N/a"
        new_dict["Released"] = "N/a"
    new_dict["Runtime"] = data["duration"]
    genres = str(data["genre"])
    genres = genres.replace("'", "")
    genres = genres.replace("[", "")
    genres = genres.replace("]", "")
    new_dict["Genre"] = genres
    if ("name" in data["director"]):
        new_dict["Director"] = data["director"]["name"]
    else:
        new_dict["Director"] = ""
    new_dict["Writer"] = get_str_from_field(data["creator"], "name")
    new_dict["Actors"] = get_str_from_field(data["actor"], "name")
    new_dict["Plot"] = data["description"]
    new_dict["Language"] = "n/a"
    new_dict["Country"] = "n/a"
    new_dict["Awards"] = "n/a"
    new_dict["Poster"] = data["image"]
    new_dict["Ratings"] = [{"Source": "Internet Movie Database",
                            "Value": str(data["aggregateRating"]["ratingValue"])+"/10"}]
    new_dict["Metascore"] = "n/a"
    new_dict["imdbRating"] = str(data["aggregateRating"]["ratingValue"])
    new_dict["imdbVotes"] = str(data["aggregateRating"]["ratingCount"])
    new_dict["imdbID"] = data["url"]
    new_dict["Type"] = data["@type"]
    new_dict["DVD"] = "n/a"
    new_dict["BoxOffice"] = "n/a"
    new_dict["Production"] = "n/a"
    new_dict["Website"] = "n/a"
    new_dict["Response"] = ""

    print(new_dict)
    result.append(new_dict)

with open("new_my250.json", 'w') as file:
    json.dump(result, file, indent=4)
