import React from 'react';
import { Text, View } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';
import { Button } from 'react-native-elements';

const DisplayContainerScreen = ({ navigation }) => {

    const pressHandler = () => {
        navigation.navigate('Home');
    }
    
    return (
        //Achtung: style verwendet defaultContainer
      <View style = {defaultContainer()}> 
          <Text style={{marginBottom: 10}}>Display Container Platzhalter:</Text>
          <Button title="Location" onPress={pressHandler}/>
          <Button title="Environment" onPress={pressHandler}/>
          <Button title="Message" onPress={pressHandler}/>
      </View>
    );
};

export default DisplayContainerScreen;