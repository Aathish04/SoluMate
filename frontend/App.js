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
import Profile from './screens/Profile.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebaseConfig';
import { useEffect,useState} from 'react';
import { ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [initialRouteName, setInitialRouteName] = useState('Login'); // Default to 'Login'
  const [loading,setLoading]= useState(false)

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        //setLoading(false);
    } else {
        setUser(null);
    }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Render loading screen while checking auth status
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:"#F1EBE5" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        ...TransitionPresets.ModalFadeTransition, // Apply smooth slide transition
      }}>
      {!user ? (
        <>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
           <Stack.Screen name='SignUp' component={SignUpScreen} options={{headerShown: false}}/>
     
    </>
      ):(
        <>
         <Stack.Screen name='Home' component={HomePage} options={{headerShown: false}}/>
        <Stack.Screen name='Chat' component={ChatPage} options={{headerShown: false}}/>
        <Stack.Screen name='Voice' component={Voice} options={{headerShown: false}}/>
        <Stack.Screen name='Community' component={Community} options={{headerShown:false}}/>
        <Stack.Screen name='Profile' component={Profile} options={{headerShown:false}}/>
       </>
      )}
   </Stack.Navigator>
      
     
  
    </NavigationContainer>
  );
}


