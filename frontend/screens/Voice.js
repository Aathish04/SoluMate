import React, { useState, useEffect, useRef} from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { LogBox } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from 'expo-file-system';


LogBox.ignoreLogs([
  'new NativeEventEmitter()',
]);

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [isRecording, setIsRecording] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0);
  const navigation = useNavigation()
  const [response_, setResponse_] = useState('');
  const scrollViewRef = useRef();

  useEffect(() => {
    // Whenever messages update, scroll to the bottom
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
      console.log(timeElapsed);

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    setRecording(null);
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    // Save the recording uri to state or send it to the server

    const newMessage = { id: Date.now(), text: 'Click here to play', sender: 'user', uri };
    setMessages([...messages, newMessage]);
    setTimeElapsed(0);

    const base64Data = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    //console.log(base64Data);

    

    setTimeout(() => {
      const aiResponse = {id: Date.now() + 1, text:response_, sender: 'ai'};
      setMessages(currentMessages => [...currentMessages, aiResponse]);
    }, 2000); 
    };



  const playSound = async (uri) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F1EBE5" }}>
      <View style={styles.backbutton}>
        <Pressable onPress={() => {  navigation.navigate('Home') }}>
          <Ionicons name="arrow-back-outline" size={32} color="white" />
        </Pressable>
      </View>
      <Text style={styles.header}>AI Voice Chat</Text>
      <ScrollView style={styles.messagesContainer}
       ref={scrollViewRef} // Attach the ref to the ScrollView
       onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
  >
        {messages.map((message, index) => (
          <TouchableOpacity key={index} onPress={() => message.uri && playSound(message.uri)}>
            <View style={[styles.message, message.sender === 'user' ? styles.userMessage : styles.aiMessage]}>
              { message.sender === 'user' &&  ( <Ionicons name="play-outline" size={25} color="white"/>)

              }
           
              <Text style={styles.messageText}>{message.text} </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          style={styles.input}
          placeholder="Type your message here..."
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View> */}

    {isRecording && (
                        <Text style={styles.count}>{timeElapsed}</Text>
                    )
    }
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: '#F1EBE5' }}>
        <TouchableOpacity onPressIn={startRecording} onPressOut={stopRecording} style={styles.actionButton}>
        
      {isRecording  && 
        (<Ionicons name="mic-outline" size={32} color="red" />)
      }

      {!isRecording  && 
        (<Ionicons name="mic-outline" size={32} color="white" />)
      }   
        
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
    marginTop: 60, // Adjusted to make room for the back button
    marginBottom: 20, // Added spacing before the content
    textAlign: 'center',
    color: '#112A46',
    backgroundColor: '#F1EBE5',
    paddingBottom:25,

    
  },
  messagesContainer: {
    flex: 1,
    paddingTop: 10, // Added padding at the top
    paddingHorizontal: 10, // Added horizontal padding
    backgroundColor: '#F1EBE5',
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
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
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#F1EBE5',
  },
  input: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#888888',
    color: 'white',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#112A46',
    borderRadius: 20,
    padding: 10,
  },
  actionButton: {
    backgroundColor: '#112A46', // A blue color for the action buttons
    borderRadius: 40,
    padding:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // White color for the button text
    fontSize: 16,
  },

  count:
  {
    fontSize: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    
  }
});

export default ChatPage;