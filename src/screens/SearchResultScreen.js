import React from 'react';
import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import size from '../constants/size';
import Back from '../../assets/svg/back.svg';
import Right from '../../assets/svg/right.svg';
import realEstaeSearchResult from '../../dummyjson/realEstateSearchResult.json';

const SearchResultScreen = ({route}) => {
  const navigation = useNavigation();
  const {buildingName, jibunAddress, roadAddress, detailAddress} = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleClickCardItem = () => {
    console.log('클릭');
  };

  return (
    <View style={styles.mainView} onPress={() => Keyboard.dismiss()}>
      <View style={styles.headerView}>
        <TouchableOpacity style={styles.backView} onPress={handleGoBack}>
          <Back width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.titleText}>등기 검색 결과</Text>
      </View>

      <View style={styles.containerView}>
        {/* 주소 정보 */}

        <View>
          <Text
            style={
              detailAddress != undefined
                ? styles.detailAdressTitleView
                : styles.noDetailAddressTitleView
            }>
            {buildingName} {detailAddress != '' ? detailAddress : ''}
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
        </View>

        {/* 검색 결과 리스트 */}

        <ScrollView style={styles.resulScrollView}>
          {realEstaeSearchResult.map((item, index) => (
            <TouchableOpacity
              style={styles.cardView}
              key={index}
              onPress={handleClickCardItem}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 5,
                  paddingLeft: 16,
                  paddingRight: 16,
                }}>
                <View style={{flex: 1}}>
                  <Text style={styles.cardTitle}>
                    {item.division === '토지'
                      ? '⛳️ '
                      : item.division === '건물'
                      ? '🏠 '
                      : item.division === '집합건물'
                      ? '🏢 '
                      : ''}{' '}
                    {item.address}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingLeft: 16,
                      paddingRight: 16,
                    }}>
                    <View style={{flex: 1}}>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              marginBottom: 1,
                              marginRight: 3,
                            }}>
                            <Text style={styles.cardSubtitle}>구분</Text>
                          </View>
                          <Text style={[styles.cardSubtitle, {color: 'black'}]}>
                            {item.division}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      paddingLeft: 16,
                      paddingRight: 16,
                    }}>
                    <View style={{flex: 1}}>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              marginBottom: 1,
                              marginRight: 3,
                            }}>
                            <Text style={styles.cardSubtitle}>
                              부동산 고유번호
                            </Text>
                          </View>
                          <Text style={[styles.cardSubtitle, {color: 'black'}]}>
                            {item.No}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.rightButtonView}>
                  <TouchableOpacity>
                    <Right />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.divider}></View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchResultScreen;

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
    // backgroundColor: '#F5F6F8',
  },
  detailAdressTitleView: {
    marginTop: 35,
    marginLeft: 18,
    fontSize: 23,
    fontFamily: 'Pretendard-Medium',
  },
  noDetailAddressTitleView: {
    marginTop: 35,
    marginLeft: 24,
    fontSize: 23,
    fontFamily: 'Pretendard-Medium',
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
  resulScrollView: {
    flex: 1,
    marginTop: 20,
    marginLeft: 18,
    marginRight: 18,
    marginBottom: 20,
  },
  cardView: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 17,
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 10,
  },
  cardTitle: {
    color: 'black',
    fontFamily: 'Pretendard-Bold',
    fontWeight: '700',
    fontSize: 17,
  },
  cardSubtitle: {
    color: '#A6A6A6',
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    marginLeft: 3,
    flex: 1,
  },
  // menuView: {
  //   width: '100%',
  //   height: 50,
  //   flexDirection: 'row',
  // },
  // menuItem: {
  //   width: '49.4%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: '100%',
  // },
  // menuItemText: {
  //   fontFamily: 'Pretendard-Medium',
  //   fontSize: 14,
  //   fontWeight: '600',
  //   color: 'gray',
  // },
});
