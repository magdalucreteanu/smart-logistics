import React, { useEffect } from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import { ECharts } from "react-native-echarts-wrapper";

// Constants
import { serverAddress } from '../constants/Server';

const ContainerEnvironmentScreen = ({ navigation }) => {

    optionTemperature = {
        title: {
            text: 'Temperature',
            //subtext: 'subtext here',
            left: 'center'
        },
        xAxis: {
            type: "category",
            data: []
        },
        yAxis: {
            type: "value",
            axisLabel: {
                formatter: function (val) {
                    return val + '°C';
                }
            },
        },
        series: [
            {
                data: [],
                type: "line"
            }
        ]
    };

    optionHumidity = {
        title: {
            text: 'Humidity',
            //subtext: 'subtext here',
            left: 'center'
        },
        xAxis: {
            type: "category",
            data: []
        },
        yAxis: {
            type: "value",
            axisLabel: {
                formatter: function (val) {
                    return val + '%';
                }
            },
        },
        series: [
            {
                data: [],
                type: "line"
            }
        ]
    };

    loadMeasurements = async () => {
        try {
            let response = await fetch(serverAddress() + '/measurements');
            let json = await response.json();

            json.forEach(element => {
                // Temperatur Diagramm
                this.optionTemperature.xAxis.data.push(element.date);
                this.optionTemperature.series[0].data.push(element.temperature);
                // Feuchtigkeit Diagramm
                this.optionHumidity.xAxis.data.push(element.date);
                this.optionHumidity.series[0].data.push(element.humidity);
            });
        } catch (error) {
            Alert.alert('Error:', error.message);
        }
      }

    useEffect(() => {
        loadMeasurements();
    }, []);

    return (
        <View style={styles.chartContainer}>
            <ECharts
            option={this.optionTemperature}
            backgroundColor="rgba(93, 169, 81, 0.3)"
            />
            <ECharts
            option={this.optionHumidity}
            backgroundColor="rgba(93, 169, 81, 0.3)"
            />
        </View>
    );
 
};

const styles = StyleSheet.create({
    chartContainer: {
      flex: 1
    }
});

export default ContainerEnvironmentScreen;