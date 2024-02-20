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
      const newMessage = {id: Date.now(), text: inputText, sender: 'user'};
      setMessages([...messages, newMessage]);
  
      setInputText('');
  
      // Adding a 2-second delay before setting the AI response
      setTimeout(() => {
        const aiResponse = {id: Date.now() + 1, text:"To file a complaint regarding potholes in Chennai, follow these steps using the Tamil Nadu Pothole Complaint Grievance Redressal System:\n\n1. Visit the website: https://erp.chennaicorporation.gov.in/pgr/citizen/BeforeReg.do\n2. Fill in the required fields with your personal information such as name, mobile number, and email address.\n3. Provide your address, including the street name, and the pin code for your location in Chennai.\n4. Choose the 'Pothole' issue from the given complaint types or input it manually under 'complaintype0'.\n5. Describe the issue related to the pothole in 'complaintDetails'.\n6. If you wish to remain anonymous, select the 'anonReg' checkbox.\n7. Click on the 'generateOtp' button to generate an OTP (One Time Password), which will be sent to your registered mobile number.\n8. Enter the received OTP in the 'txtSMSOtp' field and click on the 'validateOtp' button to verify it.\n9. Finally, fill in any other necessary details and submit your complaint by clicking on the 'button3' (submit) button.", sender: 'ai'};
        setMessages(currentMessages => [...currentMessages, aiResponse]);
      }, 2000); // 2000 milliseconds = 2 seconds
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
