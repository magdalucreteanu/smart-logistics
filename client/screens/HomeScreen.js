import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Alert, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import { Button } from "react-native-elements";
import {homeTileContainer, baseText, titleText, tileText} from '../constants/LayoutStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Feather } from "@expo/vector-icons";
import Colors from '../constants/Colors';

export default HomeScreen = ({ navigation }) => {

    const [username, setUsername] = useState('');

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
              onPress={() => navigation.goBack()}
            />
          ),
        });
      }, [navigation]);


    // Verhindert, dass der User sich durch das Klicken auf den "Zurück"-Button versehentlich ausloggen kann
    React.useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
    
            // Prevent default behavior of leaving the screen
            e.preventDefault();
    
            // Prompt the user before leaving the screen
            Alert.alert(
              'Logout?',
              'Do you really want to log out?',
              [
                { text: "Cancel", style: 'cancel', onPress: () => {} },
                {
                  text: 'Log out',
                  style: 'default',
                  // If the user confirmed, then we dispatch the action we blocked earlier
                  // This will continue the action that had triggered the removal of the screen
                  onPress: () => navigation.dispatch(e.data.action),
                },
              ]
            );
          }),
        [navigation]
      );

    return (
        <View style = {{flex:1}}>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[titleText(), {marginTop: 20}]}>Hello {username}.</Text>
                <Text style={titleText()}>What do you want to do?</Text>
            </View>
            <TouchableOpacity onPress= {() => navigation.navigate('News')} style = {[homeTileContainer(), {flex:3}]}>
              <Text style={tileText()}>News</Text>
              <Ionicons name = 'newspaper' size = {100} color = {Colors.stylingColor04} />
            </TouchableOpacity>
            <TouchableOpacity onPress= {() => navigation.navigate('Containers')} style = {[homeTileContainer(), {flex:3}]}>
              <Text style={tileText()}>Containers</Text>
              <Feather name = 'box' size = {100} color = {Colors.stylingColor04} />
            </TouchableOpacity>
            <View style={{flex:1}}></View>
        </View>
    );
};