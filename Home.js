import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

export function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <StatusBar style="auto" />
        <Button
          title="Press me"
          color="#f194ff"
          onPress={() => Alert.alert('Why is it always the same trainer that kicks me out!!')}
        />
      </View>
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
  