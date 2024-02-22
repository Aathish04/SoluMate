import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import NavigationBar from '../components/NavigationBar';
import { useNavigation } from '@react-navigation/native';

export default function Stats() {
    const data = {
        labels: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
        datasets: [
            {
                data: [1, 2, 3, 4, 1]
            }
        ]
    };

    const chartConfig = {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    };

    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <NavigationBar /> {/* Ensure NavigationBar is properly defined or imported */}
            <Text style={styles.header}>Regional Data</Text>
            <BarChart
                data={data}
                width={screenWidth - 16} // Adjusted for some padding
                height={220}
                yAxisLabel=""
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                fromZero={true}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    marginLeft: 8, // Adding left margin to align with the adjusted width
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
});
