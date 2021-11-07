import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {homeTileContainer, homeTileText} from '../constants/LayoutStyles';

export default HomeScreen = ({ navigation }) => {
    return (
        <View style = {{flex:1}}>
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