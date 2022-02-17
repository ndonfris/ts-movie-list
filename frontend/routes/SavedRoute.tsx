/**
 * File:        SavedRoute.tsx
 * Author:      Nick Donfris
 * Created:     01/24/22
 */
import React, { useEffect, useState } from "react";
import {Movie} from '../helpers/Interfaces';
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import serverURL from "../helpers/URL";
import SavedMovieList from "../components/SavedMovieList";
import colors from "../helpers/Colors";

/*
 * Creates the SavedRoute page. Calls mongoDB. The useEffect hook is called any time the refreshing
 * state is changed. This hook then asynchronously retrieves the movies from the backend
 *
 * @returns {JSX.Element} Saved Movies Page rendered by clicking the bottom navigation bar
 */
const SavedRoute = () => {
    const [movies, setMovies] = useState<Movie[]>();

    const [refreshing, setRefreshing] = useState(false);
    const [removing, setRemoving] = useState(false);

    useEffect(() => {
        async function retrieveMovies(){ 
            const res = await fetch(serverURL + "/watch_list/get/less");
            await res.json().then(res => setMovies(res)).catch(err => console.warn(err));
        }
        retrieveMovies();
    }, [refreshing]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Watch List</Text>
            </View>
            <View style={styles.results}>
                <SavedMovieList movieArray={movies} removing={removing} refreshing={refreshing} setRefreshing={() => setRefreshing(!refreshing)}/>
            </View> 
            <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => {
                    setRemoving(!removing);
                    setRefreshing(!refreshing);
            }}>
                {removing
                    ? <Text style={styles.buttonText}>Finished Removing</Text>
                    : <Text style={styles.buttonText}>Remove  Movie(s)?</Text>
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.black
    },
    header: {
        paddingTop: "15%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.black
    },
    headerText: {
        color: colors.dullWhite,
        fontSize: 20,
        fontWeight: "bold",
    },
    results: {
        height: "80%",
        width: "100%",
        backgroundColor: colors.black,
        paddingTop: "5%",
        paddingBottom: "5%",
    },
    removeButton: {
        alignSelf: "center",
        width: "60%",
        height: "5%",
        borderRadius: 20,
        backgroundColor: colors.barLighter,
        textAlign: "center",
        justifyContent: "center",
    },
    buttonText: {
        textAlign: "center",
        justifyContent: "center",
        color: colors.dullWhite,
    }
});

export default SavedRoute;
