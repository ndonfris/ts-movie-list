import React, { useRef } from "react";
import {MovieArray, Movie} from '../helpers/Interfaces';
import MovieTile from '../components/MovieTile';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions
} from "react-native";
const Movies = [
    {
        "Poster": "https://m.media-amazon.com/images/M/MV5BZDE2ZDFhMDAtMDAzZC00ZmY3LThlMTItMGFjMzRlYzExOGE1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
        "Title": "Batman: Arkham City",
        "Type": "game",
        "Year": "2011",
        "imdbID": "tt1568322",
    },
    {
        "Poster": "https://m.media-amazon.com/images/M/MV5BYTBiZjFlZDQtZjc1MS00YzllLWE5ZTQtMmM5OTkyNjZjMWI3XkEyXkFqcGdeQXVyMTA1OTEwNjE@._V1_SX300.jpg",
        "Title": "Batman Beyond",
        "Type": "series",
        "Year": "1999–2001",
        "imdbID": "tt0147746",
    },
    {
        "Poster": "https://m.media-amazon.com/images/M/MV5BYjdkZWFhNzctYmNhNy00NGM5LTg0Y2YtZWM4NmU2MWQ3ODVkXkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg",
        "Title": "Son of Batman",
        "Type": "movie",
        "Year": "2014",
        "imdbID": "tt3139072",
    },
];

const movieTiles = [
    <MovieTile movie={Movies[0]} />,
    <MovieTile movie={Movies[1]} />,
    <MovieTile movie={Movies[2]} />,
]

const SavedRoute = () => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const { width: windowWidth } = useWindowDimensions();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scrollContainer}>
                <ScrollView
                    horizontal={true}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event([{
                        nativeEvent: {
                            contentOffset: {
                                x: scrollX
                            }
                        }
                    }])}
                    scrollEventThrottle={1}
                >
                    {movieTiles.map((movieTile, index) => {
                        return (
                            <View
                                style={{ width: windowWidth-50, height: 250}}
                                key={index}
                            >
                                {movieTile}
                            </View>
                        );
                    })}
                </ScrollView>
                <View style={styles.indicatorContainer}>
                    {movieTiles.map((movieTile, index) => {
                        const width = scrollX.interpolate({
                            inputRange: [
                                windowWidth * (index - 1),
                                windowWidth * index,
                                windowWidth * (index + 1)
                            ],
                            outputRange: [8, 16, 8],
                            extrapolate: "clamp"
                        });
                        return (
                            <Animated.View
                                key={index}
                                style={[styles.normalDot, { width }]}
                                />
                        );
                    })}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SavedRoute;
