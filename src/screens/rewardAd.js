import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { RewardedAd,RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

import Colors from "../constants/Colors";

const adUnitId = __DEV__ ? TestIds.REWARDED : TestIds.REWARDED;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['games'],
});

export default function Ads({ navigation }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoaded(true);
        });
        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                console.log('reward granted', reward)
                navigation.goBack();
            },
        );
    
        // Start loading the rewarded ad straight away
        rewarded.load();
    
        // Unsubscribe from events on unmount
        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
        };
    }, []);

    useEffect(()=>{
        if(loaded){
            rewarded.show();
        }
    }, [loaded])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading Ad</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: Colors.dark
    },
    title: {
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
    }
});