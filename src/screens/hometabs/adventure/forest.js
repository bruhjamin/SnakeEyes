import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Colors from "../../../constants/Colors";
import Battle from "./components/battle";

export default function Forest() {
    return (
        <View style={styles.container}>
            <Text style={styles.title} > Forest </Text>
            <Battle />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.dark
    },
    title: {
        color: Colors.darkText,
        fontSize: 30,
        fontWeight: 'bold'
    }, 
    buttonContainer: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
});