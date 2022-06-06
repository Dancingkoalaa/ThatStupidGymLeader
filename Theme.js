import React from 'react';
import { Text, Button, StyleSheet, View, } from 'react-native';
import { StatusBar } from 'expo-status-bar'; // automatically switches bar style based on theme!

export default function App() {
  let colorScheme = 'light';
  let number = 1;

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={[styles.text, themeTextStyle]}>Color scheme: {colorScheme}</Text>
      <Button
        title="Press me"
        onPress={() => {
            if(number = 1){
              number = 0
              colorScheme = 'dark'
              Alert.alert('test');
            } else {
              number = 1
              colorScheme = 'light'
              Alert.alert('test');
            }
        }}
        />
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
});