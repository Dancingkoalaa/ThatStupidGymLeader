import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import { useTheme } from './config/themeProvider';

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();

    return (
      <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[styles.title, { color: theme.textColor }]}>Home!</Text>
        <StatusBar style="auto" />
        <Button
          title="Press me"
          color={theme.nav.backgroundColor}
          onPress={() => Alert.alert('hiii')}
        />
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
  
export { HomeScreen };
