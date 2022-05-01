import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';

import Colors from "../../constants/Colors";

export default function Profile() {
    const profile = useSelector((state)=> state.profile);
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
            <Text style={[textColor, styles.title]} > Profile </Text>
            <Text style={textColor}> Name: {profile.name} </Text>
            <Text style={textColor}> Level: {profile.level} </Text>
            <View style={styles.id}>
                <Text style={[textColor, {fontSize: 14}]}> UId: {user.uid} </Text>
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
    id: {
        position: "absolute",
        bottom: 0,
        right: 0
    }
});