import React from 'react';
import {StyleSheet, Text, View, Pressable, Linking} from "react-native";
import {MovieMoreInfo, Rating} from "../helpers/Interfaces";
import { SvgXml } from "react-native-svg";
import RottenTomatoesIcon from '../assets/RTIcon.svg';
import MetacriticLogo from '../assets/MetacriticLogo.svg';
import ImdbIcon from '../assets/ImdbIcon.svg';
import {MaterialIcons} from '@expo/vector-icons';

interface Props {
    moreInfo: MovieMoreInfo;
};

interface ReviewProps {
    Ratings: Rating[];
    Title?: string;
};

function IMDB({Ratings, Title}: ReviewProps) {
    const review = Ratings.find(rating => rating.Source as Rating === "Internet Movie Database")?.Value;
    if (review == null) {
        return (<View></View>);
    } else {
        const searchURL = "https://www.imdb.com/find?q="+ Title;
        return (
            <Pressable style={styles.rating} onPress={() => { Linking.openURL(searchURL) }}>
                <SvgXml width="80" height="100" xml={ImdbIcon} />
                <Text style={styles.text}>{review}</Text>
            </Pressable>
        );
    }
};

function RottenTomatoes({Ratings, Title}: ReviewProps ){
    let searchURL = "https://www.rottentomatoes.com/search?search="+Title;
    let review = Ratings.find(rating => rating.Source as Rating== "Rotten Tomatoes")?.Value;
    if (review == null) {
        return (<View></View>);
    } else {
        return (
            <Pressable style={styles.rating} onPress={() => { Linking.openURL(searchURL) }}>
                <SvgXml width="80" height="100" xml={RottenTomatoesIcon} />
                <Text style={styles.text}>{review}</Text>
            </Pressable>
        );
    } 
};

function MetaCritic({Ratings, Title}: ReviewProps) {
    let searchURL = "https://www.metacritic.com/search/all/"+Title+"/results";
    let review = Ratings.find(rating => rating.Source as Rating == "Metacritic")?.Value;
    if (review == null) {
        return (<View></View>);
    } else {
        return (
            <Pressable style={styles.rating} onPress={() => { Linking.openURL(searchURL) }}>
                <SvgXml width="80" height="100" xml={MetacriticLogo} />
                <Text style={styles.text}>{review}</Text>
            </Pressable>
        );
    }
}

function NoneFound({Ratings}: ReviewProps) {
    const review = Ratings.filter(({ Source }) => Source === "N/a");
    console.log(review);
    if (review.length == 0) {
        return (<View></View>);
    } else {
        return (
            <View style={styles.rating} >
                <MaterialIcons name="error-outline" size={40} color="black" style={styles.error}/>
                <Text style={styles.text}>Reviews not found</Text>
            </View>
        );
    }
}

const ReviewList = ({moreInfo}: Props) => {
    return (
        <View style={styles.container}>
            <IMDB Ratings={moreInfo.Ratings} Title={moreInfo.Title} /> 
            <RottenTomatoes Ratings={moreInfo.Ratings} Title={moreInfo.Title} /> 
            <MetaCritic Ratings={moreInfo.Ratings} Title={moreInfo.Title} />
            <NoneFound Ratings={moreInfo.Ratings as Rating[]} />
        </View>
    );
}
    
const styles = StyleSheet.create({
    container: {
        top: -10,
        flexDirection: "row",
        alignSelf: "center",
        alignContent: "space-between",
        minHeight: 100,
    },
    rating: {
        color: '#fff',
        margin: 10,
    },
    text: {
        color: "#000",
        top: -20,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    error: {
        textAlign: "center",
        top: -10,
        paddingBottom: 10,
    }
});

export default ReviewList;
