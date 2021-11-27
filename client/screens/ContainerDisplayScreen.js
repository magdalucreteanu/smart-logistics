import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { defaultContainer } from '../constants/LayoutStyles';
import { serverAddress } from '../constants/Server';

const ContainerDisplayScreen = ({ navigation }) => {

    const [containerNumber, setContainerNumber] = useState([]);
    const [measurements, setMeasurements] = useState([]);
    
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
        init();
        loadMeasurements();
    }, []);

    return (
        //Achtung: style verwendet defaultContainer

       // die unteren onPress Funktionen geben dem nächsten Screen die
       // geladenen Measurements als Parameters
       <View style = {defaultContainer()}> 
            <Text style={{marginBottom: 10}}>Container {containerNumber}</Text>
            {measurements.length===0 ?
                <Text>This container does not have any measurements.</Text>
                :
                <View>
                    <Button title="Location" onPress={() => {navigation.navigate('ContainerLocation', { measurements: measurements })}}/>
                    <Button title="Environment" onPress={() => {navigation.navigate('ContainerEnvironment', { measurements: measurements })}}/>
                    <Button title="Message" onPress={() => {navigation.navigate('ContainerMessage')}}/>
                </View>
            }
            </View>
          );
};

export default ContainerDisplayScreen;