import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import Header from '../components/Header';
import Footer from '../components/Footer';

import realEstateData from '../../dummyjson/realEstateData.json';
import corporationData from '../../dummyjson/corporationData.json';
import { list as corporateList } from '../apis/corporate';
import { list as realEstateList } from '../apis/realEstate';
import Loading from '../components/Loading';
import moment from 'moment';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const ListScreen = ({navigation}) => {
  const [currentMenu, setCurrentMenu] = useState(0); // 0: 부동산 / 1: 법인
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData(0);
  }, []);

  const getData = async (menu) => {
    try{
      setIsLoading(true);

      let dataRes;
      if(menu == 0){
        dataRes = await realEstateList();
      } else if(menu == 1){
        dataRes = await corporateList();
      }

      if(dataRes.error){
        Alert.alert("불러오기 실패", dataRes.message);
        setIsLoading(false);
        return;
      }

      if(menu == 0){
        setData(dataRes.realEstates);
      } else if(menu == 1){
        setData(dataRes.corporates);
      }

      setIsLoading(false);
    } catch(e){
      setIsLoading(false);
    }
  };

  const switchMenu = async (menu) => {
    await getData(menu);
    setCurrentMenu(menu);
  }

  return (
    <View style={styles.mainView}>
      {isLoading && <Loading />}
      <Header />
      <View style={styles.selectView}>
        <TouchableOpacity
          style={currentMenu == 0 ? styles.selectItemOn : styles.selectItem}
          onPress={() => switchMenu(0)}>
          <Text
            style={
              currentMenu == 0 ? styles.selectItemTextOn : styles.selectItemText
            }>
            부동산
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={currentMenu == 1 ? styles.selectItemOn : styles.selectItem}
          onPress={() => switchMenu(1)}>
          <Text
            style={
              currentMenu == 1 ? styles.selectItemTextOn : styles.selectItemText
            }>
            법인
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={currentMenu == 2 ? styles.selectItemOn : styles.selectItem}
          onPress={() => setCurrentMenu(2)}>
          <Text
            style={
              currentMenu == 2 ? styles.selectItemTextOn : styles.selectItemText
            }>
            동산·채권 담보
          </Text>
        </TouchableOpacity> */}
      </View>
      {/* <View style={styles.containerView}>
        <Text style={styles.textStyle}>ListScreen</Text>
      </View> */}
      <ScrollView style={styles.containerView}>
        {currentMenu == 0 && data.map((item, index) => (
          <View style={styles.cardView} key={index}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 5,
                paddingLeft: 16,
                paddingRight: 16,
              }}>
              <View style={{flex: 1}}>
                <Text style={styles.cardTitle}>{item.type === 0
                      ? '⛳️ '
                      : item.type === 1
                      ? '🏠 '
                      : item.type === 2
                      ? '🏢 '
                      : ''}{' '} {item.address}</Text>
              </View>
            </View>

            <View
              style={{flexDirection: 'row', paddingLeft: 16, paddingRight: 16}}>
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
                      {item.type === 0 ? '토지' : item.type === 1 ? '건물' : item.type === 2 ? '집합건물' : ''}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{flexDirection: 'row', paddingLeft: 16, paddingRight: 16}}>
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
                      <Text style={styles.cardSubtitle}>요청 일시</Text>
                    </View>
                    <Text style={[styles.cardSubtitle, {color: 'black'}]}>
                      {moment(item.createdAt).format('YYYY년 MM월 DD일 HH시 mm분')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{flexDirection: 'row', paddingLeft: 16, paddingRight: 16}}>
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
                      <Text style={styles.cardSubtitle}>고유번호</Text>
                    </View>
                    <Text style={[styles.cardSubtitle, {color: 'black'}]}>
                      {item.regId}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.divider}></View>

            <View style={styles.menuView}>
              <View style={styles.menuItem}>
                <Text style={[styles.menuItemText, {color: '#d66b81'}]}>
                  삭제
                </Text>
              </View>

              <View style={styles.verticalDivider}></View>

              <TouchableOpacity style={styles.menuItem} onPress={async () => {
                if (await InAppBrowser.isAvailable()) {
                  const result = await InAppBrowser.open(item.pdfUrl, {
                    // iOS Properties
                    dismissButtonStyle: 'cancel',
                    preferredBarTintColor: '#453AA4',
                    preferredControlTintColor: 'white',
                    readerMode: false,
                    animated: true,
                    modalPresentationStyle: 'fullScreen',
                    modalTransitionStyle: 'coverVertical',
                    modalEnabled: true,
                    enableBarCollapsing: false,
                    // Android Properties
                    showTitle: true,
                    toolbarColor: '#6200EE',
                    secondaryToolbarColor: 'black',
                    navigationBarColor: 'black',
                    navigationBarDividerColor: 'white',
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: false,
                    // Specify full animation resource identifier(package:anim/name)
                    // or only resource name(in case of animation bundled with app).
                    animations: {
                      startEnter: 'slide_in_right',
                      startExit: 'slide_out_left',
                      endEnter: 'slide_in_left',
                      endExit: 'slide_out_right'
                    }
                  })
                }
              }}>
                <Text style={[styles.menuItemText, {color: '#007bff'}]}>
                  PDF 다운로드
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <Footer menu={2} navigation={navigation} />
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'gray',
    opacity: 0.2,
    marginTop: 16,
  },
  verticalDivider: {
    backgroundColor: 'gray',
    width: '0.3%',
    opacity: 0.2,
  },
  mainView: {
    flex: 1,
    backgroundColor: 'white',
  },
  selectView: {flexDirection: 'row', marginTop: 10},
  selectItemOn: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderBottomWidth: 3,
  },
  selectItem: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    // backgroundColor: '#FAFAFA',
  },
  selectItemTextOn: {
    color: 'black',
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
  },
  selectItemText: {
    color: 'black',
    fontFamily: 'Pretendard-Medium',
    fontSize: 15,
  },
  containerView: {
    backgroundColor: '#F5F6F8',
    paddingTop: 20,
    flex: 1,
    width: '100%',
    paddingLeft: 18,
    paddingRight: 18,
  },
  // textStyle: {
  //   fontSize: 30,
  //   textAlign: 'center',
  // },
  cardView: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: 'white',
    borderRadius: 17,
    paddingTop: 16,
    // paddingBottom: 16,
    marginBottom: 10,
  },
  cardTitle: {
    color: 'black',
    fontFamily: 'Pretendard-Bold',
    fontWeight: '700',
    fontSize: 16,
  },
  cardSubtitle: {
    color: '#A6A6A6',
    fontFamily: 'Pretendard-Medium',
    fontSize: 13,
    marginLeft: 3,
    flex: 1,
  },
  menuView: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
  },
  menuItem: {
    width: '49.4%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  menuItemText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    fontWeight: '600',
    color: 'gray',
  },
});
