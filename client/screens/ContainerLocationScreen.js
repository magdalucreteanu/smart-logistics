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
        this.state.markers.push({
            key: index,
            coordinates: {
                latitude: element.latitude,
                longitude: element.longitude,
                latitudeDelta: 2,
                longitudeDelta: 2,
            }
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
                        coordinate={marker.coordinates}
                        pinColor="green"
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