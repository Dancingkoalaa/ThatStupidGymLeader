import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useTheme } from './config/themeProvider';
import { HomeScreen } from "./Home";

const FormScreen = ({ navigation }) => {
    const route = useRoute();
    const {theme} = useTheme();
    const [text, onChangeText] = React.useState("");

    const { screen, id, title } = route.params;

    console.log(route.params)

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View>
                <Text style={[styles.title, { color: theme.textColor }]}>Voeg hier een notitie toe aan: {JSON.stringify(title)}</Text>
                <TextInput
                    style={[styles.input, {backgroundColor: theme.input.backgroundColor}, {color: theme.input.textColor}]}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Write your note here"
                />
                <Button title='Save' color="#575555" onPress={() => navigation.navigate('Home', { screen: HomeScreen})} options={{ headerShown: false }}/>
            </View>
        </SafeAreaView>
    );
}

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

export {FormScreen};