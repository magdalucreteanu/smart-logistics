import React, {useLayoutEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { ECharts } from "react-native-echarts-wrapper";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import { useTheme } from '@react-navigation/native';

const ContainerEnvironmentScreen = ({ route, navigation }) => {

    const { colors } = useTheme();

    // Navigation Header bearbeiten
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: 'Environment',
          headerRight: () => (
            <View style={{flexDirection:'row'}}>
            <Button
              type= 'clear'
              icon={<Ionicons name = 'home' size = {32} color = {Colors.headerIconColor} />}
              onPress={() => navigation.navigate('Home')}
            />
            <Button
              type= 'clear'
              icon={<Ionicons name = 'settings' size = {32} color = {Colors.headerIconColor} />}
              onPress={() => navigation.navigate('Settings')}
            />
            </View>
          ),
        });
      }, [navigation]);

    // die Measurements wurden im vorherigen Screend geladen
    // und wurden an diesem Screen weitergegeben
    const { measurements } = route.params;

    // die Konfiguration des Temperatur Diagramms
    const optionTemperature = {
            // Diagram Titel
        title: {
            text: 'Temperature',
            //subtext: 'subtext here',
            left: 'center'
        },
        // die Definition für die x Achse
        xAxis: {
            type: "category",
            // die Daten für die X Achse werden in diesem Array geladen
            // die sind die Werte mit dem Datum der Messungen
            data: []
        },
        // die Definition für die y Achse
        yAxis: {
            type: "value",
            // Zeigt wie die Werte auf der Y Ache formatiert werden
            // die Temperaturen werden als Zahlen geladen
            // aber auf der Y Achse mit °C erweitert
            // Z.B. die Temperatur 50 wird auf der Y Achse als 50°C angezeigt
            axisLabel: {
                formatter: '{value} °C'
            },
            // zeigt eine düne Linie wenn eine Messung ausgewählt wurde
            splitLine: {
                show: true
            }
        },
        // hier wird die Anzeige der Messungen konfiguriert
        series: [
            {
                // die Temperaturen als Zahlen werden in diesem Array geladen
                data: [],
                // unser Diagramm ist eine Linie
                type: "line",
                // hier werden Markers für zwei Punkte angezeigt
                // in diesem Fall der maximale und der minimale Wert
                markPoint: {
                    data: [
                      { type: 'max', name: 'Max' },
                      { type: 'min', name: 'Min' }
                    ]
                },
                // wir zeigen eine zusätzliche Linie
                markLine: {
                    // der wert wird formatiert
                    // Z.B. wert = 50 wird als 50°C angezeigt
                    label: {
                        formatter: '{c} °C'
                    },
                    // die Linie wird sich aus Average für die Messungen ergeben
                    data: [{ type: 'average', name: 'Avg' }]
                }
            }
        ],
        // wir wollen das ein Tooltip angezeigt wird
        // wann der User eine Messung ausgewählt hat
        tooltip: {
            // das soll auf die Achse angezeigt werden
            trigger: 'axis'
        },
        // Toolbox enthält einige Icons mit zusätzlichen Funktionalitäten
        // und wird oben rechts angezeigt
        toolbox: {
            // das Toolbox wird standardmäßig angezeigt
            show: true,
            // hier wird das Toolbox konfiguriert
            feature: {

                // die ersten Icons
                magicType: {
                    title: {
                        // Titel für die Icons
                        line: 'Switch to Line Chart',
                        bar: 'Switch to Bar Chart'
                    },
                    // mit dem Klick auf dem Icon wird das Diagramm
                    // in einer Line Chart umgewandelt
                    // oder in einer Bar Chart umgewandelt
                    type: ['line', 'bar']
                },
                // Zoom
                dataZoom: {
                    yAxisIndex: 'display',
                    title: {
                        zoom: 'Zoom',
                        back: 'Back'
                    }
                },
                // ein Restore icon
                // bringt das Diagramm in initialem Zustand
                restore: {
                    title: 'Restore'
                }
            }
        }
    };

    // die Konfiguration des Feuchtigkeit Diagramms
    // Konfigurationsparameter werden wie in Temperatur Diagramm definiert
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
                dataZoom: {
                    yAxisIndex: 'display',
                    title: {
                        zoom: 'Zoom',
                        back: 'Back'
                    }
                },
                restore: {
                    title: 'Restore'
                }
            }
        }
    };

    // die geladenen Messungen werden für die Diagramme vorbereitet
    measurements.forEach(element => {
        // Temperatur Diagramm
        // die Daten für die X Achse
        // das ist ein Array mit dem Datum der Messungen
        optionTemperature.xAxis.data.push(element.date);
        // die Daten für die Y Achse
        // das ist ein Array mit den Temperaturen
        optionTemperature.series[0].data.push(element.temperature);
        
        // Feuchtigkeit Diagramm
        // die Daten für die X Achse
        // das ist ein Array mit dem Datum der Messungen
        optionHumidity.xAxis.data.push(element.date);
        // die Daten für die Y Achse
        // das ist ein Array mit den Feuchtigkeiten
        optionHumidity.series[0].data.push(element.humidity);
    });

    return (
        // die Diagramme werden hier gerendert.
        // Mit option={optionTemperature} oder option={optionHumidity}
        // werden die Diagramme mit den oben definierten
        // Konfigurationen initialisiert.
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