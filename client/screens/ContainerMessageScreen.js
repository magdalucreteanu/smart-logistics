import React, {useLayoutEffect} from 'react';
import { Text, View } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import {baseText, titleText} from '../constants/LayoutStyles';

const ContainerMessageScreen = ({ navigation }) => {

    // Navigation Header bearbeiten
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTintColor: Colors.headerTextColor,
          headerTitle: 'Message',
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

    return (
        //Achtung: style verwendet defaultContainer
      <View style = {defaultContainer()}> 
          <Text style={baseText()}>Container Message</Text>
      </View>
    );
};

export default ContainerMessageScreen;