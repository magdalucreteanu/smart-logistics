import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements'
import {loginContainer, loginInputContainer} from '../constants/LayoutStyles';

export default LoginScreen = ({ navigation }) => {

  const pressHandler = () => {
    navigation.navigate('Home');
  }

  return (
    <View style = {loginContainer()}>
        <Text>Login</Text>
        <TextInput style = {loginInputContainer()} placeholder="USER"/>
        <TextInput style = {loginInputContainer()} placeholder="PASSWORD"/>
        <Button title="Login" onPress={pressHandler}/>
    </View>
  );
};