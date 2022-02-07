/**
 * File:        Popup.tsx
 * Author:      Nick Donfris
 * Created:     01/27/22
 */
import React, { useRef } from 'react';
import { Modal, StyleSheet, useWindowDimensions, Pressable, View, Animated, ScrollView, SafeAreaView } from "react-native";
import GestureRecognizer from 'react-native-swipe-gestures';
import PopupLeft from "./PopupPages/PopupLeft";
import PopupCenter from "./PopupPages/PopupCenter";
import PopupRight from "./PopupPages/PopupRight";
import { MovieMoreInfo } from '../helpers/Interfaces';
import { AntDesign } from '@expo/vector-icons';

/* Props used in the CloseButton Functional Component */
interface CloseProps {
    modalVisible: boolean;
    updateModal: (modalVisible: boolean) => void;
}

/**
 * <CloseButton /> functional component that is rendered in the top right corner of
 * the Popup. This component functions takes the modalVisible state (which must be true)
 * and sets it to false.
 *
 * @param {function} updateModal - the function called updating the modalVisible state of
 *                                  the popup.
 * @param {boolean} modalVisible - the state of the visibility of this modal
 *
 * @returns {JSX.Element} - closes/removes visibility of this Popup prop
 */
function CloseButton({updateModal, modalVisible}: CloseProps ){
    return (
        <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => updateModal(!modalVisible)}
        >
            <AntDesign name="closecircleo" size={24} color="white" />
        </Pressable>
    );
}

/* Props for the exported component from this file (<Popup/>) */
interface Props {
    moreInfo: MovieMoreInfo;
    modalVisible: boolean;
    updateModal: (modalVisible: boolean) => void;
}

/**
 * information (swipe-able) shown within the inner modal 
 *
 * @param {MovieMoreInfo} moreInfo - the interface containing all extra information about a 
 *                                   movie.
 * @param {function} updateModal - no return, changes the state of the visibility of a modal
 * @param {boolean} modalVisible - the state determining if this Popup is showing. This
 *                                  so that each PopupTile can handle closing the Popup
 *
 * @returns {JSX.Element} - A swippeable list of <PopupTiles/>.
 *                          These are different components in the PopupTiles Directory.
 */
const Popup = ({moreInfo, updateModal, modalVisible}: Props) => {

    /* this is an array of functional components, where each index is used as an inner screen */
    const PopupTiles = [
        <PopupLeft moreInfo={moreInfo} />,
        <PopupCenter moreInfo={moreInfo}/>,
        <PopupRight moreInfo={moreInfo} />,
    ]
    
    /* the X value of that is changed when the user horizontally swipes on the Popup */
    const scrollX = useRef(new Animated.Value(0)).current;

    /* number that is the width of the Device screen */
    const {width: windowWidth} = useWindowDimensions();

    return (
            <View style={styles.container}>
            <GestureRecognizer
                onSwipeDown={() => updateModal(!modalVisible)}
                config={{
                    velocityThreshold: 0.3,
                    directionalOffsetThreshold: 300
                }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        updateModal(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <CloseButton updateModal={updateModal} modalVisible={modalVisible}/>
                            <SafeAreaView style={styles.widthContainer}>
                                <ScrollView
                                    horizontal={true}
                                    pagingEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                    contentOffset={{x: windowWidth-50, y:0}}
                                    zoomScale={1}
                                    scrollEventThrottle={1}
                                    snapToStart={false}
                                    snapToEnd={false}
                                    onScroll={Animated.event([{
                                        nativeEvent: {
                                            contentOffset: {
                                                x: scrollX,
                                            },
                                        },
                                    }],
                                    {useNativeDriver: false},
                                    )}
                                >
                                    {PopupTiles.map((popupTile, index) => {
                                        return(
                                            <Animated.View key={index} style={{width: windowWidth-50, height: "100%"}}>
                                                {popupTile}
                                            </Animated.View>
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
                </GestureRecognizer>
            </View>
    );
};


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "#292d3e",
        borderRadius: 20,
        width: "90%",
        height: "75%",
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
        color: "#fff",
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-evenly",
        width: "20%",
        position: "absolute",
        bottom: 10,
    },
    button: {
        color: "#fff",
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
