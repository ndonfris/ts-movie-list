/**
 * File:        PopupCenter.tsx
 * Author:      Nick Donfris
 * Created:     01/31/22
 */
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import OpenLinks from '../OpenLinks';
import ReviewList from '../ReviewList';
import {MovieMoreInfo} from '../../helpers/Interfaces';
import colors from '../../helpers/Colors';


/* strings used to help display the backend api data */
interface InLineTextProps {
    titleText: string;
    infoText: string;
}

/**
 * This is a functional component that just allows significant, decomposition
 * in the PopupCenter component. It styles text to have a bold title, and 
 * have the corresponding infomation vertically aligned next to it.
 * 
 *
 * @param {string} titleText - the string of the title
 * @param {string} infoText - the string for the api result matching the title
 *
 * @returns {JSX.Element} - Vertically aligned component of different sized text
 *                          to render most of the movie information.
 */
function InLineText({titleText, infoText}: InLineTextProps) {
    return (
        <View style={styles.textInline}>
            <Text style={styles.smallTitle}>{titleText}:</Text>
            <Text style={styles.smallText}>{infoText}</Text>
        </View>
    )
}

/* the props for the PopupCenter component */
interface Props {
    moreInfo: MovieMoreInfo
};

/**
 * PopupCenter is the first inner navigation screen when the Popup modal is rendered 
 * and contains the most information about a Movie
 *
 * @param {MovieMoreInfo} moreInfo - the resolved callback from the backend when an
 *                                   imdbID is searched.
 *
 * @returns {JSX.Element} - The middle page inside the Popup component list.
 */
const PopupCenter = ({moreInfo}: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{uri: moreInfo.Poster}} style={styles.image} />
            </View>
            <View style={styles.topWrapper}>
                <Text style={styles.title}>{moreInfo.Title}</Text>
                <InLineText titleText="Director" infoText={moreInfo.Director} />
                <InLineText titleText="Starring" infoText={moreInfo.Actors} />
                <InLineText titleText="Genre" infoText={moreInfo.Genre} />
                <InLineText titleText="Released" infoText={moreInfo.Released} />
                <InLineText titleText="Runtime" infoText={moreInfo.Runtime} />
                <InLineText titleText="Rating" infoText={moreInfo.Rated} />
                <InLineText titleText="Awards" infoText={moreInfo.Awards} />
            </View>
            <View style={styles.middleWrapper}>
                <Text style={styles.mediumTitle}>Plot: </Text>
                <ScrollView style={styles.scroll} fadingEdgeLength={1}>
                    <Text style={styles.plot}>{moreInfo.Plot}</Text>
                </ScrollView>
                <ReviewList moreInfo={moreInfo} />
            </View>
            <View style={styles.bottomWrapper} >
                <OpenLinks title={moreInfo.Title} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 5,
        color: colors.dullWhite
    },
    scroll: {
        maxHeight: 125,
    },
    smallText: {
        fontSize: 10,
        marginTop: 3,
        paddingRight: 30,
        color: colors.dullWhite
    },
    smallTitle: {
        fontSize: 13,
        fontWeight: "bold",
        paddingRight: 5,
        color: colors.dullWhite
    },
    mediumTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: colors.dullWhite
    },
    imageContainer: {
        borderRadius: 20,
        top: 15,
        left: 10,
        position: 'absolute',
    },
    image: {
        width: 100,
        height: 200,
        borderRadius: 5,
    },
    plot: {
        fontSize: 14,
        paddingTop: 10,
        minHeight: 80,
        paddingLeft: 0,
        paddingRight: 15,
        color: colors.dullWhite
    },
    textInline: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingBottom: 5, 
    },
    topWrapper: {
        flexDirection: "column",
        marginLeft: 118,
        top: 10,
        paddingRight: 10,
        minHeight: 210,
        width: "55%",
    },
    middleWrapper: {
        paddingTop: 20,
        paddingLeft: 10,
    },
    bottomWrapper: {
        alignSelf: "center",
        bottom: 15,
    }
});

export default PopupCenter;
