# ts-movie-list

# ios application written entirely in typescript using react-native/expo/nodemon

## Application has three screens  
---
### [search](./frontend/routes/SavedRoute.tsx)  

<div align="center">
    <img src="./search_screen.gif" width="50%" height="75%" />
</div>  

___

### [watch list](./frontend/routes/SavedRoute.tsx)  

<div align="center">
    <img src="./watch_list_screen.PNG" width="50%" height="75%" />
</div>   

___

### [top 250 imdb](./frontend/routes/BrowseRoute.tsx)  
<div align="center">
    <img src="./search_screen.gif" width="50%" height="75%" />
</div>

---

---
* To start the entire application you will need to clone the repo and have a
working version of npm, expo, and  installed.
```
sudo apt install expo npm ngrok
pip install pygrok
```

* You will also need to run the following commands:
```
cd ts-movie-list/frontend
npm install
cd ../ts-movie-list/backend/server
npm install
```

* afterwards you should be able to view the application by going to the root
directory and running the server_starter executable  
```
./server_starter
```

* Further documentation for this script can be found inside of it but the
process it automates is the following:
1. start expo (for frontend)
1. starts nodemon (for backend)
1. starts ngrok on port 3000 (for communication between frontend and backend)
1. updates ngrok url in frontend/helpers/URL.tsx

---
## [Frontend](./frontend/)   

__installation__  

* If you have cloned the repo and used the installed npm, it should work


---
__usage__

* to start only the frontend just run:
`
expo start
`
___

__documentation__


[routes](./frontend/routes/) contain the pages to be rendered  
* [search screen](./frontend/routes/SearchRoute.tsx)
* [saved movies screen](./frontend/routes/SavedRoute.tsx)
* [imdb filter screen](./frontend/routes/SearchRoute.tsx)

[components](./frontend/components/) used on the pages are located in ./components  
* __functional components__  
    * component used for movie tiles -> [MovieTile.jsx](/frontend/components/MovieTile.tsx)
    * component used for rendering the search results -> [MovieList.tsx](/frontend/components/MovieList.tsx)
    * component used for the search bar -> [SearchBar.jsx](/frontend/components/SearchBar.tsx)
    * component used for rendering a popup when a movie tile is pressed -> [Popup.tsx](/frontend/components/Popup.tsx)
    * components used for rendering the information inside of a component are in
        the directory [Popups/](/frontend/components/PopupPages/)
* __object oriented components__
    * TODO

---
## [Backend](./backend/server)  

__installation__

backend was built using: nodemon, mongodb, and rapidapi.com for external api
calls
this means you need a working version of node installed  

```
node -v
npm install nodemon
```
I used yarn as my package manager instead of npm so I also ran:   
```
npm install --global yarn
```

---

__usage__

* to start only the backend run:   
```
nodemon ./backend/server/source/server.ts
```

_note_:  
* for the frontend to communicate with the backend, server_url will
need to be updated in the directory ./frontend/helpers/URL.tsx  

* this uses ngrok to communicate through http.

* either of the bash scripts ./server_starter will automate setting this up ./startup_script 

* instead of using these scripts you could start up ngrok with the following command:  
```
ngrok http 3000
```
* then you would need to update the frontend/helpers/URL.tsx variable
* so copy the http://url.ngrok.io

___

## Future Goals
* add installation script 

* add popupleft feature for -> find similar movies (rapid api has free imdb-api with this feature)

* [this is the 100% free api to implement](https://rapidapi.com/SAdrian/api/data-imdb1/)
    * get keywords to movie 
    * use getMoviesByKeyword
    * also has man other useful api calls, but only renders {"imdb_id": ..., "title": ...}  

* [switch to this api for searches?](https://rapidapi.com/hmerritt/api/imdb-internet-movie-database-unofficial/)

* add browse onChange feature 
    * [dropdown picker website](https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage)
    * [rapid api link - advanced movie search](https://rapidapi.com/jakash1997/api/advanced-movie-search/)
    * [maybe add api for in theaters results](https://rapidapi.com/patriciaatrindade/api/movies115/)

