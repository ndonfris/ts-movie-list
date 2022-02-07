/**
 * File:        SavedRoute.tsx
 * Author:      Nick Donfris
 * Created:     01/24/22
 */
import React, { useEffect, useState } from "react";
import {Movie} from '../helpers/Interfaces';
import MovieTile from '../components/MovieTile';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  SafeAreaView
} from "react-native";
import serverURL from "../helpers/URL";

/**
 * Creates the SavedRoute page. Calls mongoDB.
 *
 * TODO: SavedRoute 
 * TODO: mongoDB 
 * TODO: apiCalls to mongoDB 
 *
 * @returns {JSX.Element} Saved Movies Page rendered by clicking the bottom navigation bar
 */
const SavedRoute = () => {
    const [movies, setMovies] = useState<Movie[]>([] as Movie[]);
    const [refreshing, setRefreshing] = useState(true);
     
    useEffect(() => {
        fetch(serverURL + "/watch_list/get").then(function (response) {
            return response.json();
        }).then(function (parsedJson) {
            setMovies(parsedJson as Movie[]);
            console.log(movies);
            setRefreshing(!refreshing);
        }).catch(function (error) {
            return new Error(error);
        });
    }, []);
    

    const renderItem: ListRenderItem<Movie> = ({item}) => {
        return (
            <MovieTile movie={item} />
        );
    }

    return (
        <SafeAreaView style={styles.results}>
            <FlatList
                data={movies}
                style={styles.results}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                numColumns={3}
                refreshing={refreshing}
                onRefresh={() => {setRefreshing(!refreshing)}}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    results: {
        paddingTop: 250,
    }

});

export default SavedRoute;
