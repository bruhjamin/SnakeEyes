import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

const initialState = {
    profile: {}
}

const reducer = (state = initialState, action) =>{
	switch(action.type){
        case 'CLEAR_PROFILE':
            return {...state, profile: {}}
        case 'SET_PROFILE':
            return {...state, profile: action?.profile ? action.profile : null}
	}
	return state
}

const store = createStore(reducer);

function App() {
    GoogleSignin.configure({
        webClientId: Config.CLIENT_ID,
    });

    mobileAds()
        .setRequestConfiguration({
            // Update all future requests suitable for parental guidance
            maxAdContentRating: MaxAdContentRating.PG,

            // Indicates that you want your content treated as child-directed for purposes of COPPA.
            tagForChildDirectedTreatment: true,

            // Indicates that you want the ad request to be handled in a
            // manner suitable for users under the age of consent.
            tagForUnderAgeOfConsent: true,

            // An array of test device IDs to allow.
            testDeviceIdentifiers: ['EMULATOR'],
        })
        .then(() => {
            // Request config successfully set!
        });

        mobileAds()
            .initialize()
            .then(adapterStatuses => {
                // Initialization complete!
            });

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Navigation />
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}

export default App;
