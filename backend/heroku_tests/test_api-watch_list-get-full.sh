#!/usr/bin/env sh

url='https://ts-movie-server-mini.herokuapp.com/watch_list/get/full'
echo "test for $url";

curl -s --location --request GET "$url" \
--header 'Content-Type: application/json' | jq
