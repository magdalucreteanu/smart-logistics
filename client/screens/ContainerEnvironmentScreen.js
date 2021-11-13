import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ECharts } from "react-native-echarts-wrapper";

const ContainerEnvironmentScreen = ({ route, navigation }) => {

    const { measurements } = route.params;

    const optionTemperature = {
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

    const optionHumidity = {
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

    measurements.forEach(element => {
        // Temperatur Diagramm
        optionTemperature.xAxis.data.push(element.date);
        optionTemperature.series[0].data.push(element.temperature);
        // Feuchtigkeit Diagramm
        optionHumidity.xAxis.data.push(element.date);
        optionHumidity.series[0].data.push(element.humidity);
    });

    return (
        <View style={styles.chartContainer}>
            <ECharts
            option={optionTemperature}
            backgroundColor="rgba(93, 169, 81, 0.3)"
            />
            <ECharts
            option={optionHumidity}
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