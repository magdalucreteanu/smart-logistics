import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const ContainerLocationScreen = ({ route, navigation }) => {

    const { measurements } = route.params;

    this.state = {
        markers: [],
        polyline: []
    };

    measurements.forEach((element, index) => {
        let description = element.temperature + '°C / ' + element.humidity + '%';
        let pinColor = 'green';
        if (index === 0 || index === measurements.length - 1) {
            pinColor = 'red';
        }
        this.state.markers.push({
            key: index,
            coordinates: {
                latitude: element.latitude,
                longitude: element.longitude,
                latitudeDelta: 2,
                longitudeDelta: 2,
            },
            title: element.date,
            description: description,
            pinColor: pinColor
        });
        this.state.polyline.push({
            latitude: element.latitude,
            longitude: element.longitude,
        });
    });

    return (
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