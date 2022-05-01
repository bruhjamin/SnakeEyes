import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
} from 'react-native';
import { useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

export default function Entry({ navigation }) {
    const [profiles, setProfiles] = useState([]);
    const user = useSelector((state)=> state.user);
    const dispatch = useDispatch();

    const getUsers = async () => {
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
            console.log('GET ERROR',e)
        }
    }

    useEffect(() => {
        getUsers();
    }, [user]);
    
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundColor = {
        backgroundColor: isDarkMode ? Colors.dark : Colors.light,
    };

    const textColor = {
        color: isDarkMode ? Colors.darkText : Colors.lightText,
        fontSize: 20
    }

    if(user === {}){
        return(
            <View></View>
        );
    } else {
        return (
            <View style={[styles.container, backgroundColor]}>
                <Text 
                    style={[textColor, styles.title]} 
                    onPress={()=> getUsers()}
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
                                <Text style={textColor} > {profile.name} </Text>
                                <Text style={textColor} > Level: {profile.level} </Text>
                            </TouchableOpacity>
                        );
                    })}
                    {profiles.length < 3 && 
                    (<TouchableOpacity 
                        style={styles.userContainer} 
                        onPress={() => navigation.navigate('Create')}
                    >
                        <Text style={textColor} > + Create new profile </Text>
                    </TouchableOpacity>)}
                    <View style={styles.profileNum}>
                        <Text style={[styles.textColor, {fontSize: 14}]}>{profiles.length}/3</Text> 
                    </View>
                </ScrollView> 
            </View>
        );
    }
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
    }
});