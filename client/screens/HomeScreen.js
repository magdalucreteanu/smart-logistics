import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { Button } from "react-native-elements";
import {homeTileContainer, homeTileText} from '../constants/LayoutStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import Colors from '../constants/Colors';

export default HomeScreen = ({ navigation }) => {

    const [username, setUsername] = useState('');

    // Navigation Header bearbeiten
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTintColor: Colors.headerTextColor,
          headerTitle: 'Home',
          headerRight: () => (
            <Button
              type= 'clear'
              icon={<Ionicons name = 'settings' size = {32} color = {Colors.headerIconColor} />}
              onPress={() => navigation.navigate('Settings')}
            />
          ),
          headerLeft: () => (
            <Button
              type= 'clear'
              icon={<Ionicons name = 'log-out' size = {32} color = {Colors.headerIconColor} style={{ transform: [{scaleX: -1}] }} />}
              onPress={pressLogoutHandler}
            />
          ),
        });
      }, [navigation]);
      

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

    const pressLogoutHandler = () => {
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

    return (
        <View style = {{flex:1}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={homeTileText()}>Hello {username}</Text>
            </View>
            <TouchableOpacity
                onPress= {() => navigation.navigate('News')} 
                style = {homeTileContainer()}>
                <Text style={homeTileText()}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress= {() => navigation.navigate('Containers')} 
                style = {homeTileContainer()}>
                <Text style={homeTileText()}>Containers</Text>
            </TouchableOpacity>
        </View>
    );
};