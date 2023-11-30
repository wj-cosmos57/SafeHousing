import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import HomeScreen from '../screens/HomeScreen';
import RealEstateSearchScreen from '../screens/RealEstateSearchScreen';
import RealEstateSearchResultScreen from '../screens/RealEstateSearchResultScreen';

const Stack = createNativeStackNavigator();

// createNativeStackNavigator() : 스택 네비게이션

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="RealEstateSearchScreen"
        component={RealEstateSearchScreen}
      />
      <Stack.Screen
        name="RealEstateSearchResultScreen"
        component={RealEstateSearchResultScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeNavigator;
