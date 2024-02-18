import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Pressable} from 'react-native';
import NavigationBar from './components/NavigationBar';
import SignUpScreen from './screens/Signup.js';
import LoginScreen from './screens/Login.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import ChatPage from './screens/ChatPage.js';
import HomePage from './screens/Home.js';
import Voice from './screens/Voice.js';
import Community from './screens/CommunityPage.js';


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.ModalFadeTransition, // Apply smooth slide transition
      }}>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Chat' component={ChatPage} options={{headerShown: false}}/>
        <Stack.Screen name='SignUp' component={SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={HomePage} options={{headerShown: false}}/>
        <Stack.Screen name='Voice' component={Voice} options={{headerShown: false}}/>
        <Stack.Screen name='Community' component={Community} options={{headerShown:false}}/>
      </Stack.Navigator>
      
     
  
    </NavigationContainer>
  );
}


