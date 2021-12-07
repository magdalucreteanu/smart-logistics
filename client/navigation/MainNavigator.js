import React, {useState, useEffect} from 'react';
import { Alert } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
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
import Colors from '../constants/Colors';
import { color } from 'react-native-reanimated';

const Stack = createStackNavigator();

export default MainNavigator = () => {

    // Zum Ausprobieren
    /* clearAsyncStorage = async() => {
        AsyncStorage.clear();
    }

    useEffect(() => {
        clearAsyncStorage();
    }, []); */

    const [isDarkTheme, setIsDarkTheme] = useState(false);

    // useReducer benutzen: eine Alternative zu useState
    const initialLoginState = {
        isLoading: true,
        userToken: null,
    };

    const CustomDefaultTheme = {
        ...DefaultTheme,
        colors: {
            primary: DefaultTheme.colors.primary,
            background: DefaultTheme.colors.background,
            card: '#ffffff',
            text: '#000000',
            border: DefaultTheme.colors.border,
            notification: DefaultTheme.colors.notification,
        }
    }

    const CustomDarkTheme = {
        ...DarkTheme,
        colors: {
            primary: DarkTheme.colors.primary,
            background: DarkTheme.colors.background,
            card: '#000000',
            text: '#ffffff',
            border: DarkTheme.colors.border,
            notification: DarkTheme.colors.notification,
        }
    }

    const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

    const loginReducer = (prevState, action) => {
        switch( action.type){
            // Wiederherstellen Login-Daten, falls vorhanden
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            // Login
            case 'LOGIN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            // Logout
            case 'LOGOUT':
                return {
                    ...prevState,
                    userToken: null,
                    isLoading: false,
                };
            // Für den Fall, dass wir noch eine "Konto erstellen" Option erstellen wollen
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
                // Versuche User in den Speicher zu schreiben
                await AsyncStorage.setItem('@username', userName);
            } catch (error) {
                Alert.alert('Error: ', error.message);
            }
            // Wenn erfolgreich führe Login durch, userToken dann nicht mehr null
            // Dann wird der HomeScreen geladen
            dispatch({ type: 'LOGIN', token: userName});
        },
        signOut: async() => {
            try {
                // Versuche User aus dem Speicher zu entfernen
                await AsyncStorage.removeItem('@username');
            } catch (error) {
                Alert.alert('Error: ', error.message);
            }
            // Wenn  erfolgreich, logge den User aus, userToken auf null
            // Dann wird der LoginScreen geladen
            dispatch({ type: 'LOGOUT'});
        },
        toggleTheme: () => {
            setIsDarkTheme( isDarkTheme => !isDarkTheme );
        }
    }), []);

    useEffect(() => {
        setTimeout(async()=> {
            // userToken null
            let userToken;
            userToken = null;
            let darkTheme;
            try {
                // Versuche userToken aus Speicher zu lesen
                userToken = await AsyncStorage.getItem('@username');
                let darkThemeValue = await AsyncStorage.getItem('@darkTheme');
                darkTheme = JSON.parse(darkThemeValue);
            } catch (error) {
                Alert.alert('Error: ', error.message);
            }
            // Falls kein Theme gespeichert, soll es das Default Theme sein
            // Deswegen darkTheme bei null auf false
            if (darkTheme == null) {
                darkTheme = false; 
            }

            // Dark Theme setzen
            setIsDarkTheme(darkTheme);

            // Wenn vorhanden, userToken nicht mehr null, HomeScreen wird geladen
            // Wenn nicht vorhanden, userToken null, LoginScreen wird geladen
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
        }, 1000)
    }, []);

    // Solange Daten laden, zeige den Splash Screen an
    if (loginState.isLoading) {
        return <AppLoading />
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer theme={theme}>
                <Stack.Navigator screenOptions={{
                    headerTitleStyle: {color: isDarkTheme ? Colors.stylingColor05 : Colors.stylingColor01, fontSize: 25},
                    headerTintColor: isDarkTheme ? Colors.stylingColor05 : Colors.stylingColor01
                }}>
                    { // Je nachdem ob ein User eingeloggt ist oder nicht, zeige den jeweiligen Screen an
                    loginState.userToken == null ? (
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