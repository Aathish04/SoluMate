import React from "react";
import { useState } from "react";
import { View, Image, StyleSheet, Pressable, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import MyTextInput from "../components/Textbox";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                        <MyTextInput
                            value={password}
                            placeholder={"Password"}
                            onChange={setPassword}
                        />
                    </View>
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate('Home')
                        }}>
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
        width:'100%'
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
        width: 300,
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
