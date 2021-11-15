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
        <View style={{ padding: 1 }}>
            <Text>{item.startDate}</Text>
            <Button title={item.containerNumber} onPress={ () => pressHandler(item.containerNumber) }/>
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