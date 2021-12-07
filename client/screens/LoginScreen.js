import React, { useState, useLayoutEffect, useContext } from 'react';
import { Text, View, Image } from 'react-native';
import { Button, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import { Ionicons } from "@expo/vector-icons";
import { errorText, loginContainer, titleText, baseText } from '../constants/LayoutStyles';
import { serverAddress } from '../constants/Server';
import { AuthContext } from '../components/authContext';
import { useTheme } from '@react-navigation/native';

export default LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // useContext verwenden, um auf signIn zugreifen zu können
    const { signIn } = useContext(AuthContext);

    const { colors } = useTheme();

    const usernameInputHandler = enteredText => {
        setUsername(enteredText);
    };

    const passwordInputHandler = enteredText => {
        setPassword(enteredText);
    };

    // die login Funktion ruft die Server API auf
    // und meldet den User an
    const login = async () => {
        try {
            // Fehlermeldung entfernen
            setErrorMessage('');
            // Login API aufrufen
            // username und password werden in einem JSON Obket umgewandelt
            let body = JSON.stringify({
                username: username,
                password: password
            });
            // wir konfigurieren den POST Request
            // damit weiß der Server dass ein JSON String
            // im Body des Requests gesendet wird
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body
            };
            let response = await fetch(serverAddress() + '/login', requestOptions);
            if (response.status == 200) {                
                // Login ist erfolgreich
                signIn(username);
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
        // der View mit User/Password Felder wird gerendert
        <View style = {loginContainer()}>
            <Image style={{width:300, height:300}} resizeMode='contain' source={require('../assets/LogoWithText.png')} />
            <Text style={[titleText(), {marginBottom:10, color: colors.text}]}>Login</Text>
            <Input 
                style = {[baseText(),{color: colors.text}]}
                leftIcon= {<Ionicons name = 'person-outline' size = {32} color = {Colors.headerIconColor} />}
                placeholder = "USER"
                value = {username}
                onChangeText = {usernameInputHandler}
                clearTextOnFocus = {true}
                autoCapitalize = 'none'
            />
            <Input
                style = {[baseText(),{color: colors.text}]}
                leftIcon= {<Ionicons name = 'lock-closed-outline' size = {32} color = {Colors.headerIconColor} />}
                placeholder = "PASSWORD" 
                secureTextEntry = {true} 
                value = {password}
                onChangeText = {passwordInputHandler}
                clearTextOnFocus = {true}
                autoCapitalize = 'none'
            />
            <Button 
                title="Login" 
                titleStyle={[baseText(), {color: 'white'}]}
                buttonStyle={{backgroundColor: Colors.stylingColor03}}
                onPress={pressHandler}
                icon= {<Ionicons name = 'log-in' size = {32} color = {'white'} />}
            />
            <Text style = {errorText()}>{errorMessage}</Text>
        </View>
  );
};