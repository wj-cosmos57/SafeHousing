import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import size from '../constants/size';
import Back from '../../assets/svg/back.svg';
import Search from '../../assets/svg/search.svg';

const RealEstateSearchDetailScreen = ({route}) => {
  const navigation = useNavigation();
  const {addressList} = route.params;

  const [detailAddress, setDetailAddress] = useState('');

  const buildingName = JSON.stringify(addressList.buildingName).slice(1, -1);
  const jibunAddress = JSON.stringify(addressList.jibunAddress).slice(1, -1);
  const roadAddress = JSON.stringify(addressList.roadAddress).slice(1, -1);

  // 스크린 포커스 시 detailAddress 상태 초기화
  useFocusEffect(
    React.useCallback(() => {
      setDetailAddress('');
    }, []),
  );

  const handleGoBack = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  const handleGoResultScreen = () => {
    navigation.navigate('SearchResultScreen', {
      menu: 0,
      buildingName: buildingName,
      jibunAddress: jibunAddress,
      roadAddress: roadAddress,
      detailAddress: detailAddress, // 추가적인 세부 정보
    });
  };

  const handleGoSkip = () => {
    navigation.navigate('SearchResultScreen', {
      menu: 0,
      buildingName: buildingName,
      jibunAddress: jibunAddress,
      roadAddress: roadAddress,
    });
  };

  return (
    /*
    React Native에서 TextInput 컴포넌트를 사용하면 앱 상에서 키보드가 자동으로 올라옴. 
    사용자가 TextInput 필드를 탭하면, 모바일 장치의 키보드가 활성화되어 입력을 받을 수 있음. 
    이는 React Native의 기본 동작.
    TextInput 컴포넌트 외부의 영역을 탭할 때 키보드를 숨기고 싶다면, 
    Pressable 컴포넌트의 onPress 이벤트를 사용하여 Keyboard.dismiss() 메서드를 호출
    */
    <Pressable style={styles.mainView} onPress={() => Keyboard.dismiss()}>
      <View style={styles.headerView}>
        <TouchableOpacity style={styles.backView} onPress={handleGoBack}>
          <Back width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.titleText}>세부 주소 입력</Text>
      </View>

      <View style={styles.containerView}>
        {/* <Text>{JSON.stringify(addressList)}</Text> */}
        <Text
          style={[
            styles.titleText,
            {fontSize: 25, marginTop: 10, marginLeft: 24},
          ]}>
          입력하신 주소의{'\n'}세부 주소를 알려주세요 ☺️
        </Text>
        <Text
          style={{
            color: 'red',
            marginTop: 3,
            marginLeft: 24,
          }}>
          ❗️구체적인 주소는 정확한 등기 목록을 불러올 수 있어요
        </Text>

        <View style={{flex: 1}}>
          <Text
            style={{
              marginTop: 35,
              marginLeft: 24,
              fontSize: 23,
              fontFamily: 'Pretendard-Medium',
            }}>
            {buildingName}
          </Text>

          <View style={[styles.addressTextView, {paddingTop: 10}]}>
            <View style={[styles.addressText, {backgroundColor: '#e3f2fd'}]}>
              <Text>도로명</Text>
            </View>
            <Text
              style={{
                fontFamily: 'Pretendard-Bold',
                fontSize: 15,
                color: '#636363',
              }}>
              {roadAddress}
            </Text>
          </View>

          <View style={styles.addressTextView}>
            <View style={[styles.addressText, {backgroundColor: '#e3e3e3'}]}>
              <Text>구주소</Text>
            </View>
            <Text
              style={{
                fontFamily: 'Pretendard-Bold',
                fontSize: 15,
                color: '#636363',
              }}>
              {jibunAddress}
            </Text>
          </View>

          <View style={styles.searchViewOuter}>
            <View style={styles.searchView}>
              <View style={styles.searchViewInner}>
                <TextInput
                  style={styles.searchTextInput}
                  clearButtonMode={'while-editing'}
                  placeholder="세부 주소를 입력하세요."
                  value={detailAddress}
                  onChangeText={setDetailAddress}
                  onSubmitEditing={handleGoResultScreen}
                />
                <TouchableOpacity
                  style={{justifyContent: 'center'}}
                  onPress={handleGoResultScreen}>
                  <Search />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text
            style={{
              fontFamily: 'Pretendard-Medium',
              fontSize: 15,
              color: '#636363',
              textAlign: 'center',
            }}>
            세부 주소의 입력이 필요없다면{'\n'}아래의 skip 버튼을 눌러주세요.
          </Text>
          <TouchableOpacity style={styles.skipView} onPress={handleGoSkip}>
            <Text style={{fontFamily: 'Pretendard-Bold'}}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

export default RealEstateSearchDetailScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerView:
    Platform.OS == 'ios'
      ? {
          paddingTop: size.STATUSBAR_HEIGHT,
          height: size.STATUSBAR_HEIGHT + 50,
          backgroundColor: '#FAFAFA',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }
      : {
          height: size.STATUSBAR_HEIGHT / 2 + 50,
          backgroundColor: '#FAFAFA',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
  backView:
    Platform.OS == 'ios'
      ? {
          position: 'absolute',
          height: '100%',
          left: 0,
          top: size.STATUSBAR_HEIGHT,
          padding: 16,
          justifyContent: 'center',
        }
      : {
          position: 'absolute',
          height: '100%',
          left: 0,
          top: 0,
          padding: 16,
          justifyContent: 'center',
        },
  titleText: {
    color: 'black',
    fontFamily: 'Pretendard-Medium',
    fontWeight: '600',
    fontSize: 17,
  },
  containerView: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
  },
  addressTextView: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 24,
  },
  addressText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 15,
    borderRadius: 4,
    borderColor: '#e2e2e2',
    padding: 5,
    marginTop: 2,
    marginRight: 5,
  },
  searchViewOuter: {
    height: 47,
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 20,
    marginBottom: 12,
  },
  searchView: {
    height: 47,
    width: '100%',
    backgroundColor: '#EDEDED',
    borderRadius: 11,
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  searchViewInner: {
    flexDirection: 'row',
  },
  searchTextInput: {
    flex: 1,
    fontFamily: 'Pretendard-Regular',
    fontSize: 18,
    // color: '#BCBCBC',
    marginRight: 4,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 40,
    marginRight: 24,
    marginLeft: 24,
  },
  skipView: {
    width: '100%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: '#E3E3E3',
  },
});
