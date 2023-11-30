import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import HomeOn from '../../assets/svg/home_on.svg';
import HomeOff from '../../assets/svg/home_off.svg';
import BookOn from '../../assets/svg/book_on.svg';
import BookOff from '../../assets/svg/book_off.svg';
import MyOn from '../../assets/svg/my_on.svg';
import MyOff from '../../assets/svg/my_off.svg';
import BottomSafe from './BottomSafe';

const Footer = ({menu}) => {
  /* useNavigation 훅을 사용하여 현재 네비게이션 컨텍스트에 접근
        (navigation 객체를 부모 컴포넌트로부터 전달받지 않아도 됨)*/
  const navigation = useNavigation();
  /* menu는 현재 선택된 탭을 나타내는 상태. 이는 부모 컴포넌트로부터 전달받음*/
  const [currentMenu, setCurrentMenu] = useState(menu);

  useEffect(() => {
    // componentDidMount와 같은 기능, 필요한 로직 추가
  }, []);

  return (
    <>
      <Shadow
        containerStyle={styles.footerView}
        style={styles.shadowView}
        sides={{top: true, bottom: false}}
        distance={1}>
        <View style={styles.footerInnerView}>
          <TouchableOpacity
            style={styles.footerItemView}
            onPress={() => navigation.navigate('HomeNavigator')}>
            {currentMenu == 1 ? (
              <HomeOn height={32} width={32} />
            ) : (
              <HomeOff height={32} width={32} />
            )}
            <Text style={currentMenu == 1 ? styles.text : styles.textOff}>
              홈
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerItemView}
            onPress={() => navigation.navigate('ListNavigator')}>
            {currentMenu == 2 ? (
              <BookOn height={32} width={32} />
            ) : (
              <BookOff height={32} width={32} />
            )}
            <Text style={currentMenu == 2 ? styles.text : styles.textOff}>
              목록
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerItemView}
            onPress={() => navigation.navigate('SettingsNavigator')}>
            {currentMenu == 3 ? (
              <MyOn height={32} width={32} />
            ) : (
              <MyOff height={32} width={32} />
            )}
            <Text style={currentMenu == 3 ? styles.text : styles.textOff}>
              마이
            </Text>
          </TouchableOpacity>
        </View>
      </Shadow>
      <BottomSafe />
    </>
  );
};

const styles = StyleSheet.create({
  shadowView: {
    height: '100%',
    width: '100%',
  },
  footerView: {
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: 6,
    paddingBottom: 6,
    height: 65,
    backgroundColor: 'white',
    width: '100%',
  },
  footerInnerView: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  footerItemView: {
    width: '33.3%',
    height: '100%',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: '#878787',
  },
  textOff: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: '#B7B7B7',
  },
});

export default Footer;
