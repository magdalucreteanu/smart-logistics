import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Alert, FlatList, SafeAreaView, Text, View } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import { serverAddress } from '../constants/Server';

export default ContainersScreen = ({ navigation }) => {

    const [containers, setContainers] = useState([]);

    // Navigation Header bearbeiten
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTintColor: Colors.headerTextColor,
          headerTitle: 'Containers',
          headerRight: () => (
            <Button
              type= 'clear'
              icon={<Ionicons name = 'settings' size = {32} color = {Colors.headerIconColor} />}
              onPress={() => navigation.navigate('Settings')}
            />
          ),
        });
      }, [navigation]);

    // Die Liste mit Containers wird von Server geladen
    loadContainers = async () => {
        try {
            // User aus Storage lesen
            let username = await AsyncStorage.getItem('@username');
            // Daten aufrufen, Link ist z.B. /magda/containers
            let response = await fetch(serverAddress() + '/' + username + '/containers');
            // JSON von Response lesen
            let json = await response.json();
            // die Liste der Containers setzen
            setContainers(json);
        } catch (error) {
            Alert.alert('Error:', error.message);
        }
    }

    // wird aufgerufen wann auf ein Container Button geklickt wird
    const pressHandler = async (containerNumber) => {
        // die containerNumber in Storage speichern
        await AsyncStorage.setItem('@containerNumber', containerNumber)
        // zum ContainerDisplayScreen navigieren
        navigation.navigate('ContainerDisplay');
    }

    useEffect(() => {
        loadContainers();
    }, []);

    // Die Container Daten werden hier gerendert
    const renderItem = ({ item }) => (
        <View style={{ padding: 5, borderWidth: 1, 
                       borderTopLeftRadius: 20, borderTopRightRadius: 20,
                       borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
            <Text>Date: {item.startDate}</Text>
            <Button title={item.containerNumber} onPress={ () => pressHandler(item.containerNumber) }/>
            <Text>Type: {item.containerType}</Text>
            <Text>Start: {item.startLocation}</Text>
            <Text>End: {item.endLocation}</Text>
            <Text>Contents: {item.contents}</Text>
        </View>
    );
    
    return (
        //Achtung: style verwendet defaultContainer
        <View style = {defaultContainer()}>
            <SafeAreaView style = {defaultContainer()}>
                {containers.length===0 ?
                <Text>You have no containers.</Text>
                :
                <FlatList
                    data={containers}
                    renderItem={renderItem}
                    keyExtractor={item => item.containerNumber}
                    numColumns={1}
                />
                }
            </SafeAreaView>
        </View>
    );
};