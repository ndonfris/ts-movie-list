import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import SearchRoute from './routes/SearchRoute';
import BrowseRoute from './routes/BrowseRoute';
import SavedRoute from './routes/SavedRoute';


// const ControllerRoute = () => <View style={styles.container}><Text style={styles.innerContainer}>Controller</Text></View>;

const App = () => {
    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
        { key: 'search', title: 'Search', icon: 'movie-search', color: "#292d3e" },
        {key: 'saved', title: 'Saved', icon: 'content-save-edit-outline', color: "#3b4252"},
        {key: 'browse', title: 'Browse', icon: 'format-list-numbered', color: "#292d3e"},
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
