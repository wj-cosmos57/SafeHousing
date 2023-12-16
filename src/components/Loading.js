import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';

const Loading = props => {
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState('');
  const lottieRef = useRef(null);

  useEffect(() => {
    // 종호 슈투데이 클래스형 컴포넌트의 componentDidMount에서 수행되던 작업
    // lottieRef.current.play(); 같은 거 넣기
  }, []);

  const showLoading = () => {
    setShow(true);
    setMessage('');
  };

  const hideLoading = () => {
    setShow(false);
  };

  const showMessage = msg => {
    setMessage(msg);
  };

  return (
    <>
      {show && (
        <View style={styles.overlay}>
          <View style={styles.modal_view}>
            <LottieView
              style={{height: 100, width: 100}}
              speed={2}
              source={require('../../assets/lottie/Animation_Loading1.json')}
              autoPlay
              loop
              ref={lottieRef}
            />
            {message !== '' && <Text style={styles.text}>{message}</Text>}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  // 스타일 정의는 동일하게 유지
  overlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    // left: 0,
    // top: 0,
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

export default Loading;
