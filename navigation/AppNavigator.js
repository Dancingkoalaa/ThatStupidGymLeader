import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from './TabBar';

import { HomeScreen } from '../Views/Home';
import { MapScreen } from '../Views/Map';
import { GymScreen } from '../Views/GymsList';
import { Settings } from '../Views/Settings';
import { FormScreen } from '../Views/Form';
import { EditScreen } from '../Views/Edit';

const Tab = createBottomTabNavigator();

//Loads the navigation which is visible on all screens
export function AppNavigator() {
  return (
    //* using a tab navigator to navigate
    <Tab.Navigator tabBar={props => <TabBar {...props} state={{...props.state, routes: props.state.routes.slice(0,4)}} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
      />
      <Tab.Screen
        name="Gyms"
        component={GymScreen}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        />
      <Tab.Screen 
        name="Add note" 
        component={FormScreen} 
      />
      <Tab.Screen
        name="Edit Note"
        component={EditScreen}
        />
    </Tab.Navigator>
  );
}