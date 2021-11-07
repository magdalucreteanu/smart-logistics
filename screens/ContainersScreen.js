import React from 'react';
import { Text, View } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';
import { Button } from 'react-native-elements';

export default ContainersScreen = ({ navigation }) => {

    const pressHandler = () => {
        navigation.navigate('ContainerDisplay');
      }

    return (
        //Achtung: style verwendet defaultContainer
      <View style = {defaultContainer()}> 
          <Text style={{marginBottom: 10}}>Platzhalter Container:</Text>
          <Button title="Container 1" onPress={pressHandler}/>
      </View>
    );
};