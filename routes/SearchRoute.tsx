import React, {useEffect, useState, FC} from 'react';
import {Keyboard, View, StyleSheet, TextInput, FlatList, ListRenderItem, ListRenderItemInfo} from 'react-native';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import {createRequest} from '../helpers/Functions';
import {MovieArray, Movie} from '../helpers/Interfaces';
import serverURL from '../helpers/URL';
import Movies from '../helpers/my250.json';

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
