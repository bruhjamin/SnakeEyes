import { Icon } from "@rneui/themed";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

import Colors from "../../../constants/Colors";

export default function Profile({ navigation }) {
    const profile = useSelector((state)=> state.profile);
    const user = auth().currentUser;

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title} onPress={()=> console.log(profile)}> {profile.name} </Text>
                <Icon 
                    name='cog' 
                    type='material-community' 
                    color={Colors.light} 
                    size={30} 
                    onPress={()=> {navigation.navigate('Settings')}}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}> Level: {profile.level} </Text>
                {profile.free_stats > 0 && 
                    (<Text style={styles.text}> {profile.free_stats} </Text>)
                }
            </View>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}> HP: {profile.hp * 5} </Text>
                {profile.free_stats > 0 && 
                    (<Icon 
                        name='plus' 
                        type='material-community' 
                        color={Colors.light} 
                        size={30} 
                        containerStyle={styles.icon}
                        onPress={()=> {/*add to stat*/}}
                    />)
                }
            </View>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}> Strength: {profile.strength} </Text>
                {profile.free_stats > 0 && 
                    (<Icon 
                        name='plus' 
                        type='material-community' 
                        color={Colors.light} 
                        size={30} 
                        containerStyle={styles.icon}
                        onPress={()=> {/*add to stat*/}}
                    />)
                }
            </View>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}> Luck: {profile.luck} </Text>
                {profile.free_stats > 0 && 
                    (<Icon 
                        name='plus' 
                        type='material-community' 
                        color={Colors.light} 
                        size={30} 
                        containerStyle={styles.icon}
                        onPress={()=> {/*add to stat*/}}
                    />)
                }
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