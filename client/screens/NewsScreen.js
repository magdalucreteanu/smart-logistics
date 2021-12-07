import React, {useLayoutEffect} from 'react';
import { Text, View } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import {titleText, baseText} from '../constants/LayoutStyles';
import { useTheme } from '@react-navigation/native';

export default NewsScreen = ({ navigation }) => {

  const { colors } = useTheme();

    // Navigation Header bearbeiten
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: 'News',
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
          <Text style={[baseText(), {color: colors.text}]}>News</Text>
      </View>
    );
};