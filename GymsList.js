import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, StatusBar, FlatList } from 'react-native';
import { useTheme } from './config/themeProvider';

export function GymScreen() {
  const { theme } = useTheme();

    const [Gyms, setGyms] = useState([])  

      //Loads the Json from the webservice 
      const loadJson = () => {
        fetch("https://stud.hosted.hr.nl/1017846/webservice/Gyms.json")
        .then (res => res.json())
        .then (data => setGyms(data.items))
        .catch(error => console.log(error))
      }

    useEffect(loadJson, [])

    const renderItem = ({ item }) => {
      return (
        <View>
          <Text> { item.title } </Text>
          <Text> { item.description } </Text>
        </View>
      )
    };

  return (
    <SafeAreaView
    style={[styles.container, { backgroundColor: theme.backgroundColor }]}
  >
    <View>
      <FlatList data={Gyms} renderItem={renderItem} keyExtractor={({ id }) => id} />
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  });
