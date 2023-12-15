import React, {useState} from 'react';
import {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Linking,
} from 'react-native';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Right from '../../assets/svg/right.svg';
import Down from '../../assets/svg/down.svg';
import Up from '../../assets/svg/up.svg';

const SettingsScreen = ({navigation}) => {
  const [showDeveloper, setShowDeveloper] = useState(false);

  const logoutAsk = () => {
    // 로그아웃 로직 구현
  };

  return (
    // [mainView] : 가장 Top View => flex : 1 & width : 100%
    <View style={styles.mainView}>
      {/* [header] */}
      <Header />
      {/* [containerView] : header와 footer를 제외하고 공간 채우기 => flex 1 */}
      <View style={styles.containerView}>
        {/* 프로필 */}

        <View style={styles.profileView}>
          <View>
            <Image
              source={require('../../assets/images/profile.png')}
              style={styles.profileImg}
            />
          </View>
          <View>
            <View style={{flexDirection: 'row'}}></View>
            <Text style={styles.nameText}>이우주님</Text>
          </View>
        </View>

        {/* 개발자 정보 */}

        <ScrollView style={styles.linkView}>
          {/* <View style={styles.dividerView}>
            <View style={styles.divider} />
          </View> */}
          <Pressable
            style={styles.linkItem}
            onPress={() => setShowDeveloper(!showDeveloper)}>
            <View style={styles.linkLeft}>
              <Text style={styles.settingTitleView}>개발자 정보</Text>
              {showDeveloper && (
                <>
                  <Text style={[styles.settingTextViewBold, {marginTop: 6}]}>
                    앱/서버
                  </Text>
                  <Text style={styles.settingTextView}>
                    숭실대학교 컴퓨터학부 김종호
                  </Text>
                  <Text style={styles.settingTextView} />
                  <Text style={styles.settingTextViewBold}>앱</Text>
                  <Text style={styles.settingTextView}>
                    숭실대학교 컴퓨터학부 이우주{'\n'}
                    숭실대학교 컴퓨터학부 김동현
                  </Text>
                  <Text style={styles.settingTextView} />
                  <Text style={styles.settingTextViewBold}>기여</Text>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL('https://github.com/jonghokim27/ssutoday')
                    }>
                    <Text style={styles.settingTextView}>
                      https://github.com/jonghokim27/ssutoday
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        'https://github.com/wj-cosmos57/SafeHousing_APP',
                      )
                    }>
                    <Text style={styles.settingTextView}>
                      https://github.com/wj-cosmos57/SafeHousing
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={styles.linkRight}>
              {!showDeveloper && <Down />}
              {showDeveloper && <Up />}
            </View>
          </Pressable>

          {/* 로그아웃 */}

          <View style={styles.dividerView}>
            <View style={styles.divider} />
          </View>

          {/*  */}

          <Pressable
            style={styles.linkItem}
            onPress={() => {
              this.logoutAsk();
            }}>
            <View style={styles.linkLeft}>
              <Text style={styles.settingTitleView}>로그아웃</Text>
            </View>
            <View style={styles.linkRight}>
              <Right />
            </View>
          </Pressable>
          {/* <Text
            style={[
              styles.settingTextView,
              {paddingLeft: 18, paddingTop: 40, fontSize: 14},
            ]}>
            v{APP_VERSION}_{Platform.OS == 'android' ? '5032' : '53'}_2023.11.27{'\n'}ⓒ 슈투데이. 모든 권리 보유.
          </Text> */}
          <View style={{height: 20}} />
        </ScrollView>
      </View>
      {/* [footer] */}
      <Footer menu={3} navigation={this.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerView: {
    flex: 1,
    width: '100%',
    paddingTop: 37,
    paddingLeft: 24,
    paddingRight: 24,
  },
  profileView: {
    marginBottom: 38,
    flexDirection: 'row',
  },
  profileImg: {
    height: 81,
    width: 81,
    marginRight: 17,
  },
  nameText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 35,
    lineHeight: 35,
    marginBottom: 1,
    color: 'black',
  },
  majorView: {
    height: 24,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    backgroundColor: '#9389FF',
    justifyContent: 'center',
    marginBottom: 6,
    marginLeft: 2,
  },
  majorText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: 'white',
  },
  infoText: {
    marginLeft: 4,
    fontFamily: 'Pretendard-Bold',
    fontSize: 12,
    lineHeight: 12,
    color: 'black',
  },
  settingView: {
    backgroundColor: '#F0F0F0',
    paddingLeft: 19,
    paddingRight: 19,
    paddingTop: 17,
    paddingBottom: 17,
    borderRadius: 20,
    marginBottom: 21,
  },
  settingInnerView: {
    flexDirection: 'row',
    // height: 77,
    width: '100%',
    marginBottom: 8,
  },
  settingLeftView: {
    // height: 77,
    flex: 1,
    justifyContent: 'center',
  },
  settingRightView: {
    justifyContent: 'center',
    // height: 77,
  },
  settingTitleView: {
    color: '#838383',
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 4,
  },
  settingTitleViewSub: {
    color: '#838383',
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    marginBottom: 4,
  },
  settingTextView: {
    color: '#979797',
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
  },
  settingTextViewBold: {
    color: '#979797',
    fontSize: 12,
    fontFamily: 'Pretendard-Bold',
  },
  linkView: {
    flex: 1,
  },
  linkItem: {
    flexDirection: 'row',
    paddingLeft: 18,
    paddingRight: 18,
  },
  linkLeft: {
    flex: 1,
  },
  linkRight: {
    // justifyContent: "center"
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E4E4E4',
    marginTop: 13,
    marginBottom: 13,
  },
  dividerView: {
    paddingLeft: 14,
    paddingRight: 14,
  },
});

export default SettingsScreen;
