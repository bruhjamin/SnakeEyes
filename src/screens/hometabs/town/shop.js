import { Icon } from "@rneui/themed";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import Colors from "../../../constants/Colors";

export default function Shop({ navigation }) {
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
                <Text style={styles.title}> Shop </Text>
            </View>
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={()=> {
                    navigation.navigate('Ads')
                }}
            >
                <Text style={styles.text}>View Ad</Text>
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
    headerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'
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
        borderColor: Colors.light
    },
    text: {
        color: Colors.darkText,
        fontSize: 20
    },
    icon: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 15
    }
});