import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import ContainersScreen from '../screens/ContainersScreen';
import DisplayContainerScreen from '../screens/DisplayContainerScreen';

const Stack = createStackNavigator();

export default MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="News" component={NewsScreen} />
                <Stack.Screen name="Containers" component={ContainersScreen} />
                <Stack.Screen name="DisplayContainer" component={DisplayContainerScreen} options={{headerTitle: 'Display Container'}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};