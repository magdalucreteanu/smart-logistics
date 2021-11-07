import React from 'react';
import { Text, View } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';

const ContainerMessageScreen = ({ navigation }) => {

    return (
        //Achtung: style verwendet defaultContainer
      <View style = {defaultContainer()}> 
          <Text>Container Message</Text>
      </View>
    );
};

export default ContainerMessageScreen;