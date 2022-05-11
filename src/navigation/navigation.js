import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabs from './bottomTabs';
import Entry from '../screens/entry';
import Create from '../screens/create';
import Login from '../screens/login';
import Ads from '../screens/rewardAd';

const Stack = createNativeStackNavigator();
/*
    Main entry navigation of the app
*/
export default function Navigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Create"
                component={Create}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Entry"
                component={Entry}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Main"
                component={BottomTabs}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Ads"
                component={Ads}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
