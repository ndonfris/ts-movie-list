#!/usr/bin/env sh

url='https://ts-movie-server-mini.herokuapp.com/search/title'
echo "test for $url";

curl -s --location --request POST "$url" \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "batman"
}' | jq
