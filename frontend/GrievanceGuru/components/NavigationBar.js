import { StyleSheet, View, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';


export default function NavigationBar() {
    return (

        
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.nav} onPress={() => alert("hi")}>
                <Ionicons name="chatbox-outline" size={32} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nav} onPress={() => alert("hi")}>
                <Ionicons name="people-outline" size={32} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nav}onPress={() => alert("hi")}>
                <Ionicons name="clipboard-outline" size={32} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nav} onPress={() => alert("hi")}>
                <Ionicons name="mic-outline" size={32} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar:
    {
        flexDirection: "row",    
        position: "relative"   
    },

    nav:
    {
        padding: 30,
        alignItems: "center"
    }
});
