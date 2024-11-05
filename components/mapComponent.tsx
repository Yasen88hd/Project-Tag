import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { View, StyleSheet } from 'react-native';

// Set the access token for Mapbox GL
MapboxGL.setAccessToken('YOUR_MAPBOX_ACCESS_TOKEN');

const MapComponent: React.FC = () => {
  
  return (
    <View style={styles.page}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={9}
          centerCoordinate={[-74.5, 40]} // Set initial coordinates [longitude, latitude]
        />
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapComponent;
