import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Screens
import HomeNavigator from './HomeNavigator';
import ListNavigator from './ListNavigator';
import SettingsNavigator from './SettingsNavigator';

const Tab = createBottomTabNavigator();

// createBottomTabNavigator() : 탭 네비게이션
// APP의 메인 Tab Navigator 역할.
// 각 탭은 다른 네비게이터(HomeNavigator, ListNavigator, SettingsNavigator)를 띄움.
// 각각의 네비게이터는 다시 여러 화면(Screen)을 관리.

const RootNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        headerShown: false,
        tabBarStyle: {display: 'none'},
        unmountOnBlur: true,
      }}>
      <Tab.Screen name="HomeNavigator" component={HomeNavigator} />
      <Tab.Screen name="ListNavigator" component={ListNavigator} />
      <Tab.Screen name="SettingsNavigator" component={SettingsNavigator} />
    </Tab.Navigator>
  );
};

/* 
RootNavigator 및 HomeNavigator와 같은 네비게이터들은 직접적으로 navigation 객체를 받지 않음. 이 객체들은 React Navigation에 의해 자동으로 관리.
HomeScreen과 같은 스크린 컴포넌트는 navigation 객체를 자동으로 받아, 다른 화면으로 이동할 수 있음.
Footer 컴포넌트는 useNavigation 훅을 사용하여 현재 네비게이션 컨텍스트에 접근하므로, navigation 객체를 부모 컴포넌트로부터 받을 필요가 없음. 
*/

export default RootNavigator;
