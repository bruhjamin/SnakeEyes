import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Adventure from './adventure';
import Forest from './forest';

const Stack = createNativeStackNavigator();

/*
    navigation > bottomTabs > adventure/navigation
    Navigation handler for the adventure screens
*/
export default function AdventureNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AdventureHome"
                component={Adventure}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Forest"
                component={Forest}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}
