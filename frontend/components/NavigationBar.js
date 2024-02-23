import { View, Text, StyleSheet, Pressable,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {useState,useEffect} from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../firebaseConfig';

export default function NavigationBar() {

    const navigation = useNavigation()
    const auth = getAuth(app);
    const db = getFirestore(app);
    

  


    return (
        <View style={styles.navbar}>
    <TouchableOpacity style={styles.nav} onPress={() => navigation.navigate('Chat')}>
                <Ionicons name="chatbox-outline" size={32} color="black" />
                <Text style ={styles.caption}>AI-Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nav} onPress={() => navigation.navigate('Community')}>
                <Ionicons name="people-outline" size={32} color="black" />
                <Text style ={styles.caption}>Community</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.nav} onPress={() => navigation.navigate('Voice')}>
                <Ionicons name="mic-outline" size={32} color="black" />
                <Text style ={styles.caption}>Voice2Text</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nav} onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-outline" size={32} color="black" />
                <Text style ={styles.caption}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nav} onPress={() => navigation.navigate('Stats')}>
            <Ionicons name="stats-chart-outline" size={32} color="black" />
                <Text style ={styles.caption}>Stats</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar:
    {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'relative',
        

    },

    nav:
    {
        padding: 25,
        alignItems: "center",
    
    },

    caption:
    {
        color: '#112A46'
    }
});
