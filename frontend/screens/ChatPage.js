import React, {useState,useRef,useEffect} from 'react';
import {SafeAreaView, View, Text, TextInput,TouchableOpacity, ScrollView, StyleSheet, Pressable} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationBar from '../components/NavigationBar';
import { useNavigation } from '@react-navigation/native';
import MyTextInput from "../components/Textbox.js";
import languageDrop from '../components/languageDrop.js';
import { Animated } from 'react-native';

const languages = {'English': 'en', 'Assamese': 'as', 'Bangla': 'bn', 
'Boro': 'brx', 'Dogri': 'doi', 'Goan-Konkani': 'gom', 'Gujarati': 'gu', 
'Hindi': 'hi', 'Kannada': 'kn', 'Kashmiri (Arabic)': 'ks', 
'Kashmiri (Devanagari)': 'ks_Deva', 'Maithili': 'mai', 'Malayalam': 'ml', 
'Manipuri (Meitei)': 'mni', 'Manipuri (Bengali)': 'mni_Beng', 'Marathi': 'mr', 
'Nepali': 'ne', 'Odia': 'or', 'Panjabi': 'pa', 'Sanskrit': 'sa', 'Santali': 'sat', 
'Sindhi (Arabic)': 'sd', 'Sindhi (Devanagari)': 'sd_Deva', 'Tamil': 'ta', 'Telugu': 'te', 'Urdu': 'ur'}

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [response_, setResponse_] = useState('');
  const scrollViewRef = useRef();
  const navigation = useNavigation();
  //dropdown
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const fadeAnim = useRef(new Animated.Value(0)).current; // for fade-in animation

  const openPopup = () => {
    setShowPopup(true);
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const closePopup = () => {
    // Fade-out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowPopup(false);
    });
  };

  const renderLanguageOptions = () => {
    return Object.entries(languages).map(([languageName, languageCode], index) => (
      <Pressable key={index} style={styles.dropdownItem} onPress={() => {
        console.log(languageCode); // Log the value of the selected key
        setSelectedLanguage(languageName); // Set the selected language name
      }}>
        <Text style={styles.dropdownItemText}>{languageName}</Text>
      </Pressable>
    ));
  };


  const fetchData = async () => {
    try {
      const response = await fetch('https://a430-115-244-221-146.ngrok-free.app/');
      const data = await response.json();
      console.log(data.message);
      setResponse_(data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    // Whenever messages update, scroll to the bottom
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);


  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {id: Date.now(), text: inputText, sender: 'user'};
      setMessages([...messages, newMessage]);
  
      setInputText('');
  
      // Adding a 2-second delay before setting the AI response
      setTimeout(() => {
        const aiResponse = {id: Date.now() + 1, text:response_, sender: 'ai'};
        setMessages(currentMessages => [...currentMessages, aiResponse]);
      }, 2000); // 2000 milliseconds = 2 seconds
    }

    fetchData()
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
      
      
      <ScrollView style={styles.messagesContainer}
      ref={scrollViewRef} // Attach the ref to the ScrollView
      onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map(message => (
          <View key={message.id} style={[styles.message, message.sender === 'user' ? styles.userMessage : styles.aiMessage]}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={openPopup} style={styles.languageButton}>
          <Text style={styles.languageButtonText}>Choose Language</Text>
        </TouchableOpacity>
        {showPopup && (
        <Animated.View style={[styles.popupOverlay, {opacity: fadeAnim}]}>
          <View style={styles.popup}>
            <ScrollView style={styles.dropdown}>
              {renderLanguageOptions()}
            </ScrollView>
            <TouchableOpacity onPress={closePopup} style={{borderRadius:40,backgroundColor: '#112A46'}}>
             <Ionicons name="close-circle-outline" size={40} color="white"  />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
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
headerContainer: {
  flexDirection: 'row', // Align items in a row
  justifyContent: 'space-between', // Space items out between the sides of the container
  alignItems: 'center', // Align items vertically
  paddingTop: 70,
  paddingHorizontal: 10, // Add some horizontal padding
  backgroundColor: '#F1EBE5',
},

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 70,
    textAlign: 'center',
    color:'#112A46',
    backgroundColor: '#F1EBE5',
    paddingBottom: 25,
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
    marginBottom:20,
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
  languageButton: {
    padding: 10,
    backgroundColor: '#112A46',
    borderRadius: 5,
  },
  languageButtonText: {
    color: '#FFFFFF',
  },
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  popup: {
    width: '80%',
    maxHeight: '70%', // This ensures that the popup does not exceed 60% of the screen's height
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20, // Add padding to prevent content from touching the edges
    justifyContent: 'center', // Center the children vertically
    alignItems: 'center', // Center the children horizontally,
    borderWidth:1,
  },

  dropdown: {
    width: '100%', // Ensure the dropdown is as wide as the popup minus padding
    alignSelf: 'center', // Align the dropdown in the center of the popup
    marginBottom: 20, // Add some space before the close button
  },
  
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dropdownItemText: {
    fontSize: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});


export default ChatPage;
