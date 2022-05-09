import { theme } from '../variables/color';
import { Platform, StyleSheet } from 'react-native';
import {
    statusBarHeight,
    CONTENT_SECTION_BORDER_RADIUS,
    BASIC_SHADOW,
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
        ...BASIC_SHADOW,
    },
    nonHeaderWrapper:{
        width:'100%',
        height:30,
    },
    realHeaderWrapper:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:60,
        flexDirection:'row',
    },
    navigateWrapper:{
        width:120,
        height:'100%',
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        backgroundColor:theme.inputBackground2,
        justifyContent:'center',
        alignItems:'center',
    },
    navigateInnerWrapper:{
        flex:1,
        width:'100%',
    },
    navigatePressable:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    titleWrapper:{
        justifyContent:'flex-start',
        alignItems:'center',    
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        backgroundColor:theme.titleWrapperBlue,
        alignSelf:'flex-start',
        paddingHorizontal:18,
        height:30,
        ...Platform.select({
            ios: {
                paddingTop:3,
            },
            android: {
                paddingTop:2,
            },
        })
    },
    txtTitle:{
        color:'white',
        ...Platform.select({
            ios: {
                fontSize:18,
            },
            android: {
                fontSize:16,
            },
        })
    },
    contentWrapper:{
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        width:'100%',
        flex:1,
        backgroundColor:theme.inputBackground2,
        alignItems:'center',
        zIndex:2,
    },
    commonTextShadow:{
        textShadowColor:'rgba(0,0,0,0.1)',
        textShadowOffset: {width:1, height: 1},
        textShadowRadius: 1,
    },
    historyScreenWrapper:{
        flex:1,
        width:'100%',
    }
});

export const modalStyles = StyleSheet.create({
    outside:{
        flex:1,
        width:'100%',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    mainbody:{
        width:'100%',
        flex:9,
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    headerWrapper:{
        width:'100%',
        height:70,
        backgroundColor:theme.loginBlue,
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        justifyContent:'center',
        paddingLeft:20,
    },
    txtHeader:{
        fontWeight:'bold',
        fontSize:20,
        color:'white',
    },
    contentOutterWrapper:{
        width:'100%',
        flex:9,
    },
    upperGuideWrapper:{
        width:'95%',
        marginVertical:16,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        padding:12,
        backgroundColor:'rgb(221,239,242)',
        ...Platform.select({
            ios: {
              shadowColor: "rgb(50, 50, 50)",
              shadowOpacity: 0.1,
              shadowRadius: 5,
              shadowOffset: {
                height: 1,
                width: 0,
              },
            },
            android: {
              elevation: 1,
            },
          })
    },
    upperGuideUnderRow:{
        flexDirection:'row',
        justifyContent:'space-evenly',
    },
    guideCircle:{
        backgroundColor:theme.primeCostOrange,
        paddingVertical:8,
        paddingHorizontal:20,
        borderRadius:24,
        justifyContent:'center',
        alignItems:'center',
        ...BASIC_SHADOW,
    },
    guideOperator:{
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:4,
    },
    txtOperator:{
        color:'grey',
        fontSize:20,
    },
    graphHeader:{
        justifyContent:'flex-start',
        alignItems:'center',
        width:'95%',
        flexDirection:'row',
        marginBottom:8,
    },
    graphWrapper:{
        width:'90%',
        height:220,
    },
    graphContentWrapper:{
        width:'100%',
        flex:1,
        borderBottomWidth:1,
        borderLeftWidth:1,
        borderBottomColor:theme.primeCostOrange,
        borderLeftColor:theme.primeCostOrange,
    },
    graphTopWrapper:{
        flex:5,
        width:'100%',
        flexDirection:'row',
    },
    graphBubbleWrapper:{
        alignItems:'center',
        width:'100%',
        position:'absolute',
    },
    graphTopInnerWrapper:{
        flex:1,
        height:'100%',
    },
    graphBottomWrapper:{
        flex:3,
        width:'100%',
        maxHeight:80,
        backgroundColor:theme.primeCostOrangeLight,
        justifyContent:'center',
        alignItems:'center',
    },
    graphBubble:{
        width:'90%',
        height:36,
        justifyContent:'center',
        alignItems:'center',
        marginTop:2,
    },
    txtGraphBottom:{
        fontSize:16,
        color:theme.primeCostOrange,
        ...commonStyles.commonTextShadow,
    },
    graphNumWrapper:{
        width:'100%',
        height:30,
        flexDirection:'row',
    },
    graphNumInnerWrapper:{
        flex:1,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    txtGraphNum:{
        ...commonStyles.commonTextShadow,
    },
    underGuideHeader:{
        marginVertical:12,
    },
    underGuiderWrapper:{
        width:'95%',
        backgroundColor:theme.inputBackground2,
        alignItems:'center',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    underGuideImgRow:{
        marginTop:12,
        flexDirection:'row',
        width:'90%',
        height:120,
    },
    imgWrapper:{
        height:100,
    },
    img:{
        resizeMode: 'contain',
        flex: 1,
        aspectRatio: 1
    },
    underGuideRow:{
        width:'95%',
        marginVertical:12,
        alignItems:'center',
    },
    underGuideTitleWrapper:{
        width:'90%',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        flexDirection:'row',
        backgroundColor:'teal',
        paddingVertical:8,
        alignItems:'center',
        marginBottom:12,
        ...BASIC_SHADOW,
    },
    caseWrapper:{
        marginLeft:12,
        marginRight:8,
        paddingHorizontal:4,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderWidth:1,
        borderColor:'white',
    },
    bottomInfoWrapper:{
        width:'90%',
        marginTop:20,
        marginBottom:60,
    },
    txtBottomInfo:{
        fontSize:16,
        lineHeight:22,
    },
    bubbleWrapper:{
        paddingHorizontal:12,
        paddingVertical:10,
        backgroundColor:'white',
        marginBottom:8,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        ...Platform.select({
            ios: {
              shadowColor: "rgb(50, 50, 50)",
              shadowOpacity: 0.1,
              shadowRadius: 5,
              shadowOffset: {
                height: 1,
                width: 0,
              },
            },
            android: {
              elevation: 1,
            },
          })
    },
    txtBubble:{
        ...commonStyles.commonTextShadow,
    },
    rowCompWrapper:{
        width:'100%',
        height:60,
        marginVertical:2,
    },
});

export default commonStyles;