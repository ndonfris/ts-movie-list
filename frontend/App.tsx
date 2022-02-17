import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import SearchRoute from './routes/SearchRoute';
import BrowseRoute from './routes/BrowseRoute';
import SavedRoute from './routes/SavedRoute';
import colors from './helpers/Colors';

const App = () => {
    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
        {key: 'search', title: 'Search', icon: 'movie-search', color: colors.barDarker },
        {key: 'saved', title: 'Saved', icon: 'content-save-edit-outline', color: colors.barLighter},
        {key: 'browse', title: 'Browse', icon: 'format-list-numbered', color: colors.barDarker},
    ]);

    const renderScene = BottomNavigation.SceneMap({
        search: SearchRoute,
        saved: SavedRoute,
        browse: BrowseRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            shifting={true}
            barStyle={{
                backgroundColor: colors.black,
                height: 70,
            }}
            inactiveColor={colors.slate}
            activeColor={colors.dullWhite}
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
