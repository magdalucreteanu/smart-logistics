import React, { useState, useEffect } from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import {homeTileContainer, homeTileText} from '../constants/LayoutStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default HomeScreen = ({ navigation }) => {

    const [username, setUsername] = useState('');

    init = async () => {
        try {
            let value = await AsyncStorage.getItem('@username');
            setUsername(value);
        } catch (error) {
            Alert.alert('Error:', error.message);
        }
    }
    
    useEffect(() => {
        init();
    }, []);

    return (
        <View style = {{flex:1}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={homeTileText()}>Hello {username}</Text>
            </View>
            <TouchableOpacity
                onPress= {() => navigation.navigate('News')} 
                style = {homeTileContainer()}>
                <Text style={homeTileText()}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress= {() => navigation.navigate('Containers')} 
                style = {homeTileContainer()}>
                <Text style={homeTileText()}>Containers</Text>
            </TouchableOpacity>
        </View>
    );
};