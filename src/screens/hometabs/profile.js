import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';

import Colors from "../../constants/Colors";

export default function Profile() {
    const profile = useSelector((state)=> state.profile);
    const user = useSelector((state)=> state.user);

    return (
        <View style={styles.container}>
            <Text style={styles.title} > Profile </Text>
            <Text style={styles.text}> Name: {profile.name} </Text>
            <Text style={styles.text}> Level: {profile.level} </Text>
            <View style={styles.id}>
                <Text style={styles.smallText}> UId: {user.uid} </Text>
            </View>
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
    id: {
        position: "absolute",
        bottom: 0,
        right: 0
    },
    text: {
        color: Colors.darkText,
        fontSize: 20
    },
    smallText:{
        color: Colors.darkText,
        fontSize: 14
    }
});