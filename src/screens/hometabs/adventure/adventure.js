import React from "react";
import {
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';

import Colors from "../../../constants/Colors";

export default function Adventure({ navigation }) {
    const user = useSelector((state)=> state.user);
    
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundColor = {
        backgroundColor: isDarkMode ? Colors.dark : Colors.light,
    };

    const textColor = {
        color: isDarkMode ? Colors.darkText : Colors.lightText,
        fontSize: 20
    }

    return (
        <View style={[styles.container, backgroundColor]}>
            <Text style={[textColor, styles.title]} > Adventure </Text>
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={()=> navigation.navigate('Forest')}
            >
                <Text style={textColor}> Search the Forest </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={()=> {/*TODO: MAKE CAVE*/}}
            >
                <Text style={textColor}> Explore the Cave </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={()=> {/*TODO: MAKE CASTLE*/}}
            >
                <Text style={textColor}> Enter the Castle </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
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