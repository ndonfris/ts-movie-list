/**
 * File:        BrowseRoute.tsx
 * Author:      Nick Donfris
 * Created:     01/24/22
 */
import React, {useState} from 'react';
import {Keyboard, View, StyleSheet, SafeAreaView} from 'react-native';
import MovieList from '../components/MovieList';
import {createGetRequestBody } from '../helpers/Functions';
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

    const searchGenre = async () : Promise<Movie[]> => {
        Keyboard.dismiss();
        let reqData = createGetRequestBody("genre", value);
        try {
            const response = await fetch(serverURL+"/browse/genre", reqData);
            const body = await response.json();
            console.log(body);
            setMovieResults(body);
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
                    onSelectItem={() => searchGenre()}
                    placeholder="IMDb Top 250"
                    theme="DARK"
                    style={styles.topBar}
                    containerStyle={styles.containerStyle}
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
        backgroundColor: "#0D1117",
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
    containerStyle: {
        width: 325,
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

