import React from 'react';
import { Text, View } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';

const ContainerLocationScreen = ({ navigation }) => {

    return (
        //Achtung: style verwendet defaultContainer
      <View style = {defaultContainer()}> 
          <Text>Container Location</Text>
      </View>
    );
};

export default ContainerLocationScreen;