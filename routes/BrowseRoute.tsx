import React, {useEffect, useState, FC} from 'react';
import {Keyboard, View, StyleSheet, TextInput, FlatList, ListRenderItem, ListRenderItemInfo, SafeAreaView} from 'react-native';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import {createRequest} from '../helpers/Functions';
import {MovieArray, Movie} from '../helpers/Interfaces';
import serverURL from '../helpers/URL';
import Movies from '../helpers/my250.json';
import DropDownPicker from 'react-native-dropdown-picker';

export default function SearchRoute() {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Action', value: 'Action'},
        {label: 'Adventure', value: 'Adventure'},
        {label: 'Animation', value: 'Animation'},
        {label: 'Comedy', value: 'Comedy'},
        {label: 'Crime', value: 'Crime'},
        {label: 'Documentary', value: 'Documentary'},
        {label: 'Drama', value: 'Drama'},
        {label: 'Family', value: 'Family'},
        {label: 'Fantasy', value: 'Fantasy'},
        {label: 'History', value: 'History'},
        {label: 'Horror', value: 'Horror'},
        {label: 'Music', value: 'Music'},
        {label: 'Mystery', value: 'Mystery'},
        {label: 'Romance', value: 'Romance'},
        {label: 'Science Fiction', value: 'Science Fiction'},
        {label: 'TV Movie', value: 'TV Movie'},
        {label: 'Thriller', value: 'Thriller'},
        {label: 'War', value: 'War'},
        {label: 'Western', value: 'Western'}
    ]);
    
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
            <View style={styles.topContainer}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="IMDb Top 250 "
                    style={styles.topBar}
                    containerStyle={styles.labelStyle}
                    textStyle={styles.text}
                    labelStyle={styles.labelStyle}
                    labelProps={{
                        numberOfLines: 1
                    }}
                    disabledStyle={{
                        opacity: 0.5
                    }}
                />
            </View>
            <SafeAreaView style={styles.results}>
                <MovieList movieArray={movieResults}/>
            </SafeAreaView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        marginTop: '15%',
        alignItems: 'center',
        marginLeft: "auto",
        marginRight: "auto",
        position: 'relative',
        zIndex: 100,
        textAlignVertical: 'center',
    },
    text: {
        flexGrow: 1,
        textAlignVertical: 'center',
    },
    labelStyle: {
    },
    topBar: {
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 15,
        width: 325,
        height: 50,
    },
    results: {
        height: '82%',
        position: 'relative',
    }
});

