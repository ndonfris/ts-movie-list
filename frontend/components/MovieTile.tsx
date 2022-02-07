/**
 * File:        MovieTile.tsx
 * Author:      Nick Donfris
 * Created:     01/24/22
 */
import React, {useState} from 'react';
import {StyleSheet, Text, View, Modal, Image, TouchableOpacity} from 'react-native';
import {Movie, MovieMoreInfo} from '../helpers/Interfaces';
import {createRequest, failedMovieMoreInfo} from '../helpers/Functions';
import serverURL from '../helpers/URL';
import Popup from './Popup';

interface Props {
    movie: Movie;
}

/**
 * A MovieTile, which is a clickable component, which can render more information about the MovieTile
 *
 * @param {Movie} movie - the Movie interface which contains strings that correlate to the necessary details for a movie
 * @returns {JSX.Element} - the tile shown for a Movie, and the set of states that are coupled to rendering more information about a tile. 
 */
const MovieTile = ({movie}: Props) => {
    /* the information retrieved from the api call onClick of MovieTile */
    const [moreInfo, setMoreInfo] = useState<MovieMoreInfo>({} as MovieMoreInfo);

    /* boolean that determines if the moreInfo modal visible */
    const [modalVisible, setModalVisible] = useState(false);

    /**
     * @async Function that is called when a movieTile is selected. 
     *        Returns a unresolved promise. Sets the moreInfo on successful
     *        api call.
     *        
     * @returns {Promise<void>} - instead of returning the objects, it sets them
     *                            and makes use of global variables.
     */
    const ShowMoreInfo = async () : Promise<void> => {
        let reqData = createRequest({
            method: 'POST',
            mode: 'no-cors',
            headers: {
                accept: 'application/json',
                contentType: 'application/json'
            },
            body: movie.imdbID,
        });
        try {
            const response = await fetch(serverURL + '/movie/moreInfo', reqData);
            const obj = await response.json();
            console.log(obj);
            setMoreInfo(obj);
        } catch (e) {
            setMoreInfo(failedMovieMoreInfo(movie));
            console.log(e);
        }
        setModalVisible(true);
    }

    return (
        <View style={styles.outer}>
            <Popup moreInfo={moreInfo} modalVisible={modalVisible} updateModal={() => { setModalVisible(!modalVisible) }} />
            <TouchableOpacity
                style={styles.buttonContainer}
                activeOpacity={0.2}
                onPress={() => {
                    ShowMoreInfo();
                }}>
                <View style={styles.container}>
                    <Image source={{uri: movie.Poster}} style={styles.container} />
                </View>
            </TouchableOpacity> 
        </View>
    );
}


const styles = StyleSheet.create({
    outer: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    container: {
        borderRadius: 10,
        width: 120,
        height: 120,
        alignItems: 'center'
    },
    titleText: {
        textAlign: 'center',
        color: "#fff",
        position: 'absolute',
        bottom: 5,
        fontSize: 10,
        fontWeight: 'bold',
        textShadowColor: "#000",
        textShadowOffset: {
            width: -1,
            height: 1 
        },
        textShadowRadius: 1,
    },
    titleContainer: {
        alignItems: 'center',
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
    }
});

export default MovieTile;
