import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ECharts } from "react-native-echarts-wrapper";

const ContainerEnvironmentScreen = ({ navigation }) => {

    optionTemperature = {
        title: {
            text: 'Temperatures',
            //subtext: 'subtext here',
            left: 'center'
        },
        xAxis: {
            type: "category",
            data: ["11 Sep", "21 Sep", "03 Oct", "14 Oct", "31 Oct", "01 Nov", "07 Nov"]
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
                data: [10, 15, 12, 11, 18, 16, 11],
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
            data: ["11 Sep", "21 Sep", "03 Oct", "14 Oct", "31 Oct", "01 Nov", "07 Nov"]
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
                data: [40, 45, 48, 52, 46, 45, 49],
                type: "line"
            }
        ]
    };


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