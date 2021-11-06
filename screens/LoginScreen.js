import React from 'react';
import { Text, View, TextInput } from 'react-native';
import LayoutStyles from '../constants/LayoutStyles';

export default LoginScreen = () => {
    return (
      <View style = {LayoutStyles.loginContainer}>
          <Text>Login</Text>
          <TextInput style = {LayoutStyles.inputContainer} placeholder="USER"/>
          <TextInput style = {LayoutStyles.inputContainer} placeholder="PASSWORD"/>
      </View>
    );
};