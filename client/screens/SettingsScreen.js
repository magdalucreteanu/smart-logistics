import React, {useLayoutEffect, useState, useEffect, useContext} from 'react';
import { Text, View, Alert, Switch, Image} from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../components/authContext';
import Colors from '../constants/Colors';
import { Ionicons } from "@expo/vector-icons";
import {baseText, tileText, titleText} from '../constants/LayoutStyles';
import { useTheme } from '@react-navigation/native';

const SettingsScreen = ({ navigation }) => {

    const { colors, dark } = useTheme();

    const [username, setUsername] = useState('');
    const [isDarkTheme, setIsDarkTheme] = useState(dark);

    const { signOut, toggleTheme } = useContext(AuthContext);


    // Navigation Header bearbeiten
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: 'Settings',
        });
      }, [navigation]);

    const toggleSwitchHandler = () => {
        setIsDarkTheme(!isDarkTheme);
        toggleTheme();
    };

    init = async () => {
        try {
            // Username aus Storage lesen
            // Der Name wird in diesem Screen angezeigt
            let value = await AsyncStorage.getItem('@username');
            setUsername(value);
        } catch (error) {
            Alert.alert('Error: ', error.message);
        }
    };

    const _storeTheme = async () => {
        try {
        // Dark Theme an/aus speichern
          await AsyncStorage.setItem('@darkTheme', JSON.stringify(isDarkTheme));
        } catch (error) {
            Alert.alert('Error: ', error.message);
        }
    };
    
    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        _storeTheme();
    }, [isDarkTheme]);

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

    return (
      <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20}}> 
        <Image style={{width:300, height:300}} resizeMode='contain' source={require('../assets/LogoWithText.png')} />
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[titleText(), {color: colors.text}]}>Theme</Text>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[baseText(),{marginEnd: 10, color: colors.text}]}>Dark Theme</Text>
                <Switch 
                    trackColor={{ false: 'darkgray', true: Colors.stylingColor05 }}
                    thumbColor={'white'}
                    onValueChange={toggleSwitchHandler}
                    value={isDarkTheme}
                />
            </View>
        </View>
        <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={titleText()}>Logout</Text>
            <Text style={[baseText(), {color: colors.text}]}>You are currently logged in as {username}.</Text>
            <Text style={[baseText(),{marginBottom: 20, color: colors.text}]}>Do you want to log out?</Text>
            <Button 
                title="Logout" 
                titleStyle={[baseText(), {color: 'white'}]}
                buttonStyle={{backgroundColor: Colors.stylingColor03}}
                onPress={pressHandler}
                icon= {<Ionicons name = 'log-out' size = {32} color = {'white'} />}
            />
        </View>
        <View style={{flex:0.5}}></View>
      </View>
    );
};

export default SettingsScreen;