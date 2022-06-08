import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, View, Dimensions } from 'react-native';

export function MapScreen({ route }) {
  const [initialRegion, setInitialRegion] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
  });
  const [location, setLocation] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
  });
  useEffect(() => {
      (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
          }
          
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location.coords);
      })();
  }, []);
  return (
      <View>
          <MapView
              style={styles.map} 
              region={{
                  latitude: 51.934119,
                  longitude: 4.488619,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
              }}
              initialRegion={initialRegion}
          >   
              {/* <Marker
                  key="End User Location"
                  coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                  title="End User Location"
              /> */}
          </MapView>
      </View>
      
  );
  }
  const styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }
  });