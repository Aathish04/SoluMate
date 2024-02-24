import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, StyleSheet, Pressable, Animated} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { LogBox } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from 'expo-file-system';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../firebaseConfig';


LogBox.ignoreLogs(['new NativeEventEmitter()']);

const languages = {'English': 'en', 'Assamese': 'as', 'Bangla': 'bn', 
'Boro': 'brx', 'Dogri': 'doi', 'Goan-Konkani': 'gom', 'Gujarati': 'gu', 
'Hindi': 'hi', 'Kannada': 'kn', 'Kashmiri (Arabic)': 'ks', 
'Kashmiri (Devanagari)': 'ks_Deva', 'Maithili': 'mai', 'Malayalam': 'ml', 
'Manipuri (Meitei)': 'mni', 'Manipuri (Bengali)': 'mni_Beng', 'Marathi': 'mr', 
'Nepali': 'ne', 'Odia': 'or', 'Panjabi': 'pa', 'Sanskrit': 'sa', 'Santali': 'sat', 
'Sindhi (Arabic)': 'sd', 'Sindhi (Devanagari)': 'sd_Deva', 'Tamil': 'ta', 'Telugu': 'te', 'Urdu': 'ur'}

const ChatPage = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const navigation = useNavigation();
  const [response_, setResponse_] = useState('');
  const scrollViewRef = useRef();
  const [base64Audio,setBase64Audio] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Choose language');
  const fadeAnim = useRef(new Animated.Value(0)).current; // for fade-in animation
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState('');

  const getUserData = async (userID) => {
    const q = query(collection(db, 'users'), where('userid', '==', userID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserData(doc.data());
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user.uid);
        getUserData(user.uid);
        console.log("hi")
        console.log(userData)
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);


  const dummyjson =  {"Age": userData.age, "Language": languages[selectedLanguage], "Location": userData.location, "messageContent": base64Audio["_j"], "mimetype": "audio"}
    
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


  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }
    setResponse_("Nice voice");
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync();
    })();
  }, []);

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      setIsRecording(true);
      const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const convertAudioToBase64 = async (audioUri) => {
    try {
      // Read the file as a Base64 encoded string
      const base64Audio = await FileSystem.readAsStringAsync(audioUri, { encoding: FileSystem.EncodingType.Base64 });
      return base64Audio;
    } catch (error) {
      console.error("Error converting audio to Base64:", error);
      return null;
    }
  };
  const stopRecording = async () => {
    setRecording(null);
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    setBase64Audio(convertAudioToBase64(uri))
    console.log(base64Audio["_j"])
    sendJsonToFastAPI(dummyjson)
    const newMessage = { id: Date.now(), text: 'Click here to play', sender: 'user', uri };
    setMessages([...messages, newMessage]);
    setTimeElapsed(0);

    



    // Simulate receiving an AI response with an audio file
    setTimeout(() => {
      const uri = saveBase64Audio(base64Audio,'hello.3gp');
      console.log(uri)
      const aiResponse = {id: Date.now() + 1, text: response_, sender: 'ai', uri: uri};
      setMessages(currentMessages => [...currentMessages, aiResponse]);
    }, 2000); 
  };

  const playSound = async (uri) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);
    await sound.playAsync();
  };

  async function playAudioFile(uri) {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
      // Remember to unload the sound from memory after playback is finished
      sound.setOnPlaybackStatusUpdate(async (playbackStatus) => {
        if (playbackStatus.didJustFinish) {
          await sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Could not play the audio", error);
    }
  }

  async function saveAndPlayBase64Audio(base64Audio, filename) {
    const uri = await saveBase64Audio(base64Audio, filename);
    await playAudioFile(uri);
  }

  useEffect(() => {
    console.log("Messages",messages)
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  async function saveBase64Audio(base64String, filename) {
    const uri = `${FileSystem.cacheDirectory}${filename}`;
    await FileSystem.writeAsStringAsync(uri, base64String, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return uri;
  }

  const sendJsonToFastAPI = async (jsonData) => {
    try {
      const response = await fetch('https://d37f-2401-4900-65b8-a0bc-c47b-216-187c-5685.ngrok-free.app/Generator/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      // Assuming the response JSON has a key that contains the actual text message you want to display.
      // Adjust 'textKey' to the actual key that contains the message.
      setResponse_(data.freetext || 'No response text found.');
      console.log('Response data:', data);
    } catch (error) {
      console.error('Error:', error);
      setResponse_('Error fetching response');
    }
  };
  
  
 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F1EBE5" }}>
      <View style={styles.backbutton}>
        <Pressable onPress={() => { navigation.navigate('Home'); }}>
          <Ionicons name="arrow-back-outline" size={32} color="white" />
        </Pressable>
      </View>
      <Text style={styles.header}>AI Voice Chat</Text>
      <ScrollView
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message, index) => (
          <TouchableOpacity key={index} onPress={() => {message.sender==='user'? playSound(message.uri):saveAndPlayBase64Audio(base64Audio, 'exampleAudio.mp3')
          .then(() => console.log('Audio played successfully'))
          .catch(error => console.error('Error playing audio', error))}}>
            <View style={[styles.message, message.sender === 'user' ? styles.userMessage : styles.aiMessage]}>
              {(message.sender === 'user' || message.sender === 'ai') && message.uri && (
                <Ionicons name="play-outline" size={25} color="white" />
              )}
              <Text style={styles.messageText}>{message.text}</Text>

            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {isRecording && (
        <Text style={styles.count}>{timeElapsed}</Text>
      )}
      <TouchableOpacity onPress={openPopup} style={styles.languageButton}>
          <Text style={styles.languageButtonText}>{selectedLanguage}</Text>
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: '#F1EBE5' }}>
        <TouchableOpacity onPressIn={startRecording} onPressOut={stopRecording} style={styles.actionButton}>
          {isRecording ? (
            <Ionicons name="mic-outline" size={32} color="red" />
          ) : (
            <Ionicons name="mic-outline" size={32} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backbutton: {
    position: 'absolute',
    top: 60,
    left: 10,
    zIndex: 1,
    backgroundColor: '#112A46',
    borderRadius: 20,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
    textAlign: 'center',
    color: '#112A46',
    backgroundColor: '#F1EBE5',
    paddingBottom: 25,
  },
  messagesContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F1EBE5',
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    marginBottom: 20,
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
    fontSize: 18,
  },
  actionButton: {
    backgroundColor: '#112A46',
    borderRadius: 40,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: 50,
    justifyContent: 'center',
    alignSelf: 'center',
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
