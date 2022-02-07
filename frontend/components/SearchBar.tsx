/**
 * File:        SearchBar.tsx
 * Author:      Nick Donfris
 * Created:     01/24/22
 */
import React, {FC} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {Movie} from '../helpers/Interfaces';

/* props necessary for the searchbar  */
interface Props {
    placeholder?: string;
    searchFunction: () =>  Promise<Movie[]>;
    query: string;
    updateQuery: (text: string) => void;
}


/**
 * SearchBar component is passed many props, from it's parent component.
 * The parent component defines these props, which is used to decouple  
 * it's states.
 *
 * @param {string} placeholder - string to display when there is no input
 * @param {string} query - the value that is update when the user inserts input
 * @param {function} updateQuery - the function that stores the text inputed
 *                                 by the user, to the query 
 * @param {function} searchFunction - when the submit button is pressed, 
 *                                    this function is called.
 *
 * @returns {JSX.Element} - the horizontally centered SearchBar component 
 */
const SearchBar: FC<Props> = ({placeholder, query, updateQuery, searchFunction}) => {
    return (
        <View style={styles.container}>
            <View style={styles.bar}>
                <TextInput
                    style={styles.text}
                    value={query}
                    placeholder={placeholder}
                    placeholderTextColor={"white"}
                    returnKeyType={"search"}
                    onChangeText={updateQuery}
                    onSubmitEditing={searchFunction}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '15%',
        alignItems: 'center',
        color: "#fff",
    },
    bar: {
        justifyContent: "space-around",
        width: 325,
        height: 50,
        textAlign: 'center',
        backgroundColor: 'black',
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 15,
    },
    text: {
        color: "#fff",
    }
});

export default SearchBar;
