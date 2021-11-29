import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Alert, FlatList, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import { serverAddress } from '../constants/Server';
import {containersTileContainer, baseText, tileText} from '../constants/LayoutStyles';

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
        <TouchableOpacity onPress={ () => pressHandler(item.containerNumber) } style={containersTileContainer()}>
            <Text style={tileText()}>{item.containerNumber}</Text>
            <Text style={baseText()}>Date: {item.startDate}</Text>
            <Text style={baseText()}>Type: {item.containerType}</Text>
            <Text style={baseText()}>Start: {item.startLocation}</Text>
            <Text style={baseText()}>End: {item.endLocation}</Text>
            <Text style={baseText()}>Contents: {item.contents}</Text>
        </TouchableOpacity>
    );
    
    return (
        //Achtung: style verwendet defaultContainer
        <View style = {{flex:1}}>
            <SafeAreaView style = {{flex:1}}>
                {containers.length===0 ?
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={baseText()}>You have no containers.</Text>
                </View>
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