import React, {useState,useRef,useEffect} from 'react';
import {SafeAreaView, View, Text, TextInput,TouchableOpacity, ScrollView, StyleSheet, Pressable} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationBar from '../components/NavigationBar';
import { useNavigation } from '@react-navigation/native';
import MyTextInput from "../components/Textbox.js";
import languageDrop from '../components/languageDrop.js';
import { Animated } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../firebaseConfig';


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
  const [inputText, setInputText] = useState('');
  const [response_, setResponse_] = useState([]);
  const scrollViewRef = useRef();
  const navigation = useNavigation();
  const [latestUserMessage, setLatestUserMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState('');

  //dropdown
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Choose language');
  const fadeAnim = useRef(new Animated.Value(0)).current; // for fade-in animation

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

  const dummyjson =  {"Age": userData.age, "Language": languages[selectedLanguage], "Location": userData.location, "messageContent": inputText, "mimetype": "text"}
    
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

  let dummy = {
    'freetext' : "சென்னையில் உள்ள பல பள்ளங்கள் குறித்த புகாரை பதிவு செய்யவும், தமிழ்நாடு குழித்துறை புகார் குறை தீர்க்கும் முறையைப் பயன்படுத்தி இந்த படிப்படியான வழிமுறைகளைப் பின்பற்றவும்:\n\n1. இணையதளத்தைப் பார்வையிடவும்: https://erp.chennaicorporation.gov.in/pgr/citizen/BeforeReg.do\n2. திட்டத்தில் தேவையான விவரங்களை நிரப்பவும்:\n\t* 'complainantFirstName', 'complainantLastname': உங்கள் முதல் மற்றும் கடைசி பெயரை உள்ளிடவும்.\n\t* 'complainantAddress1', 'complainantAddress2': உங்கள் குடியிருப்பு முகவரியை உள்ளிடவும் சென்னை.\n\t* 'complainantPinCode', 'complainantTelephone': உங்கள் பின் குறியீடு மற்றும் தொடர்பு எண்ணை உள்ளிடவும்.\n\t* 'complainantEmail': உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்.\n\t* 'gender': இதிலிருந்து உங்கள் பாலினத்தைத் தேர்ந்தெடுக்கவும் ரேடியோ பொத்தான் விருப்பங்கள்.\n\t* 'complainantMobileTelephone': உங்கள் மொபைல் எண்ணை உள்ளிடவும்.\n\t* 'புகார் மின்னஞ்சல்' என்பது படி 2c இல் உள்ளிடப்பட்டது போல் இருக்க வேண்டும்.\n3. உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுத்து, 'generateOtp' பொத்தானின் கீழ் 'Generate OTP' என்பதைக் கிளிக் செய்யவும்.\n4. உங்கள் மொபைல் எண்ணில் OTP (ஒரு முறை கடவுச்சொல்) பெறுவீர்கள். 'txtSMSOtp' என்பதன் கீழ் வழங்கப்பட்ட இடத்தில் அதை உள்ளிடவும்.\n5. 'validateOtp' என்பதன் கீழ் உள்ள 'Validate OTP' பட்டனைக் கிளிக் செய்யவும்.\n6. கொடுக்கப்பட்ட விருப்பங்களிலிருந்து, உங்கள் புகார் வகையாக 'complaintype12' (Pothole) என்பதைத் தேர்ந்தெடுக்கவும். இந்தப் புகார் வகைக்காகக் கேட்கப்பட்டுள்ள கூடுதல் விவரங்களை நிரப்பவும்.\n7. 'complaintTitle' புலத்தில், உங்கள் புகாரின் சுருக்கமான தலைப்பை வழங்கவும், அதாவது \"சென்னையில் பல குட்டைகள்\"\n8. 'complaintDetails' புலத்தில் பல குழிகளைப் பற்றிய உங்கள் புகாரை விரிவாக விவரிக்கவும். பள்ளங்களால் பாதிக்கப்பட்ட இடங்கள் மற்றும் பகுதிகளைக் குறிப்பிடவும்.\n9. குழிகளின் படங்களை இணைக்க விரும்பினால், 'படம்' புலத்தில் கிளிக் செய்து, தொடர்புடைய கோப்புகளைத் தேர்ந்தெடுக்கவும்.\n10. மற்ற புலங்களை காலியாக விடவும் அல்லது உங்கள் விருப்பப்படி விருப்பங்களை தேர்வு செய்யவும்.\n11. நீங்கள் அநாமதேயமாகப் பதிவு செய்ய விரும்பினால் 'anonReg' க்கு அடுத்துள்ள பெட்டியைத் தேர்வுசெய்யவும், இருப்பினும் தொடர்புத் தகவலை வழங்குவது விரைவான தீர்மானத்திற்கு உதவும்.\n12. உங்கள் புகாரைச் சமர்ப்பிக்க, 'பொத்தான்3' கீழ் உள்ள 'சமர்ப்பி' பொத்தானைக் கிளிக் செய்யவும்.",
   'pasthistory' : [],
    'navigation' :""
    }


  const fetchData = async () => {
    try {
      //const response = await fetch('https://a430-115-244-221-146.ngrok-free.app/');
      //const data = await response.json();
      
      
      let dummyresponse = dummy.freetext;
      if (dummy.navigation != '')
      {
        dummyresponse = dummyresponse + ' Please follow the given instructions for navigation: '+  dummy.navigation;
      }

  
      setResponse_(dummyresponse);
      return dummyresponse;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    console.log("Updated response_:", response_);
  }, [response_]);

  useEffect(() => {
    // Whenever messages update, scroll to the bottom
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);


  const handleSend = async () => {
  if (inputText.trim()) {
    const newMessage = { id: Date.now(), text: inputText, sender: 'user' };
    sendJsonToFastAPI(dummyjson)
    console.log(dummyjson)
    
   // console.log("pRINT",latestUserMessage)
    setMessages([...messages, newMessage]);

  }
    setInputText('');

   // const fetchedResponse = await fetchData();

    console.log("This is data:",response_)
    // Now, set the AI response after fetchData has completed
    setTimeout(() => {
      const aiResponse = { id: Date.now()+1 , text: response_, sender: 'ai' };
      setMessages(currentMessages => [...currentMessages, aiResponse]);
    }, 2000); // 2000 milliseconds = 2 seconds
  
};


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
