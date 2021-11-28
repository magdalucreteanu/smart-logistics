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

    const pressHandler = () => {
        // Benutzer fragen, ob Logout wirklich stattfinden soll
        Alert.alert(
            "Logout", 
            `You are currently logged in as ${username}. Do you really want to log out?`,
            [
                // Canceln wenn es nicht stattfinden soll
                {
                    text: "Cancel",
                    style: "cancel"
                },
                // Wenn stattfinden soll, dann Navigation zum Login Screen
                {
                    text: "Log out",
                    onPress: () =>  navigation.navigate('Login')
                }
            ]
            )
    }

    init = async () => {
        try {
            // Username aus Storage lesen
            // Der Name wird in diesem Screen angezeigt
            let value = await AsyncStorage.getItem('@username');
            setUsername(value);
        } catch (error) {
            Alert.alert('Error:', error.message);
        }
    }
    
    useEffect(() => {
        init();
    }, []);    

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
        <View style ={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{marginBottom: 10}}>You are logged in as {username}</Text>
          <Button title="Logout" onPress={pressHandler}/>
        </View>
      </View>
    );
};

export default SettingsScreen;