import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    useColorScheme,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import { useSelector } from 'react-redux';

import Colors from "../../../../constants/Colors";
import Player from "./player";

export default function Battle() {
    // const user = useSelector((state)=> state.user);
    const [doAttack, setDoAttack] = useState(false);

    const isDarkMode = useColorScheme() === 'dark';

    const textColor = {
        color: isDarkMode ? Colors.darkText : Colors.lightText,
        fontSize: 20
    }

    useEffect(()=>{
        if(doAttack){
            setDoAttack(false)
        }
    }, [doAttack])

    return (
        <View style={styles.gameContainer}>
            <View style={styles.displayContainer}>
                {/* TODO ENEMY HP BAR */}
                <View>
                    <Text style={{alignSelf: 'flex-end'}}>HP</Text>
                    <View style={{height: 5, backgroundColor: 'red'}}/>
                </View>
                <View style={styles.playerContainer}> 
                    <Player attack={doAttack} isUser={true}/>
                    <Player attack={doAttack} isUser={false}/>
                </View>
                {/* TODO USER HP BAR */}
                <View>
                    <Text style={{alignSelf: 'flex-start'}}>HP</Text>
                    <View style={{height: 5, backgroundColor: 'red'}}/>
                </View>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity 
                    style={styles.buttonContainer}
                    onPress={()=> setDoAttack(true)}
                >
                    <Text style={textColor}>Roll</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buttonContainer}
                >
                    <Text style={textColor}>Rest</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                    style={styles.buttonContainer}
                >
                    <Text style={textColor}>Items</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
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
    buttonContainer: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    gameContainer: {
        flex: 1,
    },
    actionContainer: {
        flex: 1,
    },
    displayContainer: {
        flex: 2,
        // flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.light,
        padding: 20
    },
    playerContainer: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});