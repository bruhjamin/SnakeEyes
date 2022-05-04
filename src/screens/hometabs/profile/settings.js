import { Icon } from "@rneui/themed";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
// import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

import Colors from "../../../constants/Colors";

export default function Settings({ navigation }) {
    // const profile = useSelector((state)=> state.profile);
    const user = auth().currentUser;

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Icon 
                    name="arrow-left" 
                    type="material-community" 
                    color={Colors.light} 
                    size={30}
                    containerStyle={styles.icon}
                    onPress={()=> {
                        navigation.goBack()
                    }}
                />
                <Text style={styles.title}> Settings </Text>
            </View>
            {/* <View style={styles.buttonContainer}>
                <Text style={styles.text}> {profile.name} </Text>
            </View> */}
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={()=> {
                    navigation.navigate('Login');
                    auth().signOut();
                }}
            >
                <Text style={styles.text}> Logout </Text>
            </TouchableOpacity>
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
    headerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    buttonContainer: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: Colors.darkText,
        fontSize: 20
    },
    smallText:{
        color: Colors.darkText,
        fontSize: 14
    },
    icon: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 15
    }
});