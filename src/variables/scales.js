import { getStatusBarHeight } from 'react-native-status-bar-height';
import {StatusBar, Dimensions} from 'react-native';

//상태표시줄 높이
let sh=getStatusBarHeight(true);
if(sh===0){
    sh=StatusBar.currentHeight;
}
export const statusBarHeight = sh;

//화면 너비
export const { width:SCREEN_WIDTH } =Dimensions.get("window");