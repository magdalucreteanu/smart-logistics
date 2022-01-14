import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { Button, Divider } from "react-native-elements";
import {homeTileContainer, titleText, tileText, containerRoundTopCorners} from '../constants/LayoutStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../components/authContext';
import { Ionicons, Feather } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import { useTheme } from '@react-navigation/native';

export default HomeScreen = ({ navigation }) => {

    const [username, setUsername] = useState('');

    const { signOut } = useContext(AuthContext);

    const { colors } = useTheme();

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
          <View style = {{flex:2, padding: 30, justifyContent: 'center'}}>
            <Text style={[titleText(), {color: colors.text}]}>Hello {username}.</Text>
            <Divider inset={true} insetType="right" color={colors.text} width={1} style={{marginVertical: 10}} />
            <Text style={[titleText(), {color: colors.text}]}>What do you want to do?</Text>
          </View>
          <View style = {[containerRoundTopCorners(), {flex:7, backgroundColor: colors.primary}]}>
            <TouchableOpacity 
              onPress= {() => navigation.navigate('News')} 
              style = {[homeTileContainer(), {backgroundColor: colors.container, marginTop: 50}]}
            >
              <Text style={[tileText(),{color: colors.text}]}>News</Text>
              <Ionicons name = 'newspaper' size = {100} color = {Colors.stylingColor04} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress= {() => navigation.navigate('Containers')} 
              style = {[homeTileContainer(), {backgroundColor: colors.container, marginBottom: 50}]}
            >
              <Text style={[tileText(), {color: colors.text}]}>Containers</Text>
              <Feather name = 'box' size = {100} color = {Colors.stylingColor04} />
            </TouchableOpacity>
          </View>
        </View>
    );
};