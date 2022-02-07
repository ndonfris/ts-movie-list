/**
 * File:        PopupRight.tsx
 * Author:      Nick Donfris
 * Created:     01/31/22
 */
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {MovieMoreInfo} from '../../helpers/Interfaces';

/* the MovieMoreInfo prop containing the info pertaining to a Movie  */
interface Props {
    moreInfo: MovieMoreInfo;
}

/**
 * The 2nd index in the inner navigation screen when the Popup modal is rendered
 * to the display. Renders the poster image for a movie, and a button below it.
 * Clicking anywhere on this prop should add this movie to the bottom tab navigation
 * route for the Watchlist screen.
 *
 * @param {MovieMoreInfo} moreInfo - the availabile information for a movie from 
 *                                   the backend
 *
 * @returns {JSX.Element} - The right page inside the Popup component list.
 */
const PopupRight = ({moreInfo}: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{uri: moreInfo.Poster}} style={styles.image} />
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.textWrapper}>
                    <Text style={styles.text}>Add to watch-list</Text>
                </TouchableOpacity>
            </View> 
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        justifyContent: "center",
    },
    text: {
        height: 40,
        width: 260,
        textAlign: "center",
        fontWeight: "bold",
        color: '#fff',
        marginTop: 10,
    },
    textWrapper: {
        textAlignVertical: "center",
        height: 35,
        width: 280,
        backgroundColor: '#595959',
        borderRadius: 20,
    },
    buttonWrapper: {
        alignItems: "center",
        justifyContent: "center",
        top: -10,
    },
    imageContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "90%",
        height: "95%",
        borderRadius: 20,
    }
})

export default PopupRight;
