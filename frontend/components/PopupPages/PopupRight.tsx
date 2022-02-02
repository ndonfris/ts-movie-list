import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {MovieMoreInfo} from '../../helpers/Interfaces';

interface Props {
    moreInfo: MovieMoreInfo;
}

const PopupRight = ({moreInfo}: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.imageContainer}>
                <Image source={{uri: moreInfo.Poster}} style={styles.image} />
                <View style={styles.textWrapper}>
                    <Text style={styles.text}>Add to watch-list</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    text: {
        height: 30,
        width: 260,
        textAlign: "center",
        textAlignVertical: "center",
        color: '#fff',
        marginTop: 5,
    },
    textWrapper: {
        marginTop: 20,
        textAlignVertical: "center",
        height: 30,
        width: 260,
        backgroundColor: '#292929',
        borderRadius: 20,
    },
    imageContainer: {
        flexGrow: 1,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "80%",
        height: "85%",
        borderRadius: 20,
    },
})

export default PopupRight;
