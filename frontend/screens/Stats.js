import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Pie from '../components/Pie';

const Stats = () => {


  return (
    <ScrollView>
     <Pie attribute={"total_receipts_01_01_2016_to_01_11_2019_"} title={"Total receipts 01-01-2016 to 01-11-2019"} />
     <Pie attribute={"total_disposal_01_01_2016_to_01_11_2019_"} title={"Total disposal 01-01-2016 to 01-11-2019"} />
     <Pie attribute={"pending_less_than_2_months"} title={"Pending less than 2 months"} />
     <Pie attribute={"pending_between_2_to_6_months"} title={"Pending between 2 to 6 months"} />
     <Pie attribute={"pending_between_6_to_12_months"} title={"Pending between 6 to 12 months"} />
     <Pie attribute={"pending_more_than_1_year"} title={"Pending more than 1 year"} />
     
     
   
    </ScrollView>
  );
};


export default Stats;
