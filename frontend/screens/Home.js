import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationBar from '../components/NavigationBar';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
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

      <View style={styles.content}>
       <NavigationBar/>
      </View>
      <View style={styles.navigationBar}>
       
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>OpenHacks - © 2024 Solumate</Text>
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
