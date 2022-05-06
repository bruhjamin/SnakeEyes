import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Text
} from 'react-native';
import Colors from "../../../../constants/Colors";

const width = Dimensions.get('window').width - 80;

export default function Player({ attack, rolled }) {
    const [doAttack, setDoAttack] = useState(false);
    
    useEffect(() => {
        if(attack){
            setDoAttack(attack);
        }
    }, [attack])

    useEffect(() => {
        if(doAttack){
            //animate attack
            setTimeout(()=> setDoAttack(false), 200);
        }
    }, [doAttack])
    
    return (
        <View style={styles.player}>
            <Text>missing image</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    player: {
        backgroundColor: 'green',
        width: width / 4,
        height: width / 4,
        borderRadius: 5,
        padding: width / 32
    },
});