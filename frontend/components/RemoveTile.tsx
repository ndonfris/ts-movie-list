/**
 * File:        RemoveTile.tsx
 * Author:      Nick Donfris
 * Created:     01/24/22
 */
import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Movie, MovieMoreInfo, reqBody} from '../helpers/Interfaces';
import {createRequest, failedMovieMoreInfo, requestHelper} from '../helpers/Functions';
import serverURL from '../helpers/URL';
import colors from '../helpers/Colors';


interface Props {
    movie: Movie;
}

/**
 * A MovieTile, which is a clickable component, which can render more information about the MovieTile
 *
 * @param {Movie} movie - the Movie interface which contains strings that correlate to the necessary details for a movie
 * @returns {JSX.Element} - the tile shown for a Movie, and the set of states that are coupled to rendering more information about a tile. 
 */
const RemoveTile = ({movie}: Props) => {
    const [removedMovie, setRemovedMovie] = useState(false);
    /**
     * @async Function that is called when a movieTile is selected. 
     *        Returns a unresolved promise. Sets the moreInfo on successful
     *        api call.
     *        
     * @returns {Promise<void>} - instead of returning the objects, it sets them
     *                            and makes use of global variables.
     */
    const RemoveMovie = async () : Promise<void> => {
        if (movie.imdbID === "" || movie.imdbID === undefined || movie.imdbID === null) {
            return Promise.resolve();
        }
        let bodyData : reqBody<string> = { "title": movie.imdbID };
        let reqData = requestHelper(JSON.stringify(bodyData));
        try {
            const response = await fetch(serverURL + '/watch_list/remove', reqData);
            const obj = await response.json();
            console.log(obj);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.outer}>
            <TouchableOpacity
                style={removedStyles(removedMovie).buttonContainer}
                activeOpacity={0.2}
                onPress={() => {
                    RemoveMovie();
                    setRemovedMovie(true);
                }}>
                <View style={removedStyles(removedMovie).buttonContainer}>
                    <View style={styles.topText}>
                        {removedMovie
                            ?<Text style={removedStyles(removedMovie).removedText}>REMOVED</Text>
                            :<Text style={removedStyles(removedMovie).removedText}>Press to Remove</Text>
                        }
                    </View> 
                    <View style={styles.middleText}>
                        <Text style={removedStyles(removedMovie).text}>{movie.Title}</Text>
                    </View>
                </View>
            </TouchableOpacity> 
        </View>
    );
}

const removedStyles = (removedMovie : boolean) => StyleSheet.create({
    buttonContainer: {
        backgroundColor: removedMovie ? colors.barDarker : colors.barLighter,
        color: removedMovie ? "black" : "white",
        borderRadius: 10,
        width: 120,
        height: 120,
        alignItems: 'center',
        textAlign: 'center',
    },
    text: {
        alignItems: 'center',
        textAlign: 'center',
        color: removedMovie ? "red" : colors.dullWhite,
    },
    removedText: {
        alignItems: 'center',
        textAlign: 'center',
        color: removedMovie ? "red" : colors.dullWhite,
        fontWeight: 'bold'
    }
});


const styles = StyleSheet.create({
    outer: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    container: {
        backgroundColor: 'red',
        borderRadius: 10,
        width: 120,
        height: 120,
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff'
    },
    topText: {
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'space-around'
    },
    middleText: {
        alignItems: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        alignSelf: 'center',
        justifyContent: 'space-around',
        paddingTop: 5
    },
    buttonContainer: {
        alignItems: 'center',
    }
});

export default RemoveTile;
