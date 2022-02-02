import React, {useState, useEffect, FC} from 'react';
import {Keyboard, View, StyleSheet, TextInput} from 'react-native';
import {Movie} from '../helpers/Interfaces';

interface Props {
    placeholder?: string;
    searchFunction: () =>  Promise<Movie[]>;
    query: string;
    updateQuery: (text: string) => void;
}


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
