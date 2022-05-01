import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

const initialState = {
	user: {},
    profile: {}
}

const reducer = (state = initialState, action) =>{
	switch(action.type){
		case 'CLEAR_USER':
			return {...state, user: {}}
		case 'SET_USER':
			return {...state, user: action?.user ? action.user : null}
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
        webClientId: '132129768582-te8tvv72al2p2p1kga9qkrbhp9rictd3.apps.googleusercontent.com',
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
