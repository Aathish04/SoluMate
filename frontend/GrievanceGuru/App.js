import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Pressable} from 'react-native';

import NavigationBar from './components/NavigationBar';
import SignUpScreen from './screens/Signup.js';
import LoginScreen from './screens/Login.js';


export default function App() {
  return (
    <View style={styles.container}>
      
   
    <LoginScreen/>
     
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
    
  },
  main:
  {
    backgroundColor: 'green'
  },
 
});
