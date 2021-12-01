import React, {useLayoutEffect, useState, useEffect} from 'react';
import { Text, View, Alert, Switch } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {defaultContainer} from '../constants/LayoutStyles';
import Colors from '../constants/Colors';

const SettingsScreen = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [switchValue, setSwitchValue] = useState(false);

    // Navigation Header bearbeiten
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTintColor: Colors.headerTextColor,
          headerTitle: 'Settings',
        });
      }, [navigation]);

    const toggleSwitch = () => {
        setSwitchValue(!switchValue)
    };


    return (
        //Achtung: style verwendet defaultContainer
      <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center',}}> 
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{marginEnd: 10}}>Dark Theme</Text>
            <Switch 
            onValueChange={toggleSwitch}
            value={switchValue}
            />
        </View>
      </View>
    );
};

export default SettingsScreen;