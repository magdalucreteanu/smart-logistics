import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import {loginContainer, loginInputContainer} from '../constants/LayoutStyles';

export default LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameInputHandler = enteredText => {
    setUsername(enteredText);
  };

  const passwordInputHandler = enteredText => {
    setPassword(enteredText);
  };

  const pressHandler = () => {
    navigation.navigate('Home');
  }

  return (
    <View style = {loginContainer()}>
        <Text>Login</Text>
        <TextInput 
          style = {loginInputContainer()}
          placeholder = "USER"
          onChangeText = {usernameInputHandler}
        />
        <TextInput 
          style = {loginInputContainer()} 
          placeholder = "PASSWORD" 
          secureTextEntry = {true} 
          onChangeText = {passwordInputHandler}
        />
        <Button title="Login" onPress={pressHandler}/>
    </View>
  );
};