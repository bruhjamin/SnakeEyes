import React from "react";
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';

import Colors from "../constants/Colors";

const width = Dimensions.get('window').width - 80;

export default function D6({ dots }) {
    if(dots === 0){
        return(<View style={[styles.player, {opacity: 0}]}/>);
    }

    return (
        <View style={styles.dice}>
            <View style={styles.container}>
                <View style={[styles.dot, { opacity: dots > 1 ? 1 : 0 }]}/>
                <View style={[styles.dot, { opacity: dots > 3 ? 1 : 0 }]}/>
            </View>
            <View style={styles.container}>
                <View style={[styles.dot, { opacity: dots === 6 ? 1 : 0 }]}/>
                <View style={[styles.dot, { opacity: dots % 2 === 1 ? 1 : 0 }]}/>
                <View style={[styles.dot, { opacity: dots === 6 ? 1 : 0 }]}/>
            </View>
            <View style={styles.container}>
                <View style={[styles.dot, { opacity: dots > 3 ? 1 : 0 }]}/>
                <View style={[styles.dot, { opacity: dots > 1 ? 1 : 0 }]}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dice: {
        backgroundColor: Colors.light,
        width: width / 4,
        height: width / 4,
        borderRadius: 5,
        padding: width / 32
    },
    dot: {
        backgroundColor: Colors.dot,
        width: width / 20,
        height: width / 20, 
        borderRadius: width / 10
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});