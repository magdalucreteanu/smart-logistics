import React, {useLayoutEffect, useState, useEffect, useCallback} from 'react';
import { View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import {baseText, titleText} from '../constants/LayoutStyles';
import { useTheme } from '@react-navigation/native';
import { Bubble, GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { serverAddress } from '../constants/Server';

const systemChatUser = {
  _id: 2,
  name: 'System',
  avatar: 'https://placeimg.com/140/140/any',
}

const ContainerMessageScreen = ({ route, navigation }) => {
  
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const { colors } = useTheme();

  const { containerNumber } = route.params;

  // Navigation Header bearbeiten
  useLayoutEffect(() => {
      navigation.setOptions({
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

  init = async () => {
    let savedMessages;
      try {
          // Username aus Storage lesen
          let value = await AsyncStorage.getItem('@username');
          setUsername(value);
          // Individuelles speichern einer Nachricht für den jeweiligen Benutzer und Container
          let savedMessagesValue = await AsyncStorage.getItem('@messages/' + value + '/' + containerNumber);
          savedMessages = JSON.parse(savedMessagesValue); 
      } catch (error) {
          Alert.alert('Error', error.message);
      }
      // Wenn keine gespeicherte Nachrichten vorhanden
      if (savedMessages == null) {
        console.log('No stored messages');
        setMessages([
          {
            _id: Math.round(Math.random() * 1000000),
            text: '[System Message] \nIf there are any problems with your containers, you can message the staff here. Please describe the problem in detail, we will take care of it as soon as possible.',
            createdAt: new Date(),
            user: systemChatUser,
          },
        ])
      // Wenn gespeicherte Nachrichten vorhanden
      } else {
        setMessages(savedMessages);
      }
  };

  // liefert ein Message
  const setMessageFromServer = async () => {
    try {
      // Server Request durchführen
      let response = await fetch(serverAddress() + '/message');
      // Text aus der Response lesen
      let serverMessage = await response.text();
      setMessages(previousMessages => GiftedChat.append(previousMessages,
        [
          {
            _id: Math.round(Math.random() * 1000000),
            text: serverMessage,
            createdAt: new Date(),
            user: systemChatUser,
          },
        ]));
    } catch (error) {
        Alert.alert('Error', error.message);
    }
  }
  
  const _storeMessages = async () => {
    try {
    // Messages speichern
      await AsyncStorage.setItem('@messages/' + username + '/' + containerNumber, JSON.stringify(messages));
    } catch (error) {
        Alert.alert('Error', error.message);
    }
  };
  
  useEffect(() => {
      init();
  }, []);

  useEffect(() => {
    if(messages.length > 0) {
      _storeMessages();
    }
  }, [messages]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    setMessageFromServer();
  }, [])

  // Text-"Bubble" anpassen
  const renderBubble = (props) => {
    return(
    <Bubble 
      {... props}
      wrapperStyle={{
        left: {
          backgroundColor: colors.lightAccent
        },
        right: {
          backgroundColor: colors.primary
        }
      }}
      textStyle={{
        left: {
          color: 'white',
        },
        right: {
          color: 'white',
        }
      }}
    />
    );
  }

  // Sende-Button anpassen
  const renderSend = (props) => {
    return(
      <Send {... props}>
        <View style={{marginRight: 10, marginBottom: 5}}>
          <Ionicons name = 'send' size = {32} color = {Colors.headerIconColor} />
        </View>
      </Send>
    );
  }

  // Toolbar anpassen (zum Nachrichten eingeben)
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: colors.container,
          borderTopColor: colors.container,
        }}
      />
    );
  }

    return (
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={{height: '100%'}}>
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: 1,
            }}
            renderAvatar = {null}
            renderBubble = {renderBubble}
            alwaysShowSend
            renderSend = {renderSend}
            scrollToBottom 
            renderInputToolbar = {renderInputToolbar}
            textInputStyle = {{color: colors.text}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
};

export default ContainerMessageScreen;