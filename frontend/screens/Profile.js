import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../firebaseConfig';

export default function Profile() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);

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
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const signout = () => {
    signOut(auth).then(() => {
      navigation.replace('Login');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="arrow-back-outline" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* Your content here */}
        <TouchableOpacity style={styles.logoutButton} onPress={signout}>
          <Text style={styles.buttonText}>LOG OUT</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>OpenHacks - © 2024 Solumate</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1EBE5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
      },
  headerText: {
    color: 'black',
    marginLeft: 150,
    marginTop:60,
    fontSize: 20,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 10,
    backgroundColor: '#112A46',
    borderRadius: 20,
    padding: 10,
},
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: '#112A46',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  footer: {
    backgroundColor: '#222222',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
  },
});
