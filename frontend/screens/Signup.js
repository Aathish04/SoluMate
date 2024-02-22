import React, { useState } from "react";
import { View, Image, StyleSheet,Pressable,Text,ScrollView,SafeAreaView} from "react-native";
import MyTextInput from "../components/Textbox.js";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {app} from '../firebaseConfig.js'
import {getFirestore,addDoc,collection} from 'firebase/firestore'

const languages = {'English': 'en', 'Assamese': 'as', 'Bangla': 'bn', 
'Boro': 'brx', 'Dogri': 'doi', 'Goan-Konkani': 'gom', 'Gujarati': 'gu', 
'Hindi': 'hi', 'Kannada': 'kn', 'Kashmiri (Arabic)': 'ks', 
'Kashmiri (Devanagari)': 'ks_Deva', 'Maithili': 'mai', 'Malayalam': 'ml', 
'Manipuri (Meitei)': 'mni', 'Manipuri (Bengali)': 'mni_Beng', 'Marathi': 'mr', 
'Nepali': 'ne', 'Odia': 'or', 'Panjabi': 'pa', 'Sanskrit': 'sa', 'Santali': 'sat', 
'Sindhi (Arabic)': 'sd', 'Sindhi (Devanagari)': 'sd_Deva', 'Tamil': 'ta', 'Telugu': 'te', 'Urdu': 'ur'}

export default function SignUpScreen() {

     //Initialization
     const auth = getAuth(app);
     const db = getFirestore(app);

    const [fullName,setfullName] = useState('');
    const [email,setEmail] = useState('');
    const [age,setAge] =useState('');
    const [location,setLocation] = useState('');
    const [password,setPassword] = useState('');
    const [language,setLanguage] = useState('');
    const navigation = useNavigation();
    
    const cleanEmail = (email) => {
        return email.replace(/\s/g, ''); // Removes all white spaces from email
      };

      const gohome = async (email,password)=>{
        try{
            
          const userCredential = await signInWithEmailAndPassword(auth,email,password);
          const user = userCredential.user;
          console.log('User signed in after signup: ',user);
           navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], // Name of the screen to navigate after login
          });
    
        }catch(error){
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(Alert.alert(errorMessage));
        }
      }

      const signup = async ()=>{
        try{
          const cleanedEmail = cleanEmail(email);
          const userCredential = await createUserWithEmailAndPassword(auth,cleanedEmail,password);
          const user = userCredential.user;
          console.log('User created: ',cleanedEmail);
          gohome(cleanedEmail,password);
          const docRef = await addDoc(collection(db,"users"),{
            userid:user.uid,
            name:fullName,
            email:email,
            location:location,
            age:age,
          });
        }catch(error){
          const errorCode = error.code;
          const errorMessage = error.message;
          if(errorCode==='auth/email-already-in-use'){
            Alert.alert('Error','Email already in use. Use different email, or login with existing.');
          }
          else if(errorCode==='auth/weak-password'){
            Alert.alert('Error','Password too weak. Try a new password.');
          }else{
          console.error('Error creating user: ',errorCode,errorMessage)
          Alert.alert(errorMessage)
          }
        }
      }

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
      
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#8CA9AD" }}>
        <ScrollView>
        <View style={styles.container}>
            
            <View style={styles.backbutton}>
            <Pressable
                onPress={() => {
                    navigation.navigate('Login')
                }}>    
               <Ionicons name="arrow-back-outline" size={32} color="white" />
            </Pressable>
            </View>




            <View style={styles.inputContainer}>
                <MyTextInput
                    value={fullName}
                    onChange={setfullName}
                    placeholder={"Fullname"}
                    style={styles.input}
                />
                <MyTextInput
                    value={age}
                    onChange={setAge}
                    placeholder={"Age"}
                    style={styles.input}
                />
                <MyTextInput
                    value={location}
                    onChange={setLocation}
                    placeholder={"Location"}
                    style={styles.input}
                />
                <Pressable >
                <ScrollView style={styles.dropdown}>
                  {renderLanguageOptions()}
                </ScrollView>
                </Pressable>
                <MyTextInput
                    value={email}
                    onChange={setEmail}
                    placeholder={"Email"}
                    style={styles.input}
                />
                <MyTextInput
                    value={password}
                    onChange={setPassword}
                    placeholder={"Password"}
                    style={styles.input}
                    secureTextEntry={true}
                />
            </View>
            <Pressable
                style={styles.button}
                onPress={signup}
            >
                <Text style={styles.buttonText}>SignUp</Text>
            </Pressable>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', // Center horizontally
        paddingBottom:200,
        backgroundColor: '#F1EBE5',
        padding:20
    },
    inputContainer: {
        width: '100%',

    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#112A46', // Button background color changed to white
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        height: 50,
        marginTop:20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    backbutton: {
        marginBottom:70,
        marginLeft:-300,
        backgroundColor: '#112A46',
        borderRadius: 20,
        padding: 10,
        marginTop:70,
    }
});
