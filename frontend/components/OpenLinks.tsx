/**
 * File:        OpenLinks.tsx
 * Author:      Nick Donfris
 * Created:     02/29/22
 */
import React from 'react';
import {StyleSheet, Text, Pressable, View, Linking} from "react-native";
import {AntDesign} from '@expo/vector-icons';

interface Props {
    title: string;
}

/**
 * functional component to return clickable youtube icon, that opens youtube 
 * searching for: "title" trailer
 *
 * @param {string} title - string to search for
 * @returns {JSX.Element} - Pressable icon for Youtube, with "Search Trailer" text 
 */
function GetTrailer({title}: Props) {
    const searchURL = "https://www.youtube.com/results?search_query="+title+" trailer";
    return (
        <View style={styles.item}> 
            <Pressable onPress={() => { Linking.openURL(searchURL) }} >
                <AntDesign name="youtube" size={24} color="black" />
            </Pressable>
            <Text style={styles.text}>Search Trailer</Text>
        </View>
    );
}

/**
 * Queries google for the movie at hand. 
 * onPress will open Google (in default browser) with search results for movies
 *
 * @param {string} title - the title passed to google search
 * @returns {JSX.Element} - Pressable icon for Google, with "Search Google" text
 */
function GetGoogle({title}: Props) {
    const searchURL = "https://www.google.com/search?q="+title;
    return (
        <View style={styles.item}> 
            <Pressable onPress={() => { Linking.openURL(searchURL) }} >
                <AntDesign name="google" size={24} color="black" />
            </Pressable>
            <Text style={styles.text}>Search Google</Text>
        </View>
    );
}


/**
 * This is the OpenLinks component that calls the above functional components,
 * rendering pressable icons which will open other applications on the device.
 *
 * @param {string} .title - the movie title
 * @returns {JSX.Element} - the horizontally centered clickable icons for 
 *                          Youtube and Google.
 */
const OpenLinks = ({title}: Props) => {
    return (
        <View style={styles.container}>
            <GetTrailer title={title} />
            <GetGoogle title={title} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "flex-end",
    },
    item: {
        textAlign: "center",
        alignItems: "center",
        alignContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
    },
    text: {
        marginTop: 5,
        fontSize: 8,
    }
})

export default OpenLinks;
