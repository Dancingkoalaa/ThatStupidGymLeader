import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Button, FlatList, ScrollView } from 'react-native';
import { useTheme } from './config/themeProvider';
import { openDatabase } from 'expo-sqlite';
import { FormScreen } from './Form';

//opens the database on the device
function openDB() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }
  const db = openDatabase("db.db");
  return db;
  }
  const db = openDB();

//loads all list items on the screen
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

      const RenderNotes = ({ data }) => {
        const [notes, setNotes] = useState(null);
        //Getting the data from the database where itemId is wqual to the list id
        useEffect(() => {
          db.transaction((tx) => {
            tx.executeSql("select * from notes where itemId = ?", 
            [data], 
            (_, { rows: { _array } })  => setNotes(_array)
            );
          });
        }, []);
        //Found nothing? Then return nothing
        if (notes === null || notes.length === 0) {
          return null;
        }
        //Return all the found notes of that list item id
        return (
          <View style={[styles.notes]}>
            {notes.map(({ id, itemId, noteText }) => (
                <Text style={[{color: theme.notesBox.textColor}]}>{noteText}</Text>
            ))}
          </View>
        )
      }
      
    useEffect(loadJson, [])

    const renderItem = ({ item }) => {
      return (
        <View>
          <ScrollView>
          <Text style={[styles.title, { color: theme.textColor }]}> { item.title } </Text>
          <Text style={[styles.title, { color: theme.textColor }]}> { item.description } </Text>
          <Button 
          title='Add a note'
          color={theme.nav.backgroundColor}
          onPress={() => navigation.navigate('Add note', { screen: FormScreen, id: item.id, title: item.title})} 
          options={{ headerShown: false }}
        />
        <Text style={[styles.title, { color: theme.textColor }]}>Notes</Text>
        <ScrollView>
          <RenderNotes 
          data={item.id} 
          />
        </ScrollView>
        </ScrollView> 
        </View>
      )
    };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
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
