import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Button
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";

export default function Login({ navigation }) {
    const [initializing, setInitializing] = useState(true);
    const dispatch = useDispatch();
    const authUser = auth();

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundColor = {
        backgroundColor: isDarkMode ? Colors.dark : Colors.light,
    };

    const textColor = {
        color: isDarkMode ? Colors.darkText : Colors.lightText,
        fontSize: 20
    }
    
    // Handle user state changes
    function onAuthStateChanged(user) {
        if(user){
            navigation.navigate('Entry')
            dispatch({ type: 'SET_USER', user: user });
        }
        if (initializing) setInitializing(false);
    }
    
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    function GoogleSignIn() {
        return (
            <TouchableOpacity
                style={styles.userContainer}
                onPress={() => {
                    onGoogleButtonPress()
                    .then(() => {})
                    .catch((e) => {})
                }}
            >
                <Text style={textColor}>Sign in with Google</Text>
            </TouchableOpacity>
        );
    }
    
    if (initializing) return null;
    
    return (
        <View style={[styles.container, backgroundColor]}>
            <Text style={[ textColor, styles.title]}>Sign in</Text>
            <GoogleSignIn />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,

    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    }, 
    userContainer: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.light
    }
});