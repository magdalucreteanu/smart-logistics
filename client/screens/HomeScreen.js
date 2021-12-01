import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { Alert, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import { Button } from "react-native-elements";
import {homeTileContainer, baseText, titleText, tileText} from '../constants/LayoutStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../components/authContext';
import { Ionicons, Feather } from "@expo/vector-icons";
import Colors from '../constants/Colors';

export default HomeScreen = ({ navigation }) => {

    const [username, setUsername] = useState('');

    const { signOut } = useContext(AuthContext);

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

    const pressHandler = () => {
      // Benutzer fragen, ob Logout wirklich stattfinden soll
      Alert.alert(
          "Logout", 
          `Do you really want to log out?`,
          [
              // Canceln wenn es nicht stattfinden soll
              {
                  text: "Cancel",
                  style: "cancel"
              },
              // Wenn stattfinden soll, dann Navigation zum Login Screen
              {
                  text: "Log out",
                  onPress: () =>  {signOut()}
              }
          ]
          )
    }

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
              onPress={pressHandler}
            />
          ),
        });
      }, [navigation]);

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