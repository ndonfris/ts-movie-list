import React, {useRef} from 'react';
import {Alert, Modal, StyleSheet, useWindowDimensions, Pressable, View, Animated, ScrollView, SafeAreaView} from "react-native";
import PopupLeft from "./PopupPages/PopupLeft";
import PopupCenter from "./PopupPages/PopupCenter";
import PopupRight from "./PopupPages/PopupRight";
import {MovieMoreInfo} from '../helpers/Interfaces';
import {AntDesign} from '@expo/vector-icons';

interface Props {
    moreInfo: MovieMoreInfo;
    updateModal: (modalVisible: boolean) => void;
    modalVisible: boolean;
}

interface CloseProps {
    updateModal: (modalVisible: boolean) => void;
    modalVisible: boolean;
}

/**
 * Creates <CloseButton 
 *
 * @param {CloseProps} CloseProps - props needed for this button.
 * @param {function} CloseProps.updateModal - function that updates modalVisible prop on press
 * @param {boolean} CloseProps.modalVisible - boolean that is altered on Press
 * @returns {JSX.element} - close button component
 */
function CloseButton({updateModal, modalVisible}: CloseProps ) {
    return (
        <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
                updateModal(!modalVisible);
            }}
        >
            <AntDesign name="closecircleo" size={24} color="white" />
        </Pressable>
    );
}

/* make a function to pass the textInline into  */
const Popup = ({moreInfo, updateModal, modalVisible}: Props) => {
    const PopupTiles = [
        <PopupLeft moreInfo={moreInfo} />,
        <PopupCenter moreInfo={moreInfo} />,
        <PopupRight moreInfo={moreInfo} />,
    ]

    const scrollX = useRef(new Animated.Value(0)).current;
    scrollX.setOffset(1);

    const { width: windowWidth } = useWindowDimensions();
    
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    updateModal(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <CloseButton updateModal={updateModal} modalVisible={modalVisible} />
                        <SafeAreaView style={styles.widthContainer}>
                            <ScrollView
                                horizontal={true}
                                pagingEnabled={true}
                                snapToAlignment="center"
                                showsHorizontalScrollIndicator={false}
                                onScroll={Animated.event([{
                                    nativeEvent: {
                                        contentOffset: {
                                            x: scrollX,
                                        },
                                    },
                                    }],
                                    {useNativeDriver: false},
                                )}
                                scrollEventThrottle={1}
                            >
                                {PopupTiles.map((popupTile, index) => {
                                    return (
                                        <View key={index} style={{width: windowWidth-50, height: "100%"}}>
                                            {popupTile}
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        </SafeAreaView>
                        <View style={styles.footer}>
                            {PopupTiles.map((movieTile, index) => {
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
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "#88c0d0",
        borderRadius: 20,
        width: "90%",
        height: "70%",
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    footer: {
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-evenly",
        width: "20%",
        position: "absolute",
        bottom: 10,
    },
    button: {
        borderRadius: 30,
        padding: 10,
        backgroundColor: "transparent",
        position: 'absolute',
        top: -5,
        right: -5,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: "transparent",
    },
    container: {
        borderRadius: 15,
    },
    widthContainer: {
        width: "95%",
        height: "95%",
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: "#fff",
        marginHorizontal: 4
    },
    indicatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default Popup;
