import React, { useState, useEffect } from 'react';
import { Share, StyleSheet, SafeAreaView, Text, View, Button, FlatList, ScrollView } from 'react-native';
import { useTheme } from '../config/themeProvider';
import { openDatabase } from 'expo-sqlite';
import { FormScreen } from './Form';
import { EditScreen } from './Edit';

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
    const [forceUpdate] = useForceUpdate();

      //Loads the Json from the webservice 
      const loadJson = () => {
        fetch("https://stud.hosted.hr.nl/1017846/webservice/Gyms.json")
        .then (res => res.json())
        .then (data => setGyms(data.items))
        .catch(error => console.log(error))
      }
      
      //Re-render the page after deleting a note
      function useForceUpdate() {
        const [value, setValue] = useState(0);
        return [() => setValue(value + 1), value];
      }

       //Deletes the selected note
      const deleteNote = (noteId) => {
        db.transaction(
          (tx) => {
            tx.executeSql("delete from notes where id = ?", [noteId]);
            tx.executeSql("select * from notes", [], (_, { rows }) =>
              console.log(JSON.stringify(rows))
            );
          },
          null,
          forceUpdate
        );
      };

      //Share the selected message
      const onShare = async (noteText) => {
        try {
          const result = await Share.share({
            message: noteText,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

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

        //Checks if any notes are found, if not. Return nothing
        if (notes === null || notes.length === 0) {
          return null;
        }
        //Return all the found notes of that list item with the matching Id
        return (
          <View style={[styles.notes]}>
            {notes.map(({ id, itemId, noteText }) => (
              <View style={styles.note}>
                <Text style={[{color: theme.notesBox.textColor}]}>{noteText}</Text>
                <Button 
                  title='Edit'
                  color={theme.nav.backgroundColor}
                  onPress={() => navigation.navigate('Edit Note', { screen: EditScreen, id: id, noteText: noteText })} 
                  options={{ headerShown: false }}
                  />
                <Button 
                title="Delete" 
                color={theme.nav.backgroundColor}
                onPress={() => { 
                  deleteNote(id);
                }} 
              />
              <Button color={theme.nav.backgroundColor} onPress={() => {onShare(noteText);}} title="Share" />
            </View>
            ))}
          </View>
        )
      }
      
    useEffect(loadJson, [])

    //Render all the items using the fetched data
    const renderItem = ({ item }) => {
      return (
        <View style={[styles.item, { backgroundColor: theme.backgroundColor }]}>
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList data={Gyms} renderItem={renderItem} keyExtractor={({ id }) => id} />
    </View>
  </SafeAreaView>
  );
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  item: {
    textAlign: 'center',
    padding: 5,
    margin: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  notes: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  note: {
    flexDirection: "row",
    padding: 5,
  },
  });

//Export the GymScreen so it can be called by the navigation 
export {GymScreen};
