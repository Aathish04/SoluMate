import React from "react";
import { useState } from "react";
import { View, Image, StyleSheet,Pressable,Text,TouchableOpacity} from "react-native";
import MyTextInput from "../components/Textbox";
import SignUpScreen from "./Signup";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
    const doNothing = () => {
        console.log("Hi");
    }
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    let name = '';
    return(

        <View style= {styles.container}>
             <Image source = {require('../assets/logo.png')} style = {styles.image}/>
            <View style={styles.inputContainer}>
            <MyTextInput
                value = {email}
                placeholder = {"Email"}
                onChange = {setEmail}
             />
             <MyTextInput
                value = {password}
                placeholder={"Password"}
                onChange = {setPassword}
                
             />
            </View>
 
            <View style={{marginBottom:20}}/>
            <Pressable
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Home')
                }}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <Text style={{color: '#112A46'}}> Don't have an account? </Text>
            <TouchableOpacity style={styles.buttonText} onPress={() => {navigation.navigate('SignUp')}}>
            <Text style={styles.signup}>SignUp</Text>
            </TouchableOpacity>
        </View>
    
    );
}

const styles = StyleSheet.create({
    image: {
        //width: 100,
        height: 140,
        aspectRatio: 1.9,
        marginTop: -350,
        marginBottom: 30,
        tintColor: 'rgba(0, 0, 0, 0.7)', // Apply a white overlay
        
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F1EBE5", 
        paddingTop: 250,
    },
    button: {
        backgroundColor: '#112A46', // Button background color changed to white
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        height: 50,
        marginBottom: 30
    },
    buttonText: {
        color: '#fff', // Text color changed to black
        fontSize: 14,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '90%',
        marginBottom: 15,
        marginBottom: 50
    },
    signup: {
        color: '#112A46', // Signup text color changed to white
        fontSize: 14,
        fontWeight: 'bold',
        textDecorationLine: 'underline', // Add underlining
    }
});
