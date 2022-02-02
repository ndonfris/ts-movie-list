import React from 'react';
import {StyleSheet, Text, Pressable, View, Linking} from "react-native";
import {AntDesign} from '@expo/vector-icons';


interface Props {
    title: string;
}

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
