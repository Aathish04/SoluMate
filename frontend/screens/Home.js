import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationBar from '../components/NavigationBar';
import { useNavigation } from '@react-navigation/native';
import {useState,useEffect} from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../firebaseConfig';

const HomePage = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState('');

  

  return (

    <View style={styles.container}>


      <View style={styles.content}>
       <NavigationBar/>
      </View>
      <View style={styles.navigationBar}>
       
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>OpenHack - © 2024 Solumate</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1EBE5',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      
      paddingHorizontal: 20,
    },
    footer: {
      backgroundColor: '#222222',
      padding: 10,
      alignItems: 'center',
    },
    footerText: {
      color: 'white',
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
  

export default HomePage;
