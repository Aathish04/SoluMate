import React, {useState} from 'react';
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Pressable} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationBar from '../components/NavigationBar';
import { useNavigation } from '@react-navigation/native';
import MyTextInput from "../components/Textbox.js";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const navigation = useNavigation();

  const handleSend = () => {
    if (inputText.trim()) {
      // Here you would call your AI API to get the response
      const newMessage = {id: Date.now(), text: inputText, sender: 'user'};
      setMessages([...messages, newMessage]);

      // Placeholder for AI response
      const aiResponse = {id: Date.now() + 1, text: "This is a placeholder response.", sender: 'ai'};
      setMessages(currentMessages => [...currentMessages, aiResponse]);

      setInputText('');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:"#222222"}}>
      <View style={styles.backbutton}>
        <Pressable
          onPress={() => {
            navigation.navigate('Home')
          }}>    
          <Ionicons name="arrow-back-outline" size={32} color="white" />
        </Pressable>
      </View>
      <Text style={styles.header}>AI Chat</Text>
      
      <ScrollView style={styles.messagesContainer}>
        {messages.map(message => (
          <View key={message.id} style={[styles.message, message.sender === 'user' ? styles.userMessage : styles.aiMessage]}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          style={styles.input}
          placeholder="Type your message here..."
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="arrow-up-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backbutton: {
    
      position: 'absolute', // Position the button absolutely
      top: 60,
      left: 10,
      zIndex: 1, // Ensure the button appears above other elements
      backgroundColor: '#112A46',
      borderRadius: 20,
      padding: 10
    
},

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 70,
    textAlign: 'center',
    color:'#112A46',
    backgroundColor: '#F1EBE5'
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F1EBE5',
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#4B4B4D',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize:18,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    marginBottom:10,
    backgroundColor: '#F1EBE5',
  },
  input: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#888888',
    
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    color:'white',
  },
  sendButton: {
    backgroundColor: '#112A46',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default ChatPage;
