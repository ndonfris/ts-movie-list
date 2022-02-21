/**
 * File:        PopupRight.tsx
 * Author:      Nick Donfris
 * Created:     01/31/22
 */
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {addMovieRequest, requestHelper} from '../../helpers/Functions';
import {MovieMoreInfo, addRequestBody, reqBody} from '../../helpers/Interfaces';
import serverURL from '../../helpers/URL';
import colors from '../../helpers/Colors';

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

    /**
     * @async Function that is called when a movieTile is selected. 
     *        Returns a unresolved promise. Sets the moreInfo on successful
     *        api call.
     *        
     * @returns {Promise<void>} - instead of returning the objects, it sets them
     *                            and makes use of global variables.
     */
    const SaveMovie = async (): Promise<void> => {

        const bodyData: reqBody<MovieMoreInfo> = {
            "title": moreInfo
        };
        let bodyString = JSON.stringify(bodyData);
        const reqData = requestHelper(bodyString);
        try {
            const response = await fetch(serverURL + '/watch_list/add', reqData);
            const obj = await response.json();
            console.log(obj);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{uri: moreInfo.Poster}} style={styles.image} />
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.textWrapper} onPress={() => SaveMovie()}>
                    <Text style={styles.text}>Add to watch-list</Text>
                </TouchableOpacity>
            </View> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        justifyContent: "center",
    },
    text: {
        height: 40,
        width: 280,
        textAlign: "center",
        fontWeight: "bold",
        color: colors.dullWhite,
        marginTop: 10,
    },
    textWrapper: {
        textAlignVertical: "center",
        height: 35,
        width: 280,
        backgroundColor: colors.black,
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
