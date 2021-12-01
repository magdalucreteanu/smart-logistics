import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import { titleText, tileText, baseText, homeTileContainer } from '../constants/LayoutStyles';
import { serverAddress } from '../constants/Server';

const ContainerDisplayScreen = ({ navigation }) => {

    const [containerNumber, setContainerNumber] = useState([]);
    const [measurements, setMeasurements] = useState([]);
    
    // Navigation Header bearbeiten
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTintColor: Colors.headerTextColor,
          headerTitle: 'Container Display',
          headerRight: () => (
            <View style={{flexDirection:'row'}}>
            <Button
              type= 'clear'
              icon={<Ionicons name = 'home' size = {32} color = {Colors.headerIconColor} />}
              onPress={() => navigation.navigate('Home')}
            />
            <Button
              type= 'clear'
              icon={<Ionicons name = 'settings' size = {32} color = {Colors.headerIconColor} />}
              onPress={() => navigation.navigate('Settings')}
            />
            </View>
          ),
        });
      }, [navigation]);

    // die Messungen für den ausgewählten Container werden geladen
    loadMeasurements = async () => {
        try {
            // lese die containerNumber aus dem Storage
            let value = await AsyncStorage.getItem('@containerNumber');
            setContainerNumber(value);
            // Server Request durchführen, z.B. /measurements/CNT100023
            let response = await fetch(serverAddress() + '/measurements/' + value);
            // Das JSON aus der Response lesen
            let json = await response.json();
            // JSON als Liste mit Measurements setzen
            setMeasurements(json);
        } catch (error) {
            Alert.alert('Error:', error.message);
        }
    }

    useEffect(() => {
        //init();
        loadMeasurements();
    }, []);

    return (
        //Achtung: style verwendet defaultContainer

       // die unteren onPress Funktionen geben dem nächsten Screen die
       // geladenen Measurements als Parameters
       <View style = {{flex:1}}> 
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[titleText(), {marginTop: 10}]}>Container {containerNumber}</Text>
            </View>
            {measurements.length===0 ?
                <View style={{flex: 7, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={baseText()}>This container does not have any measurements.</Text>
                </View>
                :
                <View style ={{flex:7}}>
                    <TouchableOpacity style={homeTileContainer()} onPress={() => {navigation.navigate('ContainerLocation', { measurements: measurements })}}>
                      <Text style={tileText()}>Location</Text>
                      <Ionicons name = 'location' size = {80} color = {Colors.stylingColor04} />
                    </TouchableOpacity>
                    <TouchableOpacity style={homeTileContainer()} onPress={() => {navigation.navigate('ContainerEnvironment', { measurements: measurements })}}>
                      <Text style={tileText()}>Environment</Text>
                      <Ionicons name = 'partly-sunny' size = {80} color = {Colors.stylingColor04} />
                    </TouchableOpacity>
                    <TouchableOpacity style={homeTileContainer()} onPress={() => {navigation.navigate('ContainerMessage')}}>
                      <Text style={tileText()}>Message</Text>
                      <Ionicons name = 'chatbox-ellipses' size = {80} color = {Colors.stylingColor04} />
                    </TouchableOpacity>
                </View>
            }
            </View>
          );
};

export default ContainerDisplayScreen;