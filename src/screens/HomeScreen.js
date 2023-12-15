import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Linking,
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

  const handleCorporation = () => {
    navigation.navigate('CorporationSearchScreen');
  };

  return (
    <View style={styles.mainView}>
      <Header />
      <View style={styles.containerView}>
        {/* <Text>전세사기 등기 검색으로 예방해보아요.</Text> */}
        {/* 부동산 등기 */}
        <TouchableOpacity
          style={styles.realEstateCard}
          onPress={handleRealEstate}>
          <Text style={styles.realEstateCardTitle}>부동산 등기</Text>
          <Text style={styles.realEstateCardDescription}>
            부동산 관련 등기 정보를 조회하세요.
          </Text>
          <View style={styles.largeCardActionContainer}>
            <Text style={styles.largeCardActionText}>🏠 주소 검색하기</Text>
          </View>
        </TouchableOpacity>

        {/* 법인 등기 */}
        <TouchableOpacity
          style={styles.corporationCard}
          onPress={handleCorporation}>
          <Text style={styles.corporationCardTitle}>법인 등기</Text>
          <Text style={styles.corpoationCardDescription}>
            법인의 등기 사항을 확인할 수 있습니다.
          </Text>
          <View style={styles.largeCardActionContainer}>
            <Text style={styles.largeCardActionText}>🏢 법인명 검색하기</Text>
          </View>
        </TouchableOpacity>

        {/* 동산 및 채권 담보 등기 */}
        <TouchableOpacity style={styles.smallCard}>
          <Text style={styles.smallCardTitle}>
            동산·채권 담보 등기(출시 예정)
          </Text>
          {/* <Text style={styles.smallCardDescription}>
            동산·채권 담보에 대한 등기 조회하기
          </Text> */}
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => Linking.openURL('http://www.iros.go.kr/PMainJ.jsp')}>
          <Text style={styles.settingTextView}>
            인터넷 등기소 홈페이지 이동
          </Text>
        </TouchableOpacity>
      </View>
      <Footer menu={1} />
      {/* <Footer menu={1} navigation={navigation} /> */}
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
  realEstateCard: {
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    height: '30%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  realEstateCardTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 25,
    color: '#007bff',
  },
  realEstateCardDescription: {
    marginTop: 10,
    fontSize: 17,
    color: '#555',
  },
  corporationCard: {
    backgroundColor: '#fcedf1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    height: '30%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  corporationCardTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 25,
    color: '#d66b81',
  },
  corpoationCardDescription: {
    marginTop: 10,
    fontSize: 17,
    color: '#555',
  },
  largeCardActionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
  },
  largeCardActionText: {
    fontSize: 17,
    color: '#555',
    fontWeight: 'bold',
  },
  smallCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fcf8e3',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    height: '10%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  smallCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d4a706',
  },
  smallCardDescription: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  settingTextView: {
    color: '#007bff',
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    textDecorationLine: 'underline',
  },
});

export default HomeScreen;
