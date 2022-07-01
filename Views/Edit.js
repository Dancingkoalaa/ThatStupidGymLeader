import { useState, useEffect } from 'react';
import { Button, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../config/themeProvider';
import { openDatabase } from 'expo-sqlite';

import { GymScreen } from "./GymsList";

//Open the database on the device
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

//The Edit view to load in
const EditScreen = ({ navigation }) => {
    const route = useRoute();
    const {theme} = useTheme();
    const { screen, id, noteText } = route.params;
    const [text, setText] = useState(null);
  
    //If the text is empty, don't update the database
    const update = (text) => {
      if (text === null || text === "") {
        return false;
      }
  
      //Otherwise update the text in the database
      db.transaction(
        (tx) => {
          tx.executeSql("update notes set noteText = ? where id = ?;`", [text, id]);
          tx.executeSql("select * from notes", [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
          );
        },
        null
      );
    };
  
    //Return the Edit view so the user can fill the form in
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View>
                {Platform.OS === "web" ? (
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Text style={styles.heading}>
                    Expo SQlite is not supported on web!
                    </Text>
                </View>
                ) : (
                <>
                    <View style={styles.flexRow}>
                      <Text></Text>
                    <TextInput
                        onChangeText={(text) => setText(text)}
                        placeholder={noteText}
                        style={[styles.input, {backgroundColor: theme.input.backgroundColor}, {color: theme.input.textColor}]}
                        value={text}
                    />
                    <Button 
                        title="Save" 
                        color={theme.nav.backgroundColor}
                        onPress={() => { 
                          update(text);
                          setText(null);
                        }} 
                    />
                   <Button
                    title="Go back"
                    color={theme.nav.backgroundColor}
                    onPress={() => navigation.navigate('Gyms', { screen: GymScreen})}
                    options={{ headerShown: false}}
                    />
                    </View>
                </>
                )}
            </View>
        </SafeAreaView>
    );
}

//Styling
const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
});

//Export the Form so it can be called by the navigation 
export {EditScreen};