url='https://ts-movie-server-mini.herokuapp.com/watch_list/get/less'
echo "test for $url";

curl -s --location --request GET "$url" \
--header 'Content-Type: application/json' | jq

