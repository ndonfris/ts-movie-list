/**
 * File:        PopupLeft.tsx
 * Author:      Nick Donfris
 * Created:     01/31/22
 */
import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, ListRenderItem, Linking} from "react-native";
import { MovieMoreInfo, reqBody, StreamWebsite } from '../../helpers/Interfaces';
import { noStreamingSites, requestHelper } from '../../helpers/Functions';
import { Ionicons } from '@expo/vector-icons';
import serverURL from '../../helpers/URL';
import colors from '../../helpers/Colors';

interface ShowListProps {
    availabileSites: StreamWebsite[];
}

/**
 * This is a functional component that renders the results for the where a movie
 * is streamable on. Backend inserts a StreamWebsite with a name == "Not Found"
 * if there are StreamWebsites found.
 *
 * @param {StreamWebsite[]} availabileSites - result from api call of array of websites
 *                                            that a movie is streamable.
 * 
 * @returns {JSX.Element} - <FlatList /> of Clickable Websites where you can stream 
 *                          a movie.
 */
function StreamingList({availabileSites}: ShowListProps) {
    
    /**
     * Function that returns a singular result from the backend, that is a website
     * the movie is available to stream on.  One noteable feature implemented 
     * in the ternary operator, is how this function handles displaying 
     * the result list loading.
     *
     * @param {StreamWebsite} item - an element in the array of SteamWebsites found 
     *                               from the api.
     *
     * @returns {ListRenderItem<StreamWebsite>} - Rendered Item to be used in the
     *                                            <FlatList/>
     */
    const renderItem: ListRenderItem<StreamWebsite> = ({item}) => {
        return ( 
            item.name === "Not Found"
                ? 
                <View style={styles.streaming}>
                    <Text style={styles.text}> loading... </Text>
                </View>
                :
                <View style={styles.streaming}>
                    <TouchableOpacity style={styles.iconContainer}
                        onPress={() => {Linking.openURL(item.url)}}
                    >
                        <Image source={{uri: item.icon}} style={styles.icon}  />
                    </TouchableOpacity>
                </View>
        );
    }

    return (
        <FlatList
            style={styles.streamingContainer}
            data={availabileSites}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    );
}

/* the props used in this actual Popup navigation screen */
interface Props {
    moreInfo: MovieMoreInfo;
}

/**
 * The 0th index of the Popup array of navigation screens. 
 *
 * @param {MovieMoreInfo} moreInfo - all info from the backend for an imdbID
 *
 * @returns {JSX.Element} - The left page inside the Popup component list, with
 *                          an inner list of StreamingWebsite interfaces
 */
const PopupLeft = ({moreInfo}: Props) => {
    /* the visibility of the list of available streaming websites */
    const [visible, setVisible] = useState(false);

    /* the result list from the backend api call of StreamingWebsites 
     * Initial state is set from a helperFunction that sets the default 
     * result with the StreamingWebsite.name field set to "Not Found", and
     * is used in the render item ternary operator, for the FlatList of the
*    * <StreamingList /> functional component.
     */
    const [availabileSites, setAvailibleSites] = useState<StreamWebsite[]>(noStreamingSites(moreInfo.imdbID));

    /**
     * @async function to call backend and set the StreamWebsites[] state for this
     * Popup navigation page
     *
     * @returns {Promise<void>} - return is void because instead of returning the SteamWebsite[]
     *                            and storing it in a value, we can make use of the const state
     *                            for the availabieSites array.
     */
    const ShowAvailableSites = async () : Promise<void> => {
        const bodyData: reqBody<string> = {
            "title": moreInfo.imdbID
        };
        let reqData = requestHelper(JSON.stringify(bodyData));
        console.log(reqData);
        try {
            const response = await fetch(serverURL + '/movie/streaming', reqData);
            const obj = await response.json();
            setAvailibleSites(obj);
        } catch (e) {
            setAvailibleSites(noStreamingSites(moreInfo.imdbID));
            console.log(e);
        }
    }
    return (
        <View style={styles.container}>
        <Text style={styles.title}> {moreInfo.Title} </Text>
        <View style={styles.topContainer}>
            <View style={styles.streamingTitle}>
                <Text style={styles.text}>Availible Streaming Options:</Text>
            </View>
            {visible
                ? <StreamingList availabileSites={availabileSites} />
                : <TouchableOpacity style={styles.refresh}
                    onPress={() => {
                        setVisible(!visible)
                        ShowAvailableSites()
                }}>
                    <Ionicons name="ios-refresh-circle-outline" size={24} color="white" />
                </TouchableOpacity>
            }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
    },
    streamingTitle: {
        top: -20,
    },
    topContainer: {
        top: 100,
        minHeight: 200,
    },
    refresh: {
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
    },
    button: {
        alignContent: "center",
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "lightblue",
        borderRadius: 20,
        width: "50%",
        height: 60,
    },
    streaming: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    streamingContainer: {
    },
    iconContainer: {
        width: 100,
    },
    icon: {
        width: 100,
        height: 50,
        resizeMode: "contain",
        tintColor:  colors.dullWhite
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color:  colors.dullWhite,
        position: "absolute",
        top: 10,
    },
    text: {
        color:  colors.dullWhite,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: "center",
    }
})

export default PopupLeft;
