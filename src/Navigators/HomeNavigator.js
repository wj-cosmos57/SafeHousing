import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import HomeScreen from '../screens/HomeScreen';
import RealEstateSearchScreen from '../screens/RealEstateSearchScreen';
import RealEstateSearchDetailScreen from '../screens/RealEstateSearchDetailScreen';
import CorporationSearchScreen from '../screens/CorporationSearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import RegistryIssuanceLoadingScreen from '../screens/RegistryIssuanceLoadingScreen';

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
        name="RealEstateSearchDetailScreen"
        component={RealEstateSearchDetailScreen}
      />
      <Stack.Screen
        name="CorporationSearchScreen"
        component={CorporationSearchScreen}
      />
      <Stack.Screen name="SearchResultScreen" component={SearchResultScreen} />
      <Stack.Screen
        name="RegistryIssuanceLoadingScreen"
        component={RegistryIssuanceLoadingScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
