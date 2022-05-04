import React from "react";
import {
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity
} from 'react-native';
// import { useSelector } from 'react-redux';

import Colors from "../../constants/Colors";

export default function Home({ navigation }) {
    // const user = useSelector((state)=> state.user);
    
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundColor = {
        backgroundColor: isDarkMode ? Colors.dark : Colors.light,
    };

    const textColor = {
        color: isDarkMode ? Colors.darkText : Colors.lightText,
        fontSize: 20
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title} > Town </Text>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Text style={styles.text}> There is nothing here yet </Text>
            </View>
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={()=> {
                    navigation.navigate('Ads')
                }}
            >
                <Text style={styles.text}>View Ad</Text>
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