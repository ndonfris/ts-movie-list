/**
 * File:        ReviewList.tsx
 * Author:      Nick Donfris
 * Created:     01/29/22
 */
import React from 'react';
import {StyleSheet, Text, View, Pressable, Linking} from "react-native";
import {MovieMoreInfo, Rating} from "../helpers/Interfaces";
import { SvgXml } from "react-native-svg";
import RottenTomatoesIcon from '../assets/RTIcon.svg';
import MetacriticLogo from '../assets/MetacriticLogo.svg';
import ImdbIcon from '../assets/ImdbIcon.svg';
import {MaterialIcons} from '@expo/vector-icons';


/* Props used in each of the following functional components */
interface ReviewProps {
    Ratings: Rating[];
    Title?: string;
};

/**
 * Functional component that renders if a review score is found.
 * This component is a pressable icon, that opens imdb in Default Browser
 *
 * @param {Rating[]} Ratings - the array of all found ratings found on for a MovieItem
 * @param {Title} Title - the title ot search for in the IMDB URL
 *
 * @returns {JSX.Element} - IMDB icon that is pressable 
 */
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

/**
 * Functional component that renders if a review score is found that has the
 * Rating.Source field matching Rotten Tomatoes. This component is a pressable
 * icon.
 *
 * @param {Rating[]} Ratings - the array of all ratings found in a MovieItem
 * @param {string} Title - the string of the title, to search for on rotten tomatoes
 *                          URL
 *
 * @returns {JSX.Element} - RottenTomatoes icon that is pressable
 */
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

/**
 * Functional component that renders if a review score is found that has the
 * Rating.Source field matching Metacritic. This component is a pressable
 * icon.
 *
 * @param {Rating[]} .Ratings - the array of all ratings found in a MovieItem
 * @param {string} .Title - the string of the title, to search for on Metacritic
 *                          website.
 *
 * @returns {JSX.Element} - MetaCritic icon that is pressable
 */
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

/**
 * Functional component that renders the default Review not found icon. Like all of the
 * functional components called from RevewList, this may return an empty view (nothing).
 *
 * @param {Rating[]} Ratings - the array results found in the backend. The backend
 *                                checks the reviews it finds and if this JSON array is
 *                                empty, it will insert a default Rating interface with the
 *                                the Rating.Source field equal to "N/A".
 *
 * @returns {JSX.Element} - NoneFound icon that is not pressable
 */
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

/* Contains all the info for a popup, since title is needed and Ratings are needed */
interface Props {
    moreInfo: MovieMoreInfo;
};

/**
 * ReviewList of pressable icons, and the score the rated a movie. The list of ratings
 * might contain 0-3 reviews (while it can't actually contain zero ratings, backend inserts
 * a value to catch no reviews found), so each functional component called above must handle
 * not finding it's correlating rating.
 *
 * @param {MovieMoreInfo} .moreInfo - All information found by backend for a movie 
 * @returns {JSX.Element} - ReviewList of pressable icons correlating to:
 *                          [<IMDb/>, <RottenTomatoes/>, <MetaCritic/>] || [<NoneFound/>]
 */
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
