import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

// Constants
import {loginContainer, loginInputContainer} from '../constants/LayoutStyles';

// Database
// Beispiel User einfügen: 
// const [users, setUsers] = useState();
// database.insertUser(username, password, refreshUsers);
// const refreshUsers = () =>  {return database.getUsers(setUsers)}
import {database} from '../components/database';

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
    // TODO: Username und Passwort vergleichen für ein Login
    // database.getPasswordByUserName("John"); 
    // database.getPasswordByUserName ist noch NICHT fertig
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
    </View>
  );
};