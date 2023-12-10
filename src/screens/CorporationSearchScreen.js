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

import size from '../constants/size';
import Back from '../../assets/svg/back.svg';
import Search from '../../assets/svg/search.svg';

const CorporationSearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [addressList, setAddressList] = useState('');

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
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
        <View style={styles.searchViewOuter}>
          <View style={styles.searchView}>
            <View style={styles.searchViewInner}>
              <TextInput
                style={styles.searchTextInput}
                clearButtonMode={'while-editing'}
                placeholder="법인명을 입력하세요."
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
  searchViewOuter: {
    height: 47,
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,
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
});
