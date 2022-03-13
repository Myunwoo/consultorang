import { getStatusBarHeight } from 'react-native-status-bar-height';
import {StatusBar, Dimensions, Platform} from 'react-native';

//상태표시줄 높이
let sh=getStatusBarHeight(true);
if(sh===0){
    sh=StatusBar.currentHeight;
}
export const statusBarHeight = sh;
export const BOTTOM_TAP_NAVIGATOR_HEIGHT_IOS=80;
export const BOTTOM_TAP_NAVIGATOR_HEIGHT_ANDROID=50;

//화면 크기
export const { width:SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get("window");

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
    elevation: 2,
  },
});

export const dateObject = () => {
  const today=new Date();
  const year=today.getFullYear();
  const month=today.getMonth()+1;
  const date=today.getDate();
  const day=today.getDay();
  const yyyymmdd=`${year}${month >= 10 ? month : '0' + month}${date >= 10 ? date : '0' + date}`;
  let dateString=''
  switch(day){
      case 0:
          dateString='일요일';
          break;
      case 1:
          dateString='월요일';
          break;
      case 2:
          dateString='화요일';
          break;
      case 3:
          dateString='수요일';
          break;
      case 4:
          dateString='목요일';
          break;
      case 5:
          dateString='금요일';
          break;
      case 6:
          dateString='토요일';
          break;
  }
  return {year, month,date, dateString, yyyymmdd};
}
