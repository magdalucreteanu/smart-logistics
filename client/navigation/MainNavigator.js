import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import ContainersScreen from '../screens/ContainersScreen';
import ContainerDisplayScreen from '../screens/ContainerDisplayScreen';
import ContainerLocationScreen from '../screens/ContainerLocationScreen';
import ContainerEnvironmentScreen from '../screens/ContainerEnvironmentScreen';
import ContainerMessageScreen from '../screens/ContainerMessageScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {headerTheme, headerText} from '../constants/LayoutStyles'

const Stack = createStackNavigator();

export default MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: headerTheme(),
                headerTitleStyle: headerText()
            }}>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                <Stack.Screen name="Settings" component={SettingsScreen} options={{headerTitle: 'Settings'}}/>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="News" component={NewsScreen} />
                <Stack.Screen name="Containers" component={ContainersScreen} />
                <Stack.Screen name="ContainerDisplay" component={ContainerDisplayScreen} options={{headerTitle: 'Container Display'}} />
                <Stack.Screen name="ContainerLocation" component={ContainerLocationScreen} options={{headerTitle: 'Container Location'}} />
                <Stack.Screen name="ContainerEnvironment" component={ContainerEnvironmentScreen} options={{headerTitle: 'Container Environment'}} />
                <Stack.Screen name="ContainerMessage" component={ContainerMessageScreen} options={{headerTitle: 'Container Message'}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};