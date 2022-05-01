import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';

const width = Dimensions.get('window').width;

export default function Player({ attack, isUser }) {
    const [doAttack, setDoAttack] = useState(false);
    
    useEffect(() => {
        setDoAttack(attack)
    }, [attack])

    useEffect(() => {
        if(doAttack){
            //animate attack
            setDoAttack(false);
        }
    }, [doAttack])
    

    return (
        <View 
            style={
                [styles.player, {}]
            }
        />
    );
}

const styles = StyleSheet.create({
    player: {
        backgroundColor: 'red',
        width: (width - 80) / 4,
        height: (width - 80) / 4,
    },
});