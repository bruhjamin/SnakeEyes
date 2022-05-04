import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './home';
import Shop from './shop';
import Quests from './quests';

const Stack = createNativeStackNavigator();

export default function TownNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="TownHome" 
                component={Home} 
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name="Shop" 
                component={Shop} 
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name="Quests" 
                component={Quests} 
                options={{ headerShown: false}}
            />
        </Stack.Navigator>
    );
}