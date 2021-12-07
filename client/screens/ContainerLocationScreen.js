import React, {useLayoutEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import { useTheme } from '@react-navigation/native';

const ContainerLocationScreen = ({ route, navigation }) => {

    const { colors } = useTheme();

    // die Measurements wurden im vorherigen Screen (ContainerDisplayScreen) geladen
    // Sie werden hier auf eine Karte angezeigt
    const { measurements } = route.params;

    this.state = {
        markers: [],
        polyline: []
    };

    // Navigation Header bearbeiten
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: 'Location',
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

    measurements.forEach((element, index) => {
        // description ist der Text der in Tooltip angezeigt wird
        // Die Temperatur und Feuchtigkeit werden angezeigt
        let description = element.temperature + '°C / ' + element.humidity + '%';
        // die Farbe des Markers - bei uns grün
        let pinColor = 'green';
        if (index === 0 || index === measurements.length - 1) {
            // für das erste und letzte MArker in der Liste setzen wir die Farbe Rot
            pinColor = 'red';
        }
        // hier werden die markers erstellt
        this.state.markers.push({
            // index - um das Marker eindeutig zu identifizieren
            key: index,
            // Coordinates - latitude/longitude
            // die Dalta Felder werden als Zoom Faktor benutzt
            coordinates: {
                latitude: element.latitude,
                longitude: element.longitude,
                latitudeDelta: 2,
                longitudeDelta: 2,
            },
            // Title des Tooltips - das Datum der Messung
            title: element.date,
            // Text in Tooltip - Temperatur und Feuchtigkeit
            description: description,
            // Farbe des MArkers
            pinColor: pinColor
        });

        // Hier wird die Linie erstellt
        this.state.polyline.push({
            // 
            latitude: element.latitude,
            longitude: element.longitude,
        });
    });

    return (
        // Karte wird mit MapView gerendert
        // Marker wird mit MapView.Marker gerendert
        // Linie wird mit MapView.Polyline gerendert
        <View style={styles.mapContainer}> 
            <MapView
                style = {styles.map}
                initialRegion = {this.state.markers[0].coordinates}
            >
                {this.state.markers.map(marker => (
                    <MapView.Marker
                        key={marker.key}
                        title={marker.title}
                        description={marker.description}
                        coordinate={marker.coordinates}
                        pinColor={marker.pinColor}
                    />
                ))}
                {<MapView.Polyline
                    coordinates={this.state.polyline}
                    strokeColor={"#000"}
                    strokeWidth={3}
                    lineDashPattern={[1]}
                />}
            </MapView>
        </View>
    );
    
};

const styles = StyleSheet.create({
    mapContainer: {
      flex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default ContainerLocationScreen;