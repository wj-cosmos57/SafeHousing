import React, {useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';

import size from '../constants/size';
import Back from '../../assets/svg/back.svg';
import Search from '../../assets/svg/search.svg';

const RealEstateSearchResultScreen = ({route}) => {
  const navigation = useNavigation();
  const {addressList} = route.params;

  const [searchText, setSearchText] = useState('');

  const buildingName = JSON.stringify(addressList.buildingName).slice(1, -1);
  const jibunAddress = JSON.stringify(addressList.jibunAddress).slice(1, -1);
  const roadAddress = JSON.stringify(addressList.roadAddress).slice(1, -1);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Pressable style={styles.mainView} onPress={() => Keyboard.dismiss()}>
      <View style={styles.headerView}>
        <TouchableOpacity style={styles.backView} onPress={handleGoBack}>
          <Back width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.titleText}>부동산 검색 결과</Text>
      </View>

      <View style={styles.container}>
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

        <Text
          style={{
            marginTop: 20,
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
                value={searchText}
                onChangeText={setSearchText}
                // onSubmitEditing={}
              />
              <TouchableOpacity
                style={{justifyContent: 'center'}}
                // onPress={handleSearch}
              >
                <Search />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <Text
            style={{
              fontFamily: 'Pretendard-Medium',
              fontSize: 15,
              color: '#636363',
              textAlign: 'right',
            }}>
            세부 주소의 입력이 필요없다면 아래의{'\n'}skip 버튼을 눌러주세요!
          </Text>
          <View style={styles.skipView}>
            <Text style={{fontFamily: 'Pretendard-Bold'}}>Skip</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default RealEstateSearchResultScreen;

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
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
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
    color: '#BCBCBC',
    marginRight: 4,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 30,
    marginRight: 24,
  },
  skipView: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    backgroundColor: '#e3e3e3',
  },
});
