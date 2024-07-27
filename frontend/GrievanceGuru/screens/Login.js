import React from "react";
import { View, Image, StyleSheet,Pressable,Text,TouchableOpacity} from "react-native";
import MyTextInput from "../components/Textbox";
import SignUpScreen from "./Signup";


export default function LoginScreen() {
    const doNothing = () => {
        console.log("Hi");
    }

    let name = ''
    return(

        <View style= {styles.container}>
             <Image source = {require('../assets/logo.png')} style = {styles.image}/>
            <View style={styles.inputContainer}>
            <MyTextInput
                value = {name}
                placeholder = {"Email"}
                onChange = {doNothing}
             />
             <MyTextInput
                value = {name}
                placeholder={"Password"}
                onChange = {doNothing}
                
             />
            </View>
 
            <View style={{marginBottom:20}}/>
            <Pressable
                style={styles.button}
                onPress={doNothing}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <Text> Don't have an account? </Text>
            <TouchableOpacity style={styles.buttonText} onPress={doNothing}>
            <Text style={styles.signup}>SignUp</Text>
            </TouchableOpacity>
        </View>
    
    );
}


const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        marginTop: -350,
        tintColor: 'rgba(0, 0, 0, 0.7)', // Apply a white overlay
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8CA9AD",
        paddingTop: 250,
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        height: 50,
        marginBottom: 30
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '90%',
        marginBottom: 15,
        marginBottom: 50
    },
    signup: {
        color: '#040720',
        fontSize: 14,
        fontWeight: 'bold',
        textDecorationLine: 'underline', // Add underlining
    }
});
