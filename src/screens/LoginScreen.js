import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import KakaoIcon from '../../assets/svg/kakao.svg';
import BottomSafe from '../components/BottomSafe';
import {
  getProfile as kakaoGetProfile,
  login as kakaoLogin,
  logout as kakaoLogout,
  unlink as kakaoUnlink,
} from '@react-native-seoul/kakao-login';
import { login, profile } from '../apis/user';
import Loading from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try{
      let accessToken = await AsyncStorage.getItem('accessToken');
      if(!accessToken){
        setIsLoading(false);
        return;
      }

      const profileRes = await profile();
      if(profileRes.error){
        Alert.alert("로그인 실패", profileRes.message);
        await AsyncStorage.removeItem('accessToken');
        setIsLoading(false);
        return;
      }

      navigation.navigate('Root');
    } catch(e){
      setIsLoading(false);
    }
  }

  const loginWithKakao = async () => {
    try{
      setIsLoading(true);
      const token = await kakaoLogin();
      let loginRes = await login('kakao', token.accessToken);
      if(loginRes.error){
        Alert.alert("로그인 실패", loginRes.message);
        setIsLoading(false);
        return;
      }

      let accessToken = loginRes.accessToken;
      await AsyncStorage.setItem('accessToken', accessToken);
      navigation.navigate('Root');
    } catch(e){
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsLoading(false);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {isLoading && <Loading></Loading>}
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text style={styles.Title}>SAFE HOUSING</Text>
        <Text style={styles.subTitle}>Login to continue</Text>
      </View>
      <View style={{width: "100%"}}>
      <TouchableOpacity style={[styles.footer_button, {marginBottom: 20, backgroundColor: "#FFE920"}]} onPress={() => loginWithKakao()}>
              <View style={{flexDirection: "row"}}>
                  <KakaoIcon style={[styles.footer_button_text, {marginRight: 5}]}></KakaoIcon>
                  <Text style={[styles.footer_button_text, {color: "black"}]}>카카오 로그인</Text>
              </View>
      </TouchableOpacity>
      <BottomSafe></BottomSafe>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 35,
    color: '#333333',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    color: 'gray',
  },
  textInput: {
    padding: 10,
    width: '80%',
    height: 40,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
  },
  footer_button: {
    backgroundColor: "black", 
    width: "92%", 
    height: 51, 
    borderRadius: 8, 
    marginLeft: 16, 
    marginRight: 16,
    alignContent: "center", 
    alignItems: "center", 
    alignSelf: "center"
},
footer_button_text: {
  alignContent: "center", 
  alignItems: "center", 
  alignSelf: "center", 
  color: "white", 
  marginTop: "4%",
  fontSize: 16,
  fontWeight: '500',
  fontFamily: 'Pretendard-Bold',
},
});

export default LoginScreen;
