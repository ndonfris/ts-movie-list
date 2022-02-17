import React from 'react';
import {StyleSheet, View, Text, FlatList, ListRenderItem, TouchableOpacity} from 'react-native';
import MovieTile from './MovieTile';
import {Movie} from '../helpers/Interfaces';
import RemoveTile from './RemoveTile';

interface Props {
    movieArray?: Movie[];
    removing?: boolean;
    refreshing: boolean;
    setRefreshing: (refreshing: boolean) => void;
}

const SavedMovieList = ({movieArray, removing, refreshing, setRefreshing}: Props) => {

    const renderItem: ListRenderItem<Movie> = ({item}) => {
        return (
            !removing
            ? <MovieTile movie={item} /> 
            : <RemoveTile movie={item} />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.items}
                data={movieArray}
                renderItem={renderItem}
                keyExtractor={(item) => item.imdbID}
                numColumns={2}
                onRefresh={() => setRefreshing(!refreshing)}
                refreshing={removing}
                extraData={refreshing}
            />
        </View>
    );

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    removeTile: {
        backgroundColor: "lightpink",
        width: 120,
        height: 120,
        padding: 20,
    },
    items: {}

});

export default SavedMovieList;
