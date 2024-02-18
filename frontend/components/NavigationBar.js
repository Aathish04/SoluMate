import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function NavigationBar() {

    const navigation = useNavigation()
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
