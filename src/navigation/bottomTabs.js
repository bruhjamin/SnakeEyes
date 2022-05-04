import React from 'react';
import AdventureNavigation from '../screens/hometabs/adventure/navigation';
import TownNavigation from '../screens/hometabs/town/navigation';
import ProfileNavigation from '../screens/hometabs/profile/navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';

import Colors from '../constants/Colors';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    alignItems:'center',
                    justifyContent: 'space-between',
                    backgroundColor: Colors.bottomTabs,
                },
                tabBarLabel: () => {},
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={TownNavigation} 
                options={{ 
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" type="material-community" color={color} size={size}/>
                    ),
                }}
            />
            <Tab.Screen 
                name="Adventure" 
                component={AdventureNavigation} 
                options={{ 
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="sword-cross" type="material-community" color={color} size={size}/>
                    ),
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileNavigation} 
                options={{ 
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="account" type="material-community" color={color} size={size}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}