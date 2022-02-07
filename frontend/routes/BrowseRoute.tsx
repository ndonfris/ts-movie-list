/**
 * File:        BrowseRoute.tsx
 * Author:      Nick Donfris
 * Created:     01/24/22
 */
import React, {useState} from 'react';
import {Keyboard, View, StyleSheet, SafeAreaView} from 'react-native';
import MovieList from '../components/MovieList';
import {createRequest} from '../helpers/Functions';
import {Movie} from '../helpers/Interfaces';
import serverURL from '../helpers/URL';
import Movies from '../helpers/Top250Movies.json';
import DropDownPicker from 'react-native-dropdown-picker';

/**
 * Creates a SearchRoute page. Imports the static file Top250Moives.json, which
 * contains the necessary data to render MovieItem's of type Movie. 
 *
 * TODO: implement catagoryQuery, Remove searchQuery
 *
 * @returns {JSX.Element} - Browse Page rendered by clicking on the bottom bar.
 */
export default function BrowseRoute() {
    /* TODO: maybe remove this, or store the item choosen from items */
    const [query, setQuery] = useState('');

    /* prop that determines if the catagory dropdown is opened  */
    const [open, setOpen] = useState(false);

    /* individual value of the selected in the items */
    const [value, setValue] = useState(null);

    /* the Movie genres to search by */
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
    
    /* the results found from the query function */
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
                    placeholder="IMDb Top 250"
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
        paddingBottom: 15,
    },
    text: {
        flexGrow: 1,
        textAlignVertical: 'center',
    },
    labelStyle: {
        width: 325,
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

