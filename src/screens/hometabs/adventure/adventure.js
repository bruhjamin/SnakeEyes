import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import Colors from "../../../constants/Colors";

export default function Adventure({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title} > Adventure </Text>
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={()=> navigation.navigate('Forest')}
            >
                <Text style={styles.text}> Search the Forest </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={()=> {/*TODO: MAKE CAVE*/}}
            >
                <Text style={styles.text}> Explore the Cave </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={()=> {/*TODO: MAKE CASTLE*/}}
            >
                <Text style={styles.text}> Enter the Castle </Text>
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
        borderColor: Colors.light,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    text: {
        color: Colors.darkText,
        fontSize: 20
    },
});