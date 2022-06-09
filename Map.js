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
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0200,
                  longitudeDelta: 0.0200
              }}
              initialRegion={initialRegion}
          >   
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title='You' />
          <Marker coordinate={{ latitude: 52.020477, longitude: 4.277985 }} title='Gym: Pink Ribbon' />
          <Marker coordinate={{ latitude: 52.023045, longitude: 4.272941 }} title='Gym: Korenmolen Windlust' />
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