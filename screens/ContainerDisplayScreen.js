import React from 'react';
import { Text, View } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';
import { Button } from 'react-native-elements';

const ContainerDisplayScreen = ({ navigation }) => {
    return (
        //Achtung: style verwendet defaultContainer
      <View style = {defaultContainer()}> 
          <Text style={{marginBottom: 10}}>Display Container Platzhalter:</Text>
          <Button title="Location" onPress={() => {navigation.navigate('ContainerLocation')}}/>
          <Button title="Environment" onPress={() => {navigation.navigate('ContainerEnvironment')}}/>
          <Button title="Message" onPress={() => {navigation.navigate('ContainerMessage')}}/>
      </View>
    );
};

export default ContainerDisplayScreen;