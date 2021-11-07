import React from 'react';
import { Text, View } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';

const ContainerEnvironmentScreen = ({ navigation }) => {

    return (
        //Achtung: style verwendet defaultContainer
      <View style = {defaultContainer()}> 
          <Text>Container Environment</Text>
      </View>
    );
};

export default ContainerEnvironmentScreen;