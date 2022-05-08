import React, { useEffect } from "react";
import { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';
import Colors from "../../../../constants/Colors";

const width = Dimensions.get('window').width - 80;

export default function HpBar({ maxHp, currentHp, isUser }) {
    const barStyle = {
        flexDirection: 'row',
        justifyContent: isUser ? 'flex-end' : 'flex-start'
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!isNaN(maxHp)){
            setLoading(false);
        }
    }, [maxHp]);

    if(loading){
        return (
            <View>
                <View style={barStyle}>
                    <Text>{currentHp} / {maxHp}</Text>
                </View>
                <View style={styles.hpBar}/>
            </View>
        )
    }

    return (
        <View>
            <View style={barStyle}>
            <Text>{currentHp} / {maxHp}</Text>
            </View>
            <View style={[styles.hpBar, {width: width * (currentHp / maxHp)}]}/>
            <View style={styles.bottomBar}/>
        </View>
    );
}

const styles = StyleSheet.create({
    hpBar: {
        height: 4, 
        backgroundColor: 'red'
    },
    bottomBar: {
        height: 1, 
        backgroundColor: Colors.bottomTabs
    },
});