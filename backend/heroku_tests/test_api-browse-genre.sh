#!/usr/bin/env sh

url='https://ts-movie-server-mini.herokuapp.com/browse/genre'
echo "test for $url";

curl -s --location --request POST "$url" \
--header 'Content-Type: application/json' \
--data-raw '{
    "Genre": "Action"
}' | jq
