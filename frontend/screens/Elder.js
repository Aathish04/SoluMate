
import React, {useState} from 'react';
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ElderPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

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
    <SafeAreaView style={{flex: 1,backgroundColor:"#222222"}}>
    <Text style={styles.header}>Chat - Elder Mode</Text>
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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 20, // Adds padding around the header text
        textAlign: 'center',
        color:'white',
      },
    messagesContainer: {
      flex: 1,
      padding: 10,
      backgroundColor: '#222222', // Updated background color
    },
    message: {
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#007AFF', // Updated user message bubble color
      
    },
    aiMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#4B4B4D', // Updated AI message bubble color

    },
    messageText: {
      color: '#FFFFFF', // Updated text color for both user and AI messages
      fontSize:22,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 15,
        marginBottom:10,
        backgroundColor: '#222222', // Keeps the background of the input container white
      },
      input: {
        flex: 1,
        borderWidth: 0,
        borderRadius: 20, // Increased border radius for a rounded look
        padding: 10,
        marginRight: 10,
        backgroundColor: '#555555', // White background for the input field
        elevation: 2, // Adds shadow for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: {width: 0, height: 2}, // Shadow offset for iOS
        shadowOpacity: 0.1, // Shadow opacity for iOS
        shadowRadius: 2, // Shadow radius for iOS,
        color:'white',
      },
      sendButton: {
        backgroundColor: 'black', // Vibrant blue for the button
        borderRadius: 20, // Rounded edges for the button
        paddingVertical: 10,
        paddingHorizontal: 15,
        elevation: 2, // Adds shadow for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: {width: 0, height: 2}, // Shadow offset for iOS
        shadowOpacity: 0.1, // Shadow opacity for iOS
        shadowRadius: 2, // Shadow radius for iOS
      },
      sendButtonText: {
        color: '#FFFFFF', // Text color
        fontSize: 18, // Slightly larger text for better readability
        fontWeight: 'bold', // Medium font weight for text
      },
  });
  

export default ElderPage;
