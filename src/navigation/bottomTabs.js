import React from 'react';
import Home from '../screens/hometabs/home';
import Profile from '../screens/hometabs/profile';
// import Adventure from '../screens/hometabs/adventure/adventure';
import AdventureNavigation from '../screens/hometabs/adventure/navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../constants/Colors';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelPosition: "beside-icon",
                tabBarLabelStyle: {
                    fontWeight: "700",
                    fontSize: 15,
                },
                tabBarIconStyle: { display: "none" },
                tabBarStyle: {
                    backgroundColor: Colors.bottomTabs
                }
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{ 
                    headerShown: false,
                }}
            />
            <Tab.Screen 
                name="Adventure" 
                component={AdventureNavigation} 
                options={{ 
                    headerShown: false,
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
}