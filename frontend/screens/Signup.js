import React from "react";
import { View, Image, StyleSheet,Pressable,Text} from "react-native";
import MyTextInput from "../components/Textbox.js";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
    const doNothing = () => {
        console.log("Hi");
    }

    let name = '';

    const navigation = useNavigation();

    return (

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
        backgroundColor: '#F1EBE5',
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
        backgroundColor: '#112A46', // Button background color changed to white
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        height: 50,
        marginBottom: 30
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    backbutton: {
        position: 'absolute',
        top: 60,
        left: 10,
        backgroundColor: '#112A46',
        borderRadius: 20,
        padding: 10,
    }
});
