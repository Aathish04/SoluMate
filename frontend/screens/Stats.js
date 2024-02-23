import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const Stats = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.data.gov.in/resource/1d369aae-155a-4cc8-b7a8-04d4cd5ec2a6?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&limit=20');
        const myjson = await response.json();
        const data = myjson.records;
        
        setChartData({
          labels: data.map(item => item.ministry_department_state),
          datasets: [{
            data: data.map(item => item.total_pending_as_on_01_11_2019),
            
          }],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call fetchData function when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Pending Cases by Ministry/Department</Text>
      {chartData.labels && chartData.datasets ? (
        <BarChart
        data={chartData}
        width={400}
        height={700}
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: '#FFFFFF',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          fromZero: true, // Start y-axis from zero
          propsForVerticalLabels: {
            rotation: -90, // Rotate the labels by -45 degrees
            fontSize: 8,
            fontWeight: 900, // Adjust the font size of the labels
            yOffset: 3, // Adjust the vertical offset of the labels
            dx: -30, // Adjust the horizontal offset of the labels
           
            

          },
          barPercentage:0.8
        }}
        style={styles.chart}
      />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    
    
  },
});

export default Stats;
