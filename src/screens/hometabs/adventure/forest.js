import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import { Icon } from '@rneui/themed';

import Colors from "../../../constants/Colors";
import Enemies from '../../../constants/Enemies';
import Battle from "./components/battle";

export default function Forest({ navigation }) {
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
                <Text style={styles.title}> Forest </Text>
            </View>
            <Battle enemy={Enemies.slime} navigation={navigation}/>
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
    title: {
        color: Colors.darkText,
        fontSize: 30,
        fontWeight: 'bold'
    }, 
    buttonContainer: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    icon: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 15
    }
});