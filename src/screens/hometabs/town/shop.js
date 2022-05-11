import {Icon} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../../constants/Colors';

/*
    navigation > bottomTabs > town/navigation > home > shop
    Where the user buys stuff
*/
export default function Shop({navigation}) {
    const user = auth().currentUser;
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {}, []);

    // Grab the profile from firebase to update it locally
    const getProfiles = async () => {
        try {
            if (user.uid) {
                await firestore()
                    .collection('users')
                    .doc(user.uid)
                    .collection('profiles')
                    .get()
                    .then(query => {
                        query.forEach(snapshot => {
                            console.log(snapshot.data());
                            dispatch({
                                type: 'SET_PROFILE',
                                profile: snapshot.data(),
                            });
                        });
                    });
            }
        } catch (e) {
            console.log('GET ERROR', e);
        }
    };

    // give the user 50 beans
    const give50Beans = async () => {
        await firestore()
            .collection('users')
            .doc(user.uid)
            .collection('profiles')
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (document) {
                    document.ref.update({beans: profile.beans + 50});
                });
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Icon
                    name="arrow-left"
                    type="material-community"
                    color={Colors.light}
                    size={30}
                    containerStyle={styles.icon}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Text style={styles.title}> Shop </Text>
            </View>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                    navigation.navigate('Ads');
                }}>
                <Text style={styles.text}>View Ad for 50 beans</Text>
            </TouchableOpacity>
            {/*
                These buttons are for testing firestore
            */}
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                    getProfiles();
                }}>
                <Text style={styles.text}>Update user</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                    give50Beans();
                }}>
                <Text style={styles.text}>Free 50 beans</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                    // navigation.navigate('Ads');
                }}>
                <Text style={styles.text}>Some item</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.dark,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
    title: {
        color: Colors.darkText,
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.light,
    },
    text: {
        color: Colors.darkText,
        fontSize: 20,
    },
    icon: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 15,
    },
});
