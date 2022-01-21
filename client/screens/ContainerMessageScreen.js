import React, {useLayoutEffect, useState, useEffect, useCallback} from 'react';
import { Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {defaultContainer} from '../constants/LayoutStyles';
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import {baseText, titleText} from '../constants/LayoutStyles';
import { useTheme } from '@react-navigation/native';
import { Bubble, GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';

const ContainerMessageScreen = ({ navigation }) => {
  
  const [messages, setMessages] = useState([]);
  const { colors } = useTheme();

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

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: '[System Message] \nIf there are any problems with your containers, you can message the staff here. Please describe the problem in detail, we will take care of it as soon as possible.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

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

  const renderSend = (props) => {
    return(
      <Send {... props}>
        <View style={{marginRight: 10, marginBottom: 5}}>
          <Ionicons name = 'send' size = {32} color = {Colors.headerIconColor} />
        </View>
      </Send>
    );
  }

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
            textInputStyle={{color: colors.text}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
};

export default ContainerMessageScreen;