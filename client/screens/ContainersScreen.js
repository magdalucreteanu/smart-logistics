import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, Text, View } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { serverAddress } from '../constants/Server';

export default ContainersScreen = ({ navigation }) => {

    const [containers, setContainers] = useState([]);

    loadContainers = async () => {
        try {
            let username = await AsyncStorage.getItem('@username');

            let response = await fetch(serverAddress() + '/' + username + '/containers');
            let json = await response.json();
            setContainers(json);
        } catch (error) {
            Alert.alert('Error:', error.message);
        }
    }


    const pressHandler = async (containerNumber) => {
        await AsyncStorage.setItem('@containerNumber', containerNumber)
        navigation.navigate('ContainerDisplay');
    }

    useEffect(() => {
        loadContainers();
    }, []);

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