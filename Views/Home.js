import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import { useTheme } from '../config/themeProvider';

//the home view that will be loaded
const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();

    return (
      <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[styles.title, { color: theme.textColor }]}>That Stupid Gymleader!!!</Text>
        <StatusBar style="auto" />
        <Button
          title="Press me"
          color={theme.nav.backgroundColor}
          onPress={() => Alert.alert('NO ITS MY GYM STOP IT')}
        />
      </View>
      </SafeAreaView>
    );
  }
  
  //Styling
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
//Export the HomeScreen so it can be called by the navigation   
export { HomeScreen };
