import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import { titleText, tileText, baseText, containersDisplayContainer, containerRoundTopCorners } from '../constants/LayoutStyles';
import { serverAddress } from '../constants/Server';
import { useTheme } from '@react-navigation/native';

const ContainerDisplayScreen = ({ navigation }) => {

    const [containerNumber, setContainerNumber] = useState([]);
    const [measurements, setMeasurements] = useState([]);

    const { colors } = useTheme();
    
    // Navigation Header bearbeiten
    useLayoutEffect(() => {
        navigation.setOptions({
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
            Alert.alert('Error', error.message);
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
          <View style={{flex: 1, padding: 30, justifyContent: 'center'}}>
            <Text style={[titleText(), {color: colors.text}]}>Container {containerNumber}</Text>
          </View>
            {measurements.length===0 ?
                <View style={[containerRoundTopCorners(),{flex: 10, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: colors.primary}]}>
                  <View style={[containersDisplayContainer(),{maxHeight: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.container}]}>
                    <Text style={[baseText(), {color: colors.text}]}>This container does not have any measurements.</Text>
                  </View>
                </View>
                :
                <View style={[containerRoundTopCorners(),{flex: 10, backgroundColor: colors.primary}]}>
                    <TouchableOpacity style={[containersDisplayContainer(), {backgroundColor: colors.container, marginTop: 50}]} onPress={() => {navigation.navigate('ContainerLocation', { measurements: measurements })}}>
                      <Text style={[tileText(), {color: colors.text}]}>Location</Text>
                      <Ionicons name = 'location' size = {80} color = {Colors.stylingColor04} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[containersDisplayContainer(), {backgroundColor: colors.container}]} onPress={() => {navigation.navigate('ContainerEnvironment', { measurements: measurements })}}>
                      <Text style={[tileText(), {color: colors.text}]}>Environment</Text>
                      <Ionicons name = 'partly-sunny' size = {80} color = {Colors.stylingColor04} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[containersDisplayContainer(), {backgroundColor: colors.container, marginBottom: 50}]} onPress={() => {navigation.navigate('ContainerMessage')}}>
                      <Text style={[tileText(), {color: colors.text}]}>Message</Text>
                      <Ionicons name = 'chatbox-ellipses' size = {80} color = {Colors.stylingColor04} />
                    </TouchableOpacity>
                </View>
            }
            </View>
          );
};

export default ContainerDisplayScreen;