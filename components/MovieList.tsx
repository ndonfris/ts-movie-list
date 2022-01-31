import React from 'react';
import {StyleSheet, View, FlatList, ListRenderItem} from 'react-native';
import MovieTile from './MovieTile';
import {Movie} from '../helpers/Interfaces';

interface Props {
    movieArray?: Movie[];
}

const MovieList = ({movieArray}: Props) => {

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

