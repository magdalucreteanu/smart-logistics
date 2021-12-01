import React, {useState, useEffect} from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import ContainersScreen from '../screens/ContainersScreen';
import ContainerDisplayScreen from '../screens/ContainerDisplayScreen';
import ContainerLocationScreen from '../screens/ContainerLocationScreen';
import ContainerEnvironmentScreen from '../screens/ContainerEnvironmentScreen';
import ContainerMessageScreen from '../screens/ContainerMessageScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {headerTheme, headerText} from '../constants/LayoutStyles';
import { AuthContext } from '../components/authContext';

const Stack = createStackNavigator();

export default MainNavigator = () => {

    // useReducer benutzen: eine Alternative zu useState
    const initialLoginState = {
        isLoading: true,
        userToken: null,
    };

    const loginReducer = (prevState, action) => {
        switch( action.type){
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
    
    // useMemo benutzen: "Returns a memoized value"
    const authContext = React.useMemo(() => ({
        signIn: async(userName) => {
            try {
                await AsyncStorage.setItem('@username', userName);
            } catch (error) {
                Alert.alert('Error: ', error.message);
            }
            dispatch({ type: 'LOGIN', token: userName});
        },
        signOut: async() => {
            try {
                await AsyncStorage.removeItem('@username');
            } catch (error) {
                Alert.alert('Error: ', error.message);
            }
            dispatch({ type: 'LOGOUT'});
        },
    }), []);

    useEffect(() => {
        setTimeout(async()=> {
            let userToken;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('@username');
            } catch (error) {
                Alert.alert('Error: ', error.message);
            }
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
        }, 1000)
    }, []);

    if (loginState.isLoading) {
        return <AppLoading />
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerStyle: headerTheme(),
                    headerTitleStyle: headerText()
                }}>
                    { loginState.userToken == null ? (
                        <>
                        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                        </>
                    ) : (
                        <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Settings" component={SettingsScreen} options={{headerTitle: 'Settings'}}/>
                        <Stack.Screen name="News" component={NewsScreen} />
                        <Stack.Screen name="Containers" component={ContainersScreen} />
                        <Stack.Screen name="ContainerDisplay" component={ContainerDisplayScreen} options={{headerTitle: 'Container Display'}} />
                        <Stack.Screen name="ContainerLocation" component={ContainerLocationScreen} options={{headerTitle: 'Container Location'}} />
                        <Stack.Screen name="ContainerEnvironment" component={ContainerEnvironmentScreen} options={{headerTitle: 'Container Environment'}} />
                        <Stack.Screen name="ContainerMessage" component={ContainerMessageScreen} options={{headerTitle: 'Container Message'}} />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};