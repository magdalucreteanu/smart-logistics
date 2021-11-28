import React, {useLayoutEffect} from 'react';
import { Text, View } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';
import Colors from '../constants/Colors';

const SettingsScreen = ({ navigation }) => {

    // Navigation Header bearbeiten
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTintColor: Colors.headerTextColor,
          headerTitle: 'Settings',
        });
      }, [navigation]);

    return (
        //Achtung: style verwendet defaultContainer
      <View style = {defaultContainer()}> 
          <Text>Settings</Text>
      </View>
    );
};

export default SettingsScreen;