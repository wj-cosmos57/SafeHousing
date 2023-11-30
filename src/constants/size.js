import {NativeModules, Dimensions} from 'react-native';
const {StatusBarManager} = NativeModules;

// screen의 폭과 높이를 가져와서 반응형으로 header를 만듬
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const STATUSBAR_HEIGHT = StatusBarManager.HEIGHT;

export default {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUSBAR_HEIGHT,
};
