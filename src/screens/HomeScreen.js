import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeScreen = (/*{navigation}*/) => {
  /* 스크린 컴포넌트들은 navigation 객체를 props로 받음.
  이 객체는 React Navigation에 의해 자동으로 제공됨. 
  이를 통해 다른 화면으로 네비게이션 할 수 있음. 
  하지만 현재 Footer 내에서 useNavigation 훅을 사용하여 
  현재 네비게이션 컨텍스트에 접근하므로 필요X. */

  const navigation = useNavigation();

  const handleRealEstate = () => {
    navigation.navigate('RealEstateSearchScreen');
  };
  return (
    <View style={styles.mainView}>
      <Header />
      <View style={styles.containerView}>
        {/* 부동산 등기 */}
        <TouchableOpacity style={styles.card} onPress={handleRealEstate}>
          <Text style={styles.cardTitle}>부동산 등기</Text>
          <Text style={styles.cardDescription}>
            부동산 관련 등기 정보를 조회하세요.
          </Text>
        </TouchableOpacity>

        {/* 법인 등기 */}
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>법인 등기</Text>
          <Text style={styles.cardDescription}>
            법인의 등기 사항을 확인할 수 있습니다.
          </Text>
        </TouchableOpacity>

        {/* 동산 및 채권 담보 등기 */}
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>동산·채권 담보 등기</Text>
          <Text style={styles.cardDescription}>
            동산 및 채권 담보에 대한 등기를 진행합니다.
          </Text>
        </TouchableOpacity>
      </View>
      {/* <Footer menu={1} navigation={navigation} /> */}
      <Footer menu={1} />
      {/* Footer 내부에서 useNavigation을 사용하기 때문에 navigation 객체를 Footer에 전달할 필요는 없음 */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
  },
  cardDescription: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default HomeScreen;
