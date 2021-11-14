import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
import { errorText, loginContainer, loginInputContainer } from '../constants/LayoutStyles';
import { serverAddress } from '../constants/Server';

export default LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const usernameInputHandler = enteredText => {
        setUsername(enteredText);
    };

    const passwordInputHandler = enteredText => {
        setPassword(enteredText);
    };

    const login = async () => {
        try {
            // Fehlermeldung entfernen
            setErrorMessage('');
            // Login API aufrufen
            let body = JSON.stringify({
                username: username,
                password: password
            });
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body
            };
            let response = await fetch(serverAddress() + '/login', requestOptions);
            if (response.status == 200) {                
                // Login ist erfolgreich
                // User in Storage speichern
                await AsyncStorage.setItem('@username', username)
                // zu Home navigieren
                navigation.navigate('Home');
            } else {
                // Login nicht erfolgreich - Fehlermeldung
                setErrorMessage('Could not login: invalid user name or password.');
            }
        } catch (error) {
            // Login nicht erfolgreich - Fehlermeldung
            setErrorMessage('Could not login: invalid user name or password.');
        }
    };

    const pressHandler = () => {
        login();
    }

    return (
        <View style = {loginContainer()}>
            <Text>Login</Text>
            <TextInput 
                style = {loginInputContainer()}
                placeholder = "USER"
                value = {username}
                onChangeText = {usernameInputHandler}
            clearTextOnFocus = {true}
        />
        <TextInput
            style = {loginInputContainer()} 
            placeholder = "PASSWORD" 
            secureTextEntry = {true} 
            value = {password}
            onChangeText = {passwordInputHandler}
            clearTextOnFocus = {true}
            keyboardType = 'visible-password'
        />
        <Button title="Login" onPress={pressHandler}/>
        <Text style = {errorText()}>{errorMessage}</Text>
    </View>
  );
};