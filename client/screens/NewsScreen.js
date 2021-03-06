import React, {useEffect, useState, useLayoutEffect} from 'react';
import { Alert, Text, View, SafeAreaView, FlatList,ActivityIndicator, Image } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import {titleText, baseText, autoScrollContainer, containerRoundTopCorners, newsTileContainer} from '../constants/LayoutStyles';
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
        Alert.alert('Error', error.message);
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
      Alert.alert('Error', error.message);
    }
  }
  
  useEffect(() => {
    loadBreakingNews();
    loadRSSFeed();
  }, []);

  return (
    <View style = {{flex: 1, alignItems: 'center',justifyContent: 'center', padding: 20, backgroundColor: colors.background}}> 
        <AutoScroll style={[autoScrollContainer(), {backgroundColor: colors.primary }]}>
          <Text style={[baseText(),{color: colors.text, margin:10, textAlign: "center", fontWeight: "bold"}]}>--- Breaking: {breaking} ---</Text>
        </AutoScroll>
        <View style={{ flex: 10 }}>
          <SafeAreaView>
            {feeds.length===0 ?
              <View style={{flex:1}}>
                <Text style={[baseText(), {color: colors.text}]}>News feeds are loading.</Text>
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
              :
              <FlatList
                data={feeds}
                keyExtractor={item => item.id}
                numColumns={1}
                renderItem={({item}) =>
                  <View style={[newsTileContainer(), {backgroundColor: colors.container}]}> 
                    <Text style={[baseText(), {color: colors.text}]}>{item.title}</Text>
                    <RenderHtml
                      contentWidth={width}
                      source={{html: item.content}}
                      baseStyle={{color:colors.text, fontSize:20 }}
                    />
                    <Hyperlink linkDefault={ true } linkStyle={ { color: '#2980b9', fontSize: 20 } }
                      linkText={ url => url.includes('http') ? '[Read more]' : url }>
                        <Text style={[baseText(),{color:colors.text}]}>{item.id}</Text>
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