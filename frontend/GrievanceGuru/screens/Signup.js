import React from "react";
import { View, Image, StyleSheet,Pressable,Text} from "react-native";
import MyTextInput from "../components/Textbox.js";
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen() {
    const doNothing = () => {
        console.log("Hi");
    }

    let name = '';



    return (

        <View style={styles.container}>
            
            <View style={styles.backbutton}>
            <Pressable
                onPress={() => {
                    alert('hi')
                }}>    
               <Ionicons name="arrow-back-outline" size={32} color="black" />
            </Pressable>
            </View>




            <View style={styles.inputContainer}>
                <MyTextInput
                    value={name}
                    onChange={doNothing}
                    placeholder={"Fullname"}
                    style={styles.input}
                />
                <MyTextInput
                    value={name}
                    onChange={doNothing}
                    placeholder={"Phone Number"}
                    style={styles.input}
                />
                <MyTextInput
                    value={name}
                    onChange={doNothing}
                    placeholder={"Email"}
                    style={styles.input}
                />
                <MyTextInput
                    value={name}
                    onChange={doNothing}
                    placeholder={"Password"}
                    style={styles.input}
                    secureTextEntry={true}
                />
            </View>
            <Pressable
                style={styles.button}
                onPress={doNothing}>
                <Text style={styles.buttonText}>SignUp</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8CA9AD',
        padding: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
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
        backgroundColor: 'black',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        height: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    backbutton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: '#8CA9AD',
        borderRadius: 20,
        padding: 10,
    }
});
