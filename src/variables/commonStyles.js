import { theme } from '../variables/color';
import { StyleSheet } from 'react-native';
import {
    statusBarHeight,
    CONTENT_SECTION_BORDER_RADIUS,
    BASIC_SHADOW,
    SCREEN_HEIGHT, 
    BOTTOM_TAP_NAVIGATOR_HEIGHT_IOS,
    BOTTOM_TAP_NAVIGATOR_HEIGHT_ANDROID
} from '../variables/scales';

export const circleBtnProp=(defaultStyle ,target, setter, pressFunc)=>{
    return {
        style: target ? {...defaultStyle, backgroundColor:theme.registerBtnBlue} : {...defaultStyle,backgroundColor:theme.registerBtnCyan},
        onPressIn: () => setter(true),
        onPressOut: () => setter(false),
        onPress: pressFunc,
    };
};

export const commonStyles = StyleSheet.create({
    mainbody:{
        flex:1,
        paddingTop:statusBarHeight,
        justifyContent:'flex-end',
    },
    contentSection:{
        flex:1,
    },
    titleWrapper:{
        justifyContent:'flex-start',
        alignItems:'center',    
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        backgroundColor:theme.titleWrapperBlue,
        alignSelf:'flex-start',
        paddingHorizontal:15,
        height:30,
        ...Platform.select({
            ios: {
                paddingTop:2,
            },
            android: {
                paddingTop:1,
            },
        })
    },
    txtTitle:{
        color:'white',
        ...Platform.select({
            ios: {
                fontSize:20,
            },
            android: {
                fontSize:18,
            },
        })
    },
    contentWrapper:{
        zIndex:999,
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        width:'100%',
        flex:1,
        backgroundColor:theme.inputBackground2,
        alignItems:'center',
        paddingTop:15,
    },
});

export default commonStyles;