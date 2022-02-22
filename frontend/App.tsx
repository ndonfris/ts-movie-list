/**
 * File:        App.tsx
 * Author:      Nick Donfris
 * Created:     01/23/22
 */
import * as React from 'react';
import { LogBox } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import SearchRoute from './routes/SearchRoute';
import BrowseRoute from './routes/BrowseRoute';
import SavedRoute from './routes/SavedRoute';
import colors from './helpers/Colors';

/*
 * heroku causes expo to throw warnings when I console.log() wrong
 * input from the api. The expo log pop-up can make you have to reinstall
 * the entire application, so I have disabled them. The Syntax Error is
 * also thrown when bad JSON is seen. If their is actually any syntax errors
 * the entire application would crash and red warnings pop-up.
 */
LogBox.ignoreLogs(["Syntax Error", "JSON Parse error: Unrecognized token"]);

/* 
 * This is where we define our application. This file specifically only handles, the
 * bottom tab bar. It allows the icons on the bottom to be pressed, and once they are
 * pressed on, the UI navigates to the corresponding page.
 */
const App = () => {
    const [index, setIndex] = React.useState(0);

    /* useState hook, defines values for it's inner items */
    const [routes] = React.useState([
        {key: 'search', title: 'Search', icon: 'movie-search', color: colors.barDarker },
        {key: 'saved', title: 'Saved', icon: 'content-save-edit-outline', color: colors.barLighter},
        {key: 'browse', title: 'Browse', icon: 'format-list-numbered', color: colors.barDarker},
    ]);

    /* maps the state to the actual page route */
    const renderScene = BottomNavigation.SceneMap({
        search: SearchRoute,
        saved: SavedRoute,
        browse: BrowseRoute,
    });

    /* return the bottom tabbar component and render the active page (initializes to Search)  */
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


export default App;
