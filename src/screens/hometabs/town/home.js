import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import Colors from "../../../constants/Colors";

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title} > Town </Text>
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={()=> {navigation.navigate('Shop')}}
            >
                <Text style={styles.text}>Shop</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={()=> {navigation.navigate('Quests')}}
            >
                <Text style={styles.text}>Guild</Text>
            </TouchableOpacity>
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
        borderColor: Colors.light
    },
    text: {
        color: Colors.darkText,
        fontSize: 20
    },
});