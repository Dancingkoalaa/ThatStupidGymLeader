import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, View, Dimensions } from 'react-native';


export function MapScreen({ route }) {
  //makes a start region for the map to load
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

  const [markers, setMarkers] = useState([])

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

  const loadJson = () => {
    fetch("https://stud.hosted.hr.nl/1017846/webservice/Gyms.json")
    .then (res => res.json())
    .then (data => setMarkers(data.items))
    .catch(error => console.log(error))
  }

  const markerItems = markers.map((marker, index) => {
    return <Marker
      key={index}
      coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
      title={marker.title}
      description={marker.description}
    >
    </Marker >
})
  useEffect(loadJson, [])
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
          {markerItems}
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