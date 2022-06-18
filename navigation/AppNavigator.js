import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from './TabBar';

import { HomeScreen } from '../Home';
import { MapScreen } from '../Map';
import { GymScreen } from '../GymsList';
import { Settings } from '../Settings';
import { FormScreen } from '../Form';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  return (
    //* using a tab navigator to navigate
    <Tab.Navigator tabBar={props => <TabBar {...props} state={{...props.state, routes: props.state.routes.slice(0,4)}} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Gyms"
        component={GymScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        />
      <Tab.Screen 
        name="Add note" 
        component={FormScreen} 
      />
    </Tab.Navigator>
  );
}