import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Text
} from 'react-native';
import Dice from "./dice6";

const width = Dimensions.get('window').width;

export default function Player({ attack, isUser }) {
    const [doAttack, setDoAttack] = useState(false);
    const [roll, setRoll] = useState(0);
    
    useEffect(() => {
        if(attack){
            setDoAttack(attack)
        }
    }, [attack])

    useEffect(() => {
        if(doAttack){
            //animate attack
            setTimeout(()=> setDoAttack(false), 200);
            setRoll(parseInt(Dice(6)));
        }
    }, [doAttack])

    useEffect(() => {
        if(roll != 0){
            setTimeout(()=> setRoll(0), 800);
        }
    }, [roll])
    
    return (
        <View 
            style={
                [styles.player, {backgroundColor: (roll > 3) ? 'green' : 'blue'}]
            }
        >
            <Text>{roll}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    player: {
        backgroundColor: 'red',
        width: (width - 80) / 4,
        height: (width - 80) / 4,
    },
});