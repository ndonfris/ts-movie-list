import React from 'react';
import {Alert, Modal, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import {MovieMoreInfo} from '../../helpers/Interfaces';




interface Props {
    moreInfo: MovieMoreInfo;
}

const PopupRight = ({moreInfo}: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Add {moreInfo.Title} to Watch List</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignContent: "center",
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "blue",
        borderRadius: 20,
        width: "50%",
        height: 60,
    },
    text: {
        color: "#fff",
        justifyContent: 'center',
        textAlign: "center",
    }
})

export default PopupRight;
