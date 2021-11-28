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