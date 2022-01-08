import React, {useEffect, useState, useLayoutEffect} from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import {titleText, baseText} from '../constants/LayoutStyles';
import { useTheme } from '@react-navigation/native';
import AutoScroll from '@homielab/react-native-auto-scroll';
import { serverAddress } from '../constants/Server';

export default NewsScreen = ({ navigation }) => {

  const { colors } = useTheme();

  const [breaking, setBreaking] = useState([]);

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

    // die Breaking News werden geladen
    loadBreakingNews = async () => {
      try {
          // Server Request durchführen
          let response = await fetch(serverAddress() + '/breaking');
          // Text aus der Response lesen
          let message = await response.text();
          // Text als Breaking News setzen
          setBreaking(message);
      } catch (error) {
          Alert.alert('Error:', error.message);
      }
  }

  useEffect(() => {
      loadBreakingNews();
  }, []);

    return (
        //Achtung: style verwendet defaultContainer
      <View style = {defaultContainer()}> 
          <Text style={[baseText(), {color: colors.text}]}>News</Text>
          <AutoScroll style={styles.scrolling}>
            <Text style={styles.welcome}>--- Breaking: {breaking} ---</Text>
          </AutoScroll>
      </View>
    );
};

const styles = StyleSheet.create({
  scrolling: {
    backgroundColor: "red",
    width: 400,
    padding: 10,
    marginBottom: 10,
  },
  welcome: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
});