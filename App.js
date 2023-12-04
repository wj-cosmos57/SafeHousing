import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import RootNavigator from './src/Navigators/RootNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'blue',
          headerShown: false,
          tabBarStyle: {display: 'none'},
          unmountOnBlur: true,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Root"
          component={RootNavigator}
          options={{headerShown: false}} // 탭 네비게이터의 헤더 숨기기
        />
      </Stack.Navigator>
    </NavigationContainer>

    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //   <Text>Entry Point</Text>
    // </View>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
