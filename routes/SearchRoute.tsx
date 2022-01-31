import React, {useEffect, useState, FC} from 'react';
import {Keyboard, View, StyleSheet, TextInput, FlatList, ListRenderItem, ListRenderItemInfo} from 'react-native';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import {createRequest} from '../helpers/Functions';
import {MovieArray, Movie} from '../helpers/Interfaces';
import serverURL from '../helpers/URL';

const Movies = [
    {
        "Poster": "https://m.media-amazon.com/images/M/MV5BZDE2ZDFhMDAtMDAzZC00ZmY3LThlMTItMGFjMzRlYzExOGE1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
        "Title": "Batman: Arkham City",
        "Type": "game",
        "Year": "2011",
        "imdbID": "tt1568322",
    },
    {
        "Poster": "https://m.media-amazon.com/images/M/MV5BYTBiZjFlZDQtZjc1MS00YzllLWE5ZTQtMmM5OTkyNjZjMWI3XkEyXkFqcGdeQXVyMTA1OTEwNjE@._V1_SX300.jpg",
        "Title": "Batman Beyond",
        "Type": "series",
        "Year": "1999–2001",
        "imdbID": "tt0147746",
    },
    {
        "Poster": "https://m.media-amazon.com/images/M/MV5BYjdkZWFhNzctYmNhNy00NGM5LTg0Y2YtZWM4NmU2MWQ3ODVkXkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg",
        "Title": "Son of Batman",
        "Type": "movie",
        "Year": "2014",
        "imdbID": "tt3139072",
    },
];


export default function SearchRoute() {
    const [query, setQuery] = useState('');
    
    const [movieResults, setMovieResults] = useState<Movie[]>(Movies);


    const searchQuery = async () : Promise<Movie[]> => {
        Keyboard.dismiss();
        let reqData = createRequest({
            method: 'POST',
            mode: 'no-cors',
            headers: {
                accept: 'application/json',
                contentType: 'application/json'
            },
            body: query,
        });
        try {
            const response = await fetch(serverURL+"/search", reqData);
            const body = await response.json();
            console.log(body.Search);
            setMovieResults(body.Search);
            return body;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    };


    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Search for a movie..."
                query={query}
                updateQuery={text => setQuery(text)} 
                searchFunction={searchQuery}
            />
            <View style={styles.results}>
                <MovieList movieArray={movieResults}/>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    results: {
        paddingTop: 0,
        height: '82%',
    }

});


// .then(res => res.json())
// .then(resData => {
//     console.log(resData);
//     setMovieResults(resData);
// })
