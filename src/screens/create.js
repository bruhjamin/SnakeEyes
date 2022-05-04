import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
  } from 'react-native';

import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function Create({ navigation }) {
    const user = auth().currentUser;

    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const addUser = async () => {
        firestore().collection('users').doc(user.uid).collection('profiles').add({
            name: name,
            level: 0,
            free_stats: 0,
            exp: 0,
            luck: 0,
            strengh: 5,
            hp: 5,
            beans: 0,
            magical_beans: 0,
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title} > Create a new profile </Text>
            <TextInput
                style={styles.input}
                placeholderTextColor={Colors.lightText}
                onChangeText={setName}
                value={name}
                placeholder="Input name"
                autoCorrect={false}
            />
            <TouchableOpacity 
                style={[styles.userContainer, {alignItems: 'center'}]} 
                onPress={() => {
                    addUser();
                    dispatch({ 
                        type: 'SET_PROFILE', 
                        profile: {
                        name: name,
                        level: 0
                        } 
                    });
                    navigation.navigate('Main', {screen: 'Home'});
                }}
            >
                <Text style={styles.text}> Submit </Text>
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
    input: {
        borderWidth: 1,
        borderColor: Colors.light,
        paddingLeft: 20,
        marginTop: 10,
        fontSize: 20
    },
    userContainer: {
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