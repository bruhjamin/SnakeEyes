import React from "react";
import {
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';

import Colors from "../../constants/Colors";

export default function Home() {
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
            <Text style={[textColor, styles.title]} > Town </Text>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Text style={textColor}> There is nothing here yet </Text>
            </View>
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
});