
url='https://ts-movie-server-mini.herokuapp.com/movie/more_info'
echo "test for $url";


curl --location --request POST "$url" \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "tt0372784"
}'
