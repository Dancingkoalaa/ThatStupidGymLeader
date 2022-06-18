import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Button, FlatList } from 'react-native';
import { useTheme } from './config/themeProvider';
import { FormScreen } from './Form';

const GymScreen = ({ navigation }) => {
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
          <Text style={[styles.title, { color: theme.textColor }]}> { item.title } </Text>
          <Text style={[styles.title, { color: theme.textColor }]}> { item.description } </Text>
          <Button 
          title='Add a note'
          color={theme.nav.backgroundColor}
          onPress={() => navigation.navigate('Add note', { screen: FormScreen, id: item.id, title: item.title})} 
          options={{ headerShown: false }}
        />
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

export {GymScreen};
