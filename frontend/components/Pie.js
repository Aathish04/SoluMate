import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const Pie = ({ attribute, title }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.data.gov.in/resource/1d369aae-155a-4cc8-b7a8-04d4cd5ec2a6?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&limit=20');
        const myjson = await response.json();
        const data = myjson.records;

        const pieChartColors = [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#4D5360', '#F7464A', '#46BFBD', '#FDB45C',
          '#949FB1', '#D4CCC5', '#5AD3D1', '#AC64AD', '#EC2500',
          '#5A0FD1', '#00D084', '#F17CB0', '#B2912F', '#B276B2',
        ];

        const pieChartData = data.map((item, index) => ({
          name: item.ministry_department_state,
          population: parseInt(item[attribute], 10),
          color: pieChartColors[index % pieChartColors.length],
        }));

        setChartData(pieChartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <View style={{margin: 20, marginTop:100}}>
        
      <Text style={styles.title}>{title}</Text>
      <PieChart
        data={chartData}
        width={660}
        height={220}
        
        chartConfig={{
          backgroundColor: 'transparent',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
       
        center={[10, 10]}
        absolute
      />
      {/* Custom Legend */}
      <View style={styles.legend}>
        {chartData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorSwatch, { backgroundColor: item.color }]} />
            <Text style={styles.legendLabel}>{item.name}</Text>
          </View>
        ))}
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  legend: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'left',
    marginTop: 20,
    alignContent:'left',
    alignItems: 'left',
    marginLeft:70,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'left',
    marginHorizontal: 5,
    marginBottom: 5,
    justifyContent: 'left',
    alignContent:'left',

  },
  colorSwatch: {
    width: 14,
    height: 14,
    marginRight: 5,
    borderRadius: 7, // Makes the swatch circular
  },
  legendLabel: {
    fontSize: 12,
  },
});

export default Pie;
