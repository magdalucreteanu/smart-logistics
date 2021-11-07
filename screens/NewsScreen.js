import React from 'react';
import { Text, View } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';

export default NewsScreen = ({ navigation }) => {
    return (
        //Achtung: style verwendet defaultContainer
      <View style = {defaultContainer()}> 
          <Text>News</Text>
      </View>
    );
};