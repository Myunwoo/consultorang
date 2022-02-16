import React from 'react';
import { Platform, StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { theme } from '../variables/color';
import {
    dateObject,
    statusBarHeight,
    CONTENT_SECTION_BORDER_RADIUS,
    BASIC_SHADOW,
    SCREEN_HEIGHT, 
    WEATHER_LIST,
    BOTTOM_TAP_NAVIGATOR_HEIGHT_IOS,
    BOTTOM_TAP_NAVIGATOR_HEIGHT_ANDROID
} from '../variables/scales';

import WeatherComponent from '../components/WeatherComponent';

const AccountBookScreen = (({navigation}) => {
    const {month, date, dateString}=dateObject();

    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={styles.mainbody}>
            <View style={styles.headerSection}>
                <View style={styles.dateSection}>
                    <View style={styles.dateWrapper}>
                        <Text style={{fontSize:12,color:'white',}}>Today</Text>
                        <Text style={{fontSize:16,color:'white',}}>{`${month}/${date}`}</Text>
                    </View>
                    <View style={styles.dayWrapper}>
                        <Text style={{fontWeight:'bold',fontSize:20,color:theme.engineeringYellow,}}>{dateString}</Text>
                    </View>
                </View>
                <View style={styles.weatherImgWrapper}>
                    {/* 날씨 api와의 연동에서 한 번 더 고민 필요 */}
                    <WeatherComponent 
                        source={{size:(SCREEN_HEIGHT*0.06) > 60 ? 60 : (SCREEN_HEIGHT*0.06)}}>    
                    </WeatherComponent>
                </View>
            </View>
            <View style={styles.contentSection}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.txtTitle}>월간 가계부</Text>
                </View>
                <View style={styles.contentWrapper}>
                    <View style={styles.calendarWrapper}>
                        {/* 혜선's 컴포넌트 넣어볼 위치 */}
                    </View>
                    <View style={styles.accountTitleWrapper}>
                        <Text style={styles.txtAccountTitle}>이번 달 수입/지출 내역을 손쉽게 입력해보세요!</Text>
                    </View>
                    <View style={styles.accountWrapper}>
                        <View style={styles.btnIncomeWrapper}>
                            <Pressable style={styles.btnIncome} onPress={() => navigation.navigate('IncomeScreen')}>
                                <View style={styles.pmWrapper}><Text style={styles.txtPm}>+</Text></View>
                                <View style={styles.ieWrapper}><Text style={styles.txtIe}>수익</Text></View>
                                <Image
                                    resizeMode='contain'
                                    style={{width:'70%', height:'70%', position:'absolute', bottom:-20, right:-4,}}
                                    source={require('../../image/account_fork.png')}
                                >
                                </Image>
                            </Pressable>
                        </View>
                        <View style={{width:12, height:'100%',}}></View>
                        <View style={styles.btnExpenditureWrapper}>
                            <Pressable style={styles.btnExpenditure} onPress={() => navigation.navigate('ExpenditureScreen')}>
                                <View style={styles.pmWrapper}><Text style={styles.txtPm}>-</Text></View>
                                <View style={styles.ieWrapper}><Text style={styles.txtIe}>지출</Text></View>
                                <Image
                                    resizeMode='contain'
                                    style={{width:'70%', height:'70%', position:'absolute', bottom:-20, right:-4,}}
                                    source={require('../../image/account_cart.png')}
                                >
                                </Image>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.excelWrapper}>
                        <View style={styles.btnExcelWrapper}>
                            <Pressable style={styles.btnExcel} onPress={() => navigation.navigate('ExcelSendScreen')}>
                                <Text style={styles.txtExcel}>이번 달 엑셀 추가</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.memoWrapper}>
                        <View style={styles.memoInnerWrapper}>
                            <Text>들어갈 내용 미정</Text>
                        </View>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
});

export default AccountBookScreen;

const styles=StyleSheet.create({
    mainbody:{
        height:SCREEN_HEIGHT,
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
        width:'30%',
        maxWidth:120,
        height:60,
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
        position:'absolute',
        top:30,
        left:0,
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        width:'100%',
        height:'100%',
        backgroundColor:theme.inputBackground2,
        alignItems:'center',
        paddingTop:15,
        // ...Platform.select({
        //     ios:{
        //         height:SCREEN_HEIGHT-(SCREEN_HEIGHT*0.07)-BOTTOM_TAP_NAVIGATOR_HEIGHT_IOS-statusBarHeight,
        //     },
        //     android:{
        //         height:SCREEN_HEIGHT-(SCREEN_HEIGHT*0.07)-BOTTOM_TAP_NAVIGATOR_HEIGHT_ANDROID-statusBarHeight,
        //     }
        // })
    },
    calendarWrapper:{
        width:'90%',
        height:64,
        backgroundColor:'teal',
    },
    accountTitleWrapper:{
        marginTop:4,
        width:'90%',
        height:34,
        justifyContent:'center',
        paddingLeft:12,
    },
    txtAccountTitle:{
        fontWeight:'bold',
    },
    accountWrapper:{
        width:'90%',
        flex:5,
        maxHeight:240,
        flexDirection:'row',
    },
    btnIncomeWrapper:{
        flex:1,
        backgroundColor:theme.btnIncomeRed,
        borderRadius:15,
    },
    btnIncome:{
        width:'100%',
        height:'100%',
    },
    btnExpenditureWrapper:{
        flex:1,
        backgroundColor:theme.btnExpenditureBlue,
        borderRadius:15,
    },
    btnExpenditure:{
        width:'100%',
        height:'100%',
    },
    pmWrapper:{
        position:'absolute',
        top:28,
        left:28,
    },
    ieWrapper:{
        position:'absolute',
        bottom:28,
        right:28,
    },
    txtPm:{
        color:'white',
        fontSize:24,
        fontWeight:'bold',
    },
    txtIe:{
        color:'white',
        fontSize:24,
        fontWeight:'bold',
    },
    excelWrapper:{
        width:'100%',
        flex:2,
        maxHeight:100,
        justifyContent:'center',
        alignItems:'center',
    },
    btnExcelWrapper:{
        width:'90%',
        height:'90%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:theme.torangYellow,
        borderRadius:15,
    },
    btnExcel:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    txtExcel:{
        color:'white',
        fontSize:24,
        fontWeight:'bold',
    },
    memoWrapper:{
        width:'90%',
        flex:7,
        justifyContent:'flex-start',
    },
    memoInnerWrapper:{
        justifyContent:'center',
        alignItems:'center',
        height:'80%',
        borderRadius:15,
        backgroundColor:'white',
    },
});