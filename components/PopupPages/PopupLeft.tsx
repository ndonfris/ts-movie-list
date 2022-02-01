import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, ListRenderItem, Linking} from "react-native";
import { MovieMoreInfo, StreamWebsite } from '../../helpers/Interfaces';
import { noStreamingSites, requestHelper } from '../../helpers/Functions';
import { Ionicons } from '@expo/vector-icons';
import serverURL from '../../helpers/URL';

interface ShowListProps {
    availabileSites: StreamWebsite[];
}

function StreamingList({availabileSites}: ShowListProps) {
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

interface Props {
    moreInfo: MovieMoreInfo;
}

const PopupLeft = ({moreInfo}: Props) => {
    const [visible, setVisible] = useState(false);
    const [availabileSites, setAvailibleSites] = useState<StreamWebsite[]>(noStreamingSites(moreInfo.imdbID));

    const ShowAvailableSites = async () : Promise<void> => {
        let reqData = requestHelper(moreInfo.imdbID);
        try {
            const response = await fetch(serverURL + '/streaming', reqData);
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
        top: -50,
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
        paddingTop: 20,
    },
    iconContainer: {
        width: 100,
    },
    icon: {
        width: 100,
        height: 50,
        resizeMode: "contain",
        tintColor: 'black'
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
        position: "absolute",
        top: 10,
    },
    text: {
        color: "#000",
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: "center",
    }
})

export default PopupLeft;
