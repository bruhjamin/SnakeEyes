import React, { useState, useEffect } from "react";
import { RewardedAd,RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

import Loading from "../components/loading";

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
        <Loading />
    );
}