import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { request, status } from '../apis/realEstate';

const RegistryIssuanceLoadingScreen = ({route}) => {
  const navigation = useNavigation();

  const [show, setShow] = useState(true);
  const [loadingText, setLoadingText] = useState('');
  const [message, setMessage] = useState('');
  const lottieRef = useRef(null);

  useEffect(() => {
    requestDo(route.params.menu, route.params.item);
  }, []);

  const requestDo = async (menu, item) => {
    if(item.type == "토지"){
      item.type = 0;
    } else if(item.type == "건물"){
      item.type = 1;
    } else if(item.type == "집합건물"){
      item.type = 2;
    }

    let requestRes;
    if(menu == 0){
      requestRes = await request(item.regId, item.address, item.type);
    }

    if(requestRes.error){
      Alert.alert("등기 발급 실패", requestRes.message);
      navigation.goBack();
      return;
    }

    let idx = requestRes.idx;
    requestResult(idx);
  }

  const requestResult = async (idx) => {
    let statusRes = await status(idx);
    if(statusRes.error){
      Alert.alert("등기 발급 실패", statusRes.message);
      navigation.goBack();
      return;
    }

    if(statusRes.status == 0){
      setLoadingText("요청이 대기열이 추가되었어요.\n잠시만 기다려주세요.");
    } else if(statusRes.status == 1){
      setLoadingText("이용자님의 차례가 됐어요.\n열람을 시작할게요.");
    } else if(statusRes.status == 2){
      setLoadingText("열람을 준비하고 있어요.\n잠시만 기다려주세요.");
    } else if(statusRes.status == 3){
      setLoadingText("인터넷등기소에 로그인하고 있어요.\n잠시만 기다려주세요.");
    } else if(statusRes.status == 4){
      setLoadingText("등기부등본을 찾고 있어요.\n잠시만 기다려주세요.");
    } else if(statusRes.status == 5){
      setLoadingText("등기부등본을 찾고 있어요.\n잠시만 기다려주세요.");
    } else if(statusRes.status == 6){
      setLoadingText("결제가 진행중이에요.\n잠시만 기다려주세요.");
    } else if(statusRes.status == 7){
      setLoadingText("열람 비용 700원은 저희가 냈어요.\n잠시만 기다려주세요.");
    } else if(statusRes.status == 8){
      setLoadingText("보안 프로그램 응답을 기다리고 있어요.\n잠시만 기다려주세요.");
    } else if(statusRes.status == 9){
      setLoadingText("등기부등본을 열람하고 있어요.\n잠시만 기다려주세요.");
    } else if(statusRes.status == 10){
      setLoadingText("등기부등본을 열람하고 있어요.\n잠시만 기다려주세요.");
    } else if(statusRes.status == 11){
      setLoadingText("등기부등본을 변환하고 있어요.\n잠시만 기다려주세요.");
    } else if(statusRes.status == 12){
      setLoadingText("등기부등본을 저장하고 있어요.\n잠시만 기다려주세요.");
    }
    else if(statusRes.status == 13){
      navigation.navigate('ListNavigator'
    );
    return;
    } else{
      Alert.alert("등기 발급 실패", "등기 발급에 실패했습니다.");
      navigation.goBack();
      return;
    }

    setTimeout(() => {
      requestResult(idx);
    }, 1000);
    
  }

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
              {loadingText}
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
