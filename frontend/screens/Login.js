import React from "react";
import { useState } from "react";
import { View, Image, StyleSheet, Pressable, Text, TouchableOpacity, ScrollView, SafeAreaView,Alert } from "react-native";
import MyTextInput from "../components/Textbox";
import { useNavigation } from "@react-navigation/native";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {app} from '../firebaseConfig'
import MyPassword from "../components/Password";

export default function LoginScreen() {
    const auth = getAuth(app)
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const gohome = async ()=>{
        console.log("hello")
        try{
          const userCredential = await signInWithEmailAndPassword(auth,email,password);
          const user = userCredential.user;
          console.log(user.email)
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], // Name of the screen to navigate after login
          });
    
        }catch(error){
          const errorCode = error.code;
          const errorMessage = error.message;
          if(errorCode==='auth/invalid-credential'){
            Alert.alert("Invalid credentials!");
            console.log(errorCode)
          }else{
          console.log(Alert.alert(errorMessage));
          }
        }
      }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F1EBE5" }}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <Image source={require('../assets/logo.png')} style={styles.image} />
                    <View style={styles.inputContainer}>
                        <MyTextInput
                            value={email}
                            placeholder={"Email"}
                            onChange={setEmail}
                        />
                        <MyPassword
                            
                            value={password}
                            placeholder={"Password"}
                            onChange={setPassword}
                            
                        />
                    </View>
                    <Pressable
                        style={styles.button}
                        onPress={()=>{navigation.navigate('Home')}}>
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                    <Text style={{ color: '#112A46' }}> Don't have an account? </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }}>
                        <Text style={styles.signup}>SignUp</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        padding:100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#F1EBE5",

    },
    image: {
        height: 140,
        aspectRatio: 1.9,
        marginBottom: 30,
        tintColor: 'rgba(0, 0, 0, 0.7)',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F1EBE5",
        width:'100%',
        marginTop:50,
    },
    button: {
        backgroundColor: '#112A46',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        height: 50,
        marginBottom: 30
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginTop:20,
        width: 360,
        marginBottom: 50, // Removed duplicated marginBottom property

    },
    signup: {
        color: '#112A46',
        fontSize: 14,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        paddingBottom: 40,
    }
});
