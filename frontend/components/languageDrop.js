import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const languageDrop = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const fadeAnim = useRef(new Animated.Value(0)).current; // for fade-in animation
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

  const openPopup = () => {
    setShowPopup(true);
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const closePopup = () => {
    // Fade-out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowPopup(false);
    });
  };

  const renderLanguageOptions = () => {
    return languages.map((language, index) => (
      <Pressable key={index} style={styles.dropdownItem} onPress={() => setSelectedLanguage(language)}>
        <Text style={styles.dropdownItemText}>{language}</Text>
      </Pressable>
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {showPopup && (
        <Animated.View style={[styles.popup, {opacity: fadeAnim}]}>
          <View style={styles.popupContent}>
            <ScrollView style={styles.dropdown}>
              {renderLanguageOptions()}
            </ScrollView>
            <TouchableOpacity onPress={closePopup} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222222',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  languageButtonText: {
    color: '#FFFFFF',
  },
  popup: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  dropdown: {
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dropdownItemText: {
    fontSize: 18,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // ... Your existing styles ...
});

export default languageDrop;
