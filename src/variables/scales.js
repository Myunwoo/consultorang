import { getStatusBarHeight } from 'react-native-status-bar-height';
import {StatusBar, Dimensions, Platform} from 'react-native';

//상태표시줄 높이
let sh=getStatusBarHeight(true);
if(sh===0){
    sh=StatusBar.currentHeight;
}
export const statusBarHeight = sh;

//화면 너비
export const { width:SCREEN_WIDTH } = Dimensions.get("window");

export const CONTENT_SECTION_BORDER_RADIUS=15;

export const BASIC_SHADOW=Platform.select({
    ios: {
      shadowColor: "rgb(50, 50, 50)",
      shadowOpacity: 0.2,
      shadowRadius: 5,
      shadowOffset: {
        height: -1,
        width: 0,
      },
    },
    android: {
      elevation: 1,
    },
  })