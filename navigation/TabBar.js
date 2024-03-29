import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../config/themeProvider';
import Tab from './Tab';

const { width } = Dimensions.get('screen');

//loads the tabBar
const TabBar = ({ state, navigation }) => {
  const [selected, setSelected] = useState('Home');
  const { theme } = useTheme();
  const { routes } = state;
  const renderColor = currentTab =>
    currentTab === selected ? theme.nav.active : theme.nav.inActive;

  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  //returns the navigation
  return (
    <View style={{ position: 'absolute', bottom: 0, width: width}}>
      <View
        style={[
          styles.container,
          { backgroundColor: theme.nav.backgroundColor },
        ]}
      >
        {routes.map((route, index) => (
          <Tab
            tab={route}

            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

});

//exports the TabBar
export default TabBar;