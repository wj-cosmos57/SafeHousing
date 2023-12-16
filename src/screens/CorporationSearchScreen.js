import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

import size from '../constants/size';
import Back from '../../assets/svg/back.svg';
import Search from '../../assets/svg/search.svg';

const CorporationSearchScreen = () => {
  const [searchCorporationName, setSearchCorporationName] = useState('');
  // const [addressList, setAddressList] = useState('');

  // 등기소 선택 상태
  const [openOffice, setOpenOffice] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [officeOptions, setOfficeOptios] = useState([
    {label: '전체 등기소', value: '전체 등기소'},
    {label: '서울중앙지방법법원 등기국', value: '서울중앙지방법법원 등기국'},
    {
      label: '서울중앙지방법원 중부등기소',
      value: '서울중앙지방법원 중부등기소',
    },
  ]);

  // 법인 구분 선택 상태
  const [openDivisoin, setOpenDivison] = useState(false);
  const [selectedDivison, setSelectedDivision] = useState(null);
  const [divisionOptions, setDivisionOptions] = useState([
    {
      label: '전체 법인(지배인, 미성년자, 법정 대리인 제외',
      value: '전체 법인(지배인, 미성년자, 법정 대리인 제외',
    },
    {label: '주식회사', value: '주식회사'},
    {
      label: '합명회사',
      value: '합명회사',
    },
  ]);

  const navigation = useNavigation();

  // 스크린 포커스 시 detailAddress 상태 초기화
  useFocusEffect(
    React.useCallback(() => {
      setSearchCorporationName('');
    }, []),
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoResultScreen = () => {
    navigation.navigate('SearchResultScreen', {
      menu: 1,
      selectedOffice: selectedOffice,
      selectedDivison: selectedDivison,
      searchCorporationName: searchCorporationName,
    });
  };

  return (
    <Pressable style={styles.mainView} onPress={Keyboard.dismiss}>
      <View style={styles.headerView}>
        <TouchableOpacity style={styles.backView} onPress={handleGoBack}>
          <Back width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.titleText}>법인명 검색</Text>
      </View>

      <View style={styles.containerView}>
        <Text
          style={[
            styles.titleText,
            {fontSize: 25, marginTop: 10, marginBottom: 10, marginLeft: 24},
          ]}>
          검색을 원하는{'\n'}법인명을 알려주세요 ☺️
        </Text>
        <Text
          style={{
            color: 'red',
            marginTop: 3,
            marginBottom: 3,
            marginLeft: 24,
          }}>
          ❗️"등기소&법인구분" 선택은 검색범위를 좁힐 수 있어요!
        </Text>
        <Text
          style={{
            color: 'red',
            marginTop: 3,
            marginBottom: 3,
            marginLeft: 24,
          }}>
          ❗️선택하지 않으면 "전체" 범위로 자동 검색돼요
        </Text>

        {/* 등기소 dorpdown */}

        <View style={[styles.dropDownView, {zIndex: openOffice ? 100 : 10}]}>
          <View style={styles.dropDownTitleView}>
            <Text style={styles.dropDownTitleText}>등기소</Text>
          </View>
          <View style={styles.dropDownContainer}>
            <DropDownPicker
              open={openOffice}
              value={selectedOffice}
              items={officeOptions}
              setOpen={setOpenOffice}
              setValue={setSelectedOffice}
              setItems={setOfficeOptios}
              placeholder={'관할 등기소를 선택하세요.'}
              style={styles.dropDownStyle}
              textStyle={styles.dropDownTextStyle}
              dropDownContainerStyle={styles.dropDownContainerStyle}
            />
          </View>

          {/* <View>
            <Text>선택된 등기소: {value === null ? 'none' : value}</Text>
          </View> */}
        </View>

        <View style={[styles.dropDownView, {zIndex: openDivisoin ? 100 : 10}]}>
          <View style={styles.dropDownTitleView}>
            <Text style={styles.dropDownTitleText}>법인구분</Text>
          </View>
          <View style={styles.dropDownContainer}>
            <DropDownPicker
              open={openDivisoin}
              value={selectedDivison}
              items={divisionOptions}
              setOpen={setOpenDivison}
              setValue={setSelectedDivision}
              setItems={setDivisionOptions}
              placeholder={'법인 종류를 선택하세요.'}
              style={styles.dropDownStyle}
              textStyle={styles.dropDownTextStyle}
              dropDownContainerStyle={styles.dropDownContainerStyle}
            />
          </View>

          {/* <View>
            <Text>선택된 등기소: {value === null ? 'none' : value}</Text>
          </View> */}
        </View>

        <View style={styles.searchViewOuter}>
          <View style={styles.searchView}>
            <View style={styles.searchViewInner}>
              <TextInput
                style={styles.searchTextInput}
                clearButtonMode={'while-editing'}
                placeholder="법인명을 입력하세요."
                value={searchCorporationName}
                onChangeText={setSearchCorporationName}
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
    </Pressable>
  );
};

export default CorporationSearchScreen;

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
    width: '100%',
    paddingTop: 18,
  },
  titleText: {
    color: 'black',
    fontFamily: 'Pretendard-Medium',
    fontWeight: '600',
    fontSize: 17,
  },
  dropDownView: {
    // zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 10,
  },
  dropDownTitleView: {
    flex: 1,
    // width: '15%',
    justifyContent: 'flex-start',
  },
  dropDownTitleText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
  },
  dropDownContainer: {
    flex: 4,
    marginTop: 18,
    // paddingHorizontal: 24, // 좌우 패딩
    // paddingTop: 18, // 상단 패딩
  },
  dropDownStyle: {
    backgroundColor: '#f8f8f8', // 배경색
    borderColor: '#e2e2e2', // 테두리 색상
    borderWidth: 1, // 테두리 두께
    borderRadius: 12, // 모서리 둥글기
  },
  dropDownTextStyle: {
    fontFamily: 'Pretendard-Regular', // 폰트
    fontSize: 16, // 폰트 크기
    color: '#636363', // 폰트 색상
  },
  dropDownContainerStyle: {
    backgroundColor: '#ffffff', // 드롭다운 리스트의 배경색
    borderColor: '#e2e2e2', // 드롭다운 리스트의 테두리 색상
    // ...기타 필요한 스타일 속성
  },
  searchViewOuter: {
    zIndex: 1, // dropDownPicker가 가려지는 문제를 해결하기 위해
    height: 47,
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 10,
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
});
