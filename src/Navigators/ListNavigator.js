import React from 'react';
import ListScreen from '../screens/ListScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ListNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ListScreen" component={ListScreen} />
    </Stack.Navigator>
  );
};

export default ListNavigator;
