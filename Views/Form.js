import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../config/themeProvider';
import { GymScreen } from './GymsList';
import * as SQLite from 'expo-sqlite';

//opens database on the device
function openDatabase() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }
    const db = SQLite.openDatabase("db.db");
    return db;
  }
const db = openDatabase();

//the form view that will be loaded
const FormScreen = ({ navigation }) => {
    const route = useRoute();
    const {theme} = useTheme();
    const { screen, id, title } = route.params;
    const [text, setText] = React.useState("");

    //checks if there is a table available, otherwise it will make a new one
    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists notes (id integer primary key not null, itemId int, noteText text);"
            );
        });
    }, []);

    //checks if the text is empty, and decides if it should be added to db
    const add = (text) => {
        //check if its filled
        if(text === null || text === "") {
            return false;
        }

        //if its filled, it will add all filled info into the DB
        db.transaction(
            (tx) => {
                tx.executeSql("insert into notes (itemId, noteText) values (?, ?)", [id, text]);
                tx.executeSql("select * from notes", [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
                );
            },
            null
        );
    };

    //render the form so users can fill it in
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View>
                <Text style={[styles.title, { color: theme.textColor }]}>Voeg hier een notitie toe aan: {JSON.stringify(title)}</Text>
                <TextInput
                    style={[styles.input, {backgroundColor: theme.input.backgroundColor}, {color: theme.input.textColor}]}
                    onChangeText={(text) => setText(text)} 
                    value={text}
                    placeholder="Write your note here"
                />
                <Button 
                    title="Save"
                    color={theme.nav.backgroundColor}
                    onPress={() => {
                        add(text);
                        setText(null)
                    }}
                />
                <Button
                    title="Go back"
                    color={theme.nav.backgroundColor}
                    onPress={() => navigation.navigate('Gyms', { screen: GymScreen})}
                    options={{ headerShown: false}}
                />
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
export {FormScreen};