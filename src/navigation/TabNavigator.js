/* eslint-disable prettier/prettier */
import React from 'react';
import RemindersScreen from '../screens/Reminders';
import PrioritiesScreen from '../screens/Priorities';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigator = props => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#f15454',
        tabBarLabelStyle: {
          flex: 1,
          fontSize: 15,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 12,
        },
        tabBarStyle: {display: 'flex'},
        tabBarIconStyle: {display: 'none'},
      }}>
      <Tab.Screen name={'Reminder'} component={RemindersScreen} />
      <Tab.Screen name={'Priorities'} component={PrioritiesScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
