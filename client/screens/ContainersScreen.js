import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Alert, FlatList, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import { serverAddress } from '../constants/Server';
import {containersTileContainer, baseText, tileText} from '../constants/LayoutStyles';
import { useTheme } from '@react-navigation/native';

export default ContainersScreen = ({ navigation }) => {

    const [containers, setContainers] = useState([]);

    const { colors } = useTheme();

    // Navigation Header bearbeiten
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: 'Containers',
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
            Alert.alert('Error', error.message);
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
        <TouchableOpacity onPress={ () => pressHandler(item.containerNumber) } style={[containersTileContainer(), {backgroundColor: colors.container}]}>
            <Text style={[tileText(),  {color: colors.text}]}>{item.containerNumber}</Text>
            <Divider inset={true} insetType="right" color={colors.text} width={1} style={{marginVertical: 10}} />
            <Text style={[baseText(), {color: colors.text}]}>Date:             {item.startDate}</Text>
            <Text style={[baseText(), {color: colors.text}]}>Type:             {item.containerType}</Text>
            <Text style={[baseText(), {color: colors.text}]}>Start:             {item.startLocation}</Text>
            <Text style={[baseText(), {color: colors.text}]}>End:               {item.endLocation}</Text>
            <Text style={[baseText(), {color: colors.text}]}>Contents:      {item.contents}</Text>
        </TouchableOpacity>
    );
    
    return (
        //Achtung: style verwendet defaultContainer
        <View style = {{flex:1, backgroundColor: colors.primary}}>
            <SafeAreaView style = {{flex:1}}>
                {containers.length===0 ?
                <View style={[containersTileContainer(),{flex: 1, maxHeight:100, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.container }]}>
                    <Text style={[baseText(), {color: colors.text}]}>You have no containers.</Text>
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