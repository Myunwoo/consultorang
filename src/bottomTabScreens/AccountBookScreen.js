import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { theme } from '../variables/color';
import {dateObject, statusBarHeight,CONTENT_SECTION_BORDER_RADIUS, BASIC_SHADOW, SCREEN_HEIGHT, WEATHER_LIST} from '../variables/scales';

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
                <View style={styles.contentOutterWrapper}>
                    
                </View>
            </View>
        </LinearGradient>
    );
});

export default AccountBookScreen;

const styles=StyleSheet.create({
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
    contentOutterWrapper:{
        position:'absolute',
        top:30,
        left:0,
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        width:'100%',
        height:'100%',
        backgroundColor:theme.inputBackground2,
    },
    
});