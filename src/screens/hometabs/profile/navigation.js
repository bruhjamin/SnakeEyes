import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from './profile';
import Settings from './settings';

const Stack = createNativeStackNavigator();

export default function ProfileNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ProfileHome" 
                component={Profile} 
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name="Settings" 
                component={Settings} 
                options={{ headerShown: false}}
            />
        </Stack.Navigator>
    );
}