import React, {useEffect, useState, useLayoutEffect} from 'react';
import { Alert, Text, View, StyleSheet, SafeAreaView, FlatList, Image } from 'react-native';
import { useWindowDimensions } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import {titleText, baseText} from '../constants/LayoutStyles';
import { useTheme } from '@react-navigation/native';
import AutoScroll from '@homielab/react-native-auto-scroll';
import { serverAddress } from '../constants/Server';
import * as rssParser from 'react-native-rss-parser';
import Hyperlink from 'react-native-hyperlink';
import RenderHtml from 'react-native-render-html';

export default NewsScreen = ({ navigation }) => {

  const { colors } = useTheme();

  const { width } = useWindowDimensions();

  const [breaking, setBreaking] = useState([]);
  const [feeds, setFeeds] = useState([]);

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

  // RSS Feed wird geladen
  loadRSSFeed = async () => {
    try {
      // Server Request durchführen
      let response = await fetch('https://logisticsviewpoints.com/feed/');
      // Text aus der Response lesen
      let responseData = await response.text();
      let rss = await rssParser.parse(responseData);
      // wir brauchen nur die neuesten 3 Nachrichten
      setFeeds(rss.items.slice(0, 3));
    } catch (error) {
      Alert.alert('Error:', error.message);
    }
  }
  
  useEffect(() => {
    loadBreakingNews();
    loadRSSFeed();
  }, []);

  return (
    //Achtung: style verwendet defaultContainer
    <View style = {defaultContainer()}> 
        <AutoScroll style={styles.scrolling}>
          <Text style={styles.welcome}>--- Breaking: {breaking} ---</Text>
        </AutoScroll>
        <View style={{ flex: 10 }}>
          <SafeAreaView>
            {feeds.length===0 ?
              <Text style={[baseText(), {color: colors.text}]}>News feeds are loading.</Text>
              :
              <FlatList
                data={feeds}
                keyExtractor={item => item.id}
                numColumns={1}
                renderItem={({item}) =>
                  <View>
                    <Text style={[baseText(), {color: colors.text}]}>{item.title}</Text>
                    <RenderHtml
                      contentWidth={width}
                      source={{html: item.content}}
                    />
                    <Hyperlink linkDefault={ true } linkStyle={ { color: '#2980b9', fontSize: 20 } }
                      linkText={ url => url.includes('http') ? '[Read more]' : url }>
                        <Text>{item.id}</Text>
                    </Hyperlink>
                  </View>
                } 
              />
            }
          </SafeAreaView>
        </View>
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
  image: {
    width: "100%",
    height: 300,
    justifyContent: 'center',
    flex: 1
  },
});