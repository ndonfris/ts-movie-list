import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import SearchRoute from './routes/SearchRoute';
import BrowseRoute from './routes/BrowseRoute';

const SavedRoute = () => <View style={styles.container}><Text style={styles.innerContainer}>Content</Text></View>; 

// const ControllerRoute = () => <View style={styles.container}><Text style={styles.innerContainer}>Controller</Text></View>;

const App = () => {
    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
        { key: 'search', title: 'Search', icon: 'movie-search', color: "black" },
        { key: 'saved', title: 'Saved', icon: 'content-save-edit-outline', color: "#292929" },
        { key: 'browse', title: 'Browse', icon: 'format-list-numbered', color: "#a2a2a2" },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        search: SearchRoute,
        browse: BrowseRoute,
        saved: SavedRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            shifting={true}
            barStyle={{
                backgroundColor: '#000',
                height: 70,
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    innerContainer: {
        textAlign: 'center',
    }
});


export default App;
