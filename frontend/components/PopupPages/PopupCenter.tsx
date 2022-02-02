import React from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Image } from "react-native";
import OpenLinks from '../OpenLinks';
import ReviewList from '../ReviewList';
import {MovieMoreInfo} from '../../helpers/Interfaces';
import {AntDesign, Octicons} from '@expo/vector-icons';


interface InLineTextProps {
    titleText: string;
    infoText: string;
}

function InLineText({titleText, infoText}: InLineTextProps) {
    return (
        <View style={styles.textInline}>
            <Text style={styles.smallTitle}>{titleText}:</Text>
            <Text style={styles.smallText}>{infoText}</Text>
        </View>
    )
}

interface Props {
    moreInfo: MovieMoreInfo
};

const PopupCenter = ({moreInfo}: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{uri: moreInfo.Poster}} style={styles.image} />
            </View>
            <View style={styles.topWrapper}>
                <Text style={styles.title}>{moreInfo.Title}</Text>
                <InLineText titleText="Director" infoText={moreInfo.Director} />
                <InLineText titleText="Starring" infoText={moreInfo.Actors} />
                <InLineText titleText="Genre" infoText={moreInfo.Genre} />
                <InLineText titleText="Released" infoText={moreInfo.Released} />
                <InLineText titleText="Runtime" infoText={moreInfo.Runtime} />
                <InLineText titleText="Rating" infoText={moreInfo.Rated} />
                <InLineText titleText="Awards" infoText={moreInfo.Awards} />
            </View>
            <View style={styles.middleWrapper}>
                <Text style={styles.mediumTitle}>Plot: </Text>
                <Text style={styles.plot}>{moreInfo.Plot}</Text>
                <ReviewList moreInfo={moreInfo} />
            </View>
            <View style={styles.bottomWrapper} >
                <OpenLinks title={moreInfo.Title} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 5,
    },
    smallText: {
        fontSize: 10,
        marginTop: 3,
        paddingRight: 30,
    },
    smallTitle: {
        fontSize: 13,
        fontWeight: "bold",
        paddingRight: 5,
    },
    mediumTitle: {
        fontSize: 14,
        fontWeight: "bold",
    },
    image: {
        width: 100,
        height: 200,
        borderRadius: 5,
    },
    plot: {
        fontSize: 14,
        paddingTop: 10,
        minHeight: 80,
        paddingLeft: 0,
        paddingRight: 15,
    },
    textInline: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingBottom: 5, 
    },
    imageContainer: {
        borderRadius: 20,
        top: 15,
        left: 10,
        position: 'absolute',
    },
    topWrapper: {
        flexDirection: "column",
        marginLeft: 118,
        top: 10,
        paddingRight: 10,
        minHeight: 210,
        width: "55%",
    },
    middleWrapper: {
        paddingTop: 20,
        paddingLeft: 10,
    },
    bottomWrapper: {
        alignSelf: "center",
        bottom: 0,
    },
});

export default PopupCenter;
