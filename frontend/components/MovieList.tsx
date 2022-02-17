/**
 * File:        MovieList.tsx
 * Author:      Nick Donfris
 * Created:     01/25/22
 */
import React from 'react';
import {StyleSheet, View, FlatList, ListRenderItem} from 'react-native';
import MovieTile from './MovieTile';
import {Movie} from '../helpers/Interfaces';

/* Array of Movies from Backend */
interface Props {
    movieArray?: Movie[];
}

/**
 * Renders the MovieList, of MovieTiles.
 *
 * @param {Movie[]} movieArray - the Array of movies found from api backend
 *
 * @returns {JSX.Element} - a list of <MovieTiles/>
 */
const MovieList = ({movieArray}: Props) => {

    /*
     * Decomposition function that helps render each item in the FlatList.
     * A FlatList could be thought of as a for loop on a list of components.
     * The keyExtractor prop on the <FlatList/>, specifies to the FlatList
     * what to consider an item. Once an item is extracted from the movieArray, 
     * this function is called to telling the FlatList what to render
     *
     * @param {Movie} item - item is a singular Movie interface
     *
     * @returns {ListRenderItem<Movie>} - Rendered Item to be used in the
     *                                    <FlatList/>.
     */
    const renderItem: ListRenderItem<Movie> = ({item}) => {
        return (
            <MovieTile movie={item} />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.items}
                data={movieArray}
                renderItem={renderItem}
                keyExtractor={(item) => item.imdbID}
                numColumns={3}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    items: {}
});

export default MovieList;

