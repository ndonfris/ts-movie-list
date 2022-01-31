import React from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Image } from "react-native";
import OpenLinks from '../OpenLinks';
import ReviewList from '../ReviewList';
import {MovieMoreInfo} from '../../helpers/Interfaces';
import {AntDesign, Octicons} from '@expo/vector-icons';



interface Props {
    moreInfo: MovieMoreInfo;
}

const PopupLeft = ({moreInfo}: Props) => {
    return (
            <View style={styles.imageContainer}>
                <Image source={{uri: moreInfo.Poster}} style={styles.image} />
            </View>
    )
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "80%",
        height: "85%",
        borderRadius: 5,
    },
})

export default PopupLeft;
