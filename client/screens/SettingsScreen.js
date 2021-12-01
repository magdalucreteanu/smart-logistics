import React, {useLayoutEffect, useState, useEffect, useContext} from 'react';
import { Text, View, Alert, Switch, Image} from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../components/authContext';
import {defaultContainer} from '../constants/LayoutStyles';
import Colors from '../constants/Colors';
import { Ionicons } from "@expo/vector-icons";
import {baseText, tileText, titleText} from '../constants/LayoutStyles'

const SettingsScreen = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [switchValue, setSwitchValue] = useState(false);

    const { signOut } = useContext(AuthContext);

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

    return (
      <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20}}> 
        <Image style={{width:300, height:300}} resizeMode='contain' source={require('../assets/LogoWithText.png')} />
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={titleText()}>Theme</Text>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[baseText(),{marginEnd: 10}]}>Dark Theme</Text>
                <Switch 
                    trackColor={{ false: 'darkgray', true: Colors.stylingColor05 }}
                    thumbColor={'white'}
                    onValueChange={toggleSwitch}
                    value={switchValue}
                />
            </View>
        </View>
        <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={titleText()}>Logout</Text>
            <Text style={baseText()}>You are currently logged in as {username}.</Text>
            <Text style={[baseText(),{marginBottom: 20}]}>Do you want to log out?</Text>
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