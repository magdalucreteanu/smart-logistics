import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';
import { Button } from 'react-native-elements';

import { serverAddress } from '../constants/Server';

const ContainerDisplayScreen = ({ navigation }) => {

    this.measurements = [];

    loadMeasurements = async () => {
        try {
            let response = await fetch(serverAddress() + '/measurements');
            let json = await response.json();

            json.forEach(element => {
                this.measurements.push(element);
            });
        } catch (error) {
            Alert.alert('Error:', error.message);
        }
      }

    useEffect(() => {
        loadMeasurements();
    }, []);

    return (
        //Achtung: style verwendet defaultContainer
      <View style = {defaultContainer()}> 
          <Text style={{marginBottom: 10}}>Display Container Platzhalter:</Text>
          <Button title="Location" onPress={() => {navigation.navigate('ContainerLocation', { measurements: this.measurements })}}/>
          <Button title="Environment" onPress={() => {navigation.navigate('ContainerEnvironment', { measurements: this.measurements })}}/>
          <Button title="Message" onPress={() => {navigation.navigate('ContainerMessage')}}/>
      </View>
    );
};

export default ContainerDisplayScreen;