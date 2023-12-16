import React, {useState, useEffect} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {WebView} from 'react-native-webview';

import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from 'react-native';

import size from '../constants/size';
import Back from '../../assets/svg/back.svg';
import Loading from '../components/Loading';

const RealEstateSearchScreen = () => {
  const navigation = useNavigation();
  // const [searchText, setSearchText] = useState('');
  // const [addressList, setAddressList] = useState('');
  const [url, setUrl] = useState('https://orderitr2.ssu.today/index.html');
  const [isLoading, setIsLoading] = useState(true);
  const [webViewReady, setWebViewReady] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  // useEffect(() => {
  //   // 3초 후 로딩 화면 숨김
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  // webView를 refresh
  useFocusEffect(
    React.useCallback(() => {
      setWebViewReady(false);
      requestAnimationFrame(() => {
        setWebViewReady(true);
      });
    }, []),
  );

  // WebView 로드 완료시 로딩 상태 변경
  const handleWebViewLoad = () => {
    setIsLoading(false);
  };

  // Kakao Rest API 활용 -> https://developers.kakao.com/docs/latest/ko/local/dev-guide
  /*
  const handleSearch = async () => {
    const apiKey = '발급받은 apiKey 기입';
    const query = searchText;

    // fetch함수 : HTTP 클라이언트 사용하여 카카오지도 API 호출
    // API URL: https://dapi.kakao.com/v2/local/search/address.json (카카오 주소 검색 API의 엔드포인트)
    try {
      const response = await fetch(
        // encodeURIComponent 함수 : URL에서 사용할 수 없는 문자를 적절하게 인코딩
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
          query,
        )}`,
        {
          // 애플리케이션(이하 앱) REST API 키를 헤더에 담아 GET으로 요청
          method: 'GET',
          headers: {
            Authorization: `KakaoAK ${apiKey}`,
          },
        },
      );
      // 응답은 JSON과 XML 형식을 지원. 요청 시 URL의 ${FORMAT} 부분에 원하는 응답 형식을 지정할 수 있음.
      // (별도로 포맷을 지정하지 않은 경우 응답은 JSON 형식으로 반환)
      const data = await response.json();
      console.log(data.meta);
      console.log(data.documents);

      setAddressList(data.documents); // 검색 결과를 상태에 저장.
      navigation.navigate('RealEstateSearchResultScreen', {
        addressList: data.documents,
      });
    } catch (error) {
      console.error(error);
    }
  };
  */

  return (
    <Pressable style={styles.mainView} onPress={() => Keyboard.dismiss()}>
      {isLoading && <Loading />}
      <View style={styles.headerView}>
        <TouchableOpacity style={styles.backView} onPress={handleGoBack}>
          <Back width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.titleText}>주소 검색</Text>
      </View>

      <View style={styles.containerView}>
        {/* <View style={styles.searchViewOuter}>
          <View style={styles.searchView}>
            <View style={styles.searchViewInner}>
              <TextInput
                style={styles.searchTextInput}
                clearButtonMode={'while-editing'}
                placeholder="주소를 입력하세요."
                value={searchText}
                onChangeText={setSearchText}
                // onSubmitEditing={}
              />
              <TouchableOpacity
                style={{justifyContent: 'center'}}
                onPress={handleSearch}>
                <Search />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View> */}
        {webViewReady && (
          <WebView
            source={{uri: url}}
            style={{flex: 1, width: '100%'}}
            onLoad={handleWebViewLoad}
            onMessage={event => {
              navigation.navigate('RealEstateSearchDetailScreen', {
                addressList: JSON.parse(event.nativeEvent.data),
              });
            }}
          />
        )}
      </View>
    </Pressable>
  );
};

export default RealEstateSearchScreen;

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
