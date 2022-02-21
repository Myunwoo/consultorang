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

const commonStyles = StyleSheet.create({
    mainbody:{
        flex:1,
        paddingTop:statusBarHeight,
        justifyContent:'flex-end',
    },
    headerSection:{
        flexDirection:'row',
        height:'7%',
        maxHeight:64,
        marginHorizontal:'5%',
        alignItems:'center',
    },
    dateSection:{
        flexDirection:'row',
        marginRight:8,
    },
    dateWrapper:{
        alignItems:'center',
        marginRight:8,
    },
    dayWrapper:{
        justifyContent:'center',
        marginRight:8,
    },
    weatherImgWrapper:{

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