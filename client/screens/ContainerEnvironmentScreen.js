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
                formatter: '{value} °C'
            },
            splitLine: {
                show: true
            }
        },
        series: [
            {
                data: [],
                type: "line",
                markPoint: {
                    data: [
                      { type: 'max', name: 'Max' },
                      { type: 'min', name: 'Min' }
                    ]
                },
                markLine: {
                    label: {
                        formatter: '{c} °C'
                    },
                    data: [{ type: 'average', name: 'Avg' }]
                }
            }
        ],
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            show: true,
            feature: {
                magicType: {
                    title: {
                        line: 'Switch to Line Chart',
                        bar: 'Switch to Bar Chart'
                    },
                    type: ['line', 'bar']
                },
                restore: {
                    title: 'Restore'
                }
            }
        }
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
                formatter: '{value} %'
            },
            splitLine: {
                show: true
            }
        },
        series: [
            {
                data: [],
                type: "line",
                markPoint: {
                    data: [
                      { type: 'max', name: 'Max' },
                      { type: 'min', name: 'Min' }
                    ]
                },
                markLine: {
                    label: {
                        formatter: '{c} %',
                    },
                    data: [{ type: 'average', name: 'Avg' }]
                }
            }
        ],
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            show: true,
            feature: {
                magicType: {
                    title: {
                        line: 'Switch to Line Chart',
                        bar: 'Switch to Bar Chart'
                    },
                    type: ['line', 'bar']
                },
                restore: {
                    title: 'Restore'
                }
            }
        }
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
            backgroundColor="rgba(0, 0, 0, 0.1)"
            />
            <ECharts
            option={optionHumidity}
            backgroundColor="rgba(0, 0, 0, 0.1)"
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