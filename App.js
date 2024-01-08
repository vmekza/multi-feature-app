import React, { useState, useEffect } from 'react';
import * as Battery from 'expo-battery';
import { createStackNavigator } from '@react-navigation/stack';
import WeatherScreen from './components/WeatherScreen';
import HomeScreen from "./components/HomeScreen";
import LocationScreen from './components/LocationScreen'; 
import PhoneScreen from "./components/PhoneScreen";
import { NavigationContainer } from '@react-navigation/native';

// Create a stack navigator
const Stack = createStackNavigator();

export default function App() {
    const [batteryLevel, setBatteryLevel] = useState(null);

    // Get the current battery level
    useEffect(() => {
        const getBatteryLevel = async () => {
            const level = await Battery.getBatteryLevelAsync();
            setBatteryLevel(level);
        };

        getBatteryLevel();
    }, []);

    return (
      // Navigation container to hold the stack navigator
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home">
                    {props => <HomeScreen {...props} batteryLevel={batteryLevel} />}
                </Stack.Screen>
                <Stack.Screen name="Weather">
                    {props => <WeatherScreen {...props} batteryLevel={batteryLevel} />}
                </Stack.Screen>
                <Stack.Screen name="Location">
                    {props => <LocationScreen {...props} batteryLevel={batteryLevel} />}
                </Stack.Screen>
                <Stack.Screen name="Phone">
                    {props => <PhoneScreen {...props} batteryLevel={batteryLevel} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
