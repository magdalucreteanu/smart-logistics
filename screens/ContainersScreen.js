import React from 'react';
import { Text, View } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';

export default ContainersScreen = ({ navigation }) => {
    return (
        //Achtung: style verwendet defaultContainer
      <View style = {defaultContainer()}> 
          <Text>Containers</Text>
      </View>
    );
};