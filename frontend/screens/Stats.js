import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView,Pressable } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import Pie from '../components/Pie';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from "@react-navigation/native";

const Stats = () => {
  const navigation = useNavigation();

  return (
    <View>
    <View style={styles.backbutton}>
    <Pressable
        onPress={() => {
            navigation.goBack()
        }}>    
       <Ionicons name="arrow-back-outline" size={32} color="white" />
    </Pressable>
    </View>
    <ScrollView style={{backgroundColor:"#F1EBE5"}}>
      <View style={{
        justifyContent:'center',
        alignItems:'center',
        marginTop:70,
        marginBottom:-40
      }}>
          <Text style={{fontSize:40,fontWeight:'bold'}}>Statistics</Text>
      </View>
     <Pie attribute={"total_receipts_01_01_2016_to_01_11_2019_"} title={"Total receipts 01-01-2016 to 01-11-2019"} />
     <Pie attribute={"total_disposal_01_01_2016_to_01_11_2019_"} title={"Total disposal 01-01-2016 to 01-11-2019"} />
     <Pie attribute={"pending_less_than_2_months"} title={"Pending less than 2 months"} />
     <Pie attribute={"pending_between_2_to_6_months"} title={"Pending between 2 to 6 months"} />
     <Pie attribute={"pending_between_6_to_12_months"} title={"Pending between 6 to 12 months"} />
     <Pie attribute={"pending_more_than_1_year"} title={"Pending more than 1 year"} />
     
     
   
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backbutton: {
    
    position: 'absolute', // Position the button absolutely
    top: 70,
    left: 10,
    zIndex: 1, // Ensure the button appears above other elements
    backgroundColor: '#112A46',
    borderRadius: 20,
    padding: 10,
  
},
});

export default Stats;
