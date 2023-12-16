import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const RegistryIssuanceLoadingScreen = props => {
  const navigation = useNavigation();

  const [show, setShow] = useState(true);
  const [message, setMessage] = useState('');
  const lottieRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('ListNavigator');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const showLoading = () => {
    setShow(true);
    setMessage('');
  };

  const hideLoading = () => {
    setShow(false);
  };

  return (
    <>
      {show && (
        <View style={styles.overlay}>
          <View style={styles.modal_view}>
            <LottieView
              style={{height: 400, width: 400}}
              speed={2}
              source={require('../../assets/lottie/Animation_Loading2.json')}
              autoPlay
              loop
              ref={lottieRef}
            />
            <Text style={styles.text}>
              등기를 발급받고 있어요!{'\n'}발급비용 700원은 저희가 냈어요!
            </Text>
          </View>
        </View>
      )}
    </>
  );
};
export default RegistryIssuanceLoadingScreen;

const styles = StyleSheet.create({
  // 스타일 정의는 동일하게 유지
  overlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 999,
    backgroundColor: 'white',
    opacity: 0.9,
  },
  modal_view: {
    height: 200,
    width: '100%',
    zIndex: 9999,
    marginTop: '-25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 10,
    color: '#1B8FD0',
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
  },
});
