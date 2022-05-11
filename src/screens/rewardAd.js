import React, {useState, useEffect} from 'react';
import Config from 'react-native-config';
import {
    RewardedAd,
    RewardedAdEventType,
    TestIds,
} from 'react-native-google-mobile-ads';

import Loading from '../components/loading';

//The id of the add from AdMob
const adUnitId = __DEV__ ? TestIds.REWARDED : Config.AD_50BEANS;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['games'],
});

/*
    Show an ad to the user
*/
export default function Ads({navigation}) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(
            RewardedAdEventType.LOADED,
            () => {
                setLoaded(true);
            },
        );
        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                console.log('reward granted', reward);
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

    useEffect(() => {
        if (loaded) {
            rewarded.show();
        }
    }, [loaded]);

    return <Loading />;
}
