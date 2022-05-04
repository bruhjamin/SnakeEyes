import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import Colors from "../constants/Colors";
import auth from '@react-native-firebase/auth';

export default function Entry({ navigation }) {
    const [profiles, setProfiles] = useState([]);
    const user = auth().currentUser;

    const dispatch = useDispatch();

    const getProfiles = async () => {
        try{
            if(user.uid){
                const subscriber = await firestore()
                    .collection('users')
                    .doc(user.uid)
                    .collection('profiles')
                    .get();
                let profile = [];
                subscriber.forEach(doc => {
                    profile.push(doc.data()); 
                });
                setProfiles(profile.sort((a, b) => b.level - a.level)); 
            }
        } catch (e) {
            console.log('GET ERROR', e)
        }
    }

    useEffect(() => {
        getProfiles();
        navigation.addListener('beforeRemove', (e) => {
            // Prevent default behavior of leaving the screen
            if(e.data.action.type === 'GO_BACK'){
                e.preventDefault();
            }
        })
    }, [navigation, user]);

    useEffect(() => {
        if(profiles.length > 0){
            navigation.navigate('Main', { screen: 'Home' });
            dispatch({ type: 'SET_PROFILE', profile: profiles[0] });
        }
    }, [profiles])

    if(!user){
        return(
            <View/>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text 
                    style={styles.title} 
                    // onPress={()=> getUsers()}
                > Select your profile
                </Text>
                <ScrollView>
                    {profiles.map((profile, index) => {
                        return (
                            <TouchableOpacity 
                                style={styles.userContainer} 
                                onPress={() => { 
                                    navigation.navigate('Main', {
                                        screen: 'Home',
                                        // params: {
                                        //     user: user
                                        // },
                                    });
                                    dispatch({ type: 'SET_PROFILE', profile: profile });
                                }}
                                key={index} 
                            >
                                <Text style={styles.text} > {profile.name} </Text>
                                <Text style={styles.text} > Level: {profile.level} </Text>
                            </TouchableOpacity>
                        );
                    })}
                    {profiles.length < 3 && 
                    (<TouchableOpacity 
                        style={styles.userContainer} 
                        onPress={() => navigation.navigate('Create')}
                    >
                        <Text style={styles.text} > + Create new profile </Text>
                    </TouchableOpacity>)}
                    <View style={styles.profileNum}>
                        <Text style={styles.smallText}>{profiles.length}/3</Text> 
                    </View>
                </ScrollView> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.dark
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.darkText,
    }, 
    userContainer: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    profileNum: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 5
    },
    text: {
        color: Colors.darkText,
        fontSize: 20
    },
    smallText: {
        color: Colors.darkText,
        fontSize: 14
    }
});