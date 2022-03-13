import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '../variables/color';
import {dateObject, statusBarHeight,CONTENT_SECTION_BORDER_RADIUS, BASIC_SHADOW, SCREEN_HEIGHT, WEATHER_LIST} from '../variables/scales';

import WeatherHeader from '../components/WeatherHeader';

const MenuCalculatorScreen = (({navigation}) => {
    const {month, date, dateString}=dateObject();
    const temp=()=>{
        navigation.replace('Auth');
        AsyncStorage.setItem('autoLogin', 'false');
        AsyncStorage.setItem('emailSave', 'false');
    }

    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={styles.mainbody}>
            <WeatherHeader></WeatherHeader>
            <View style={styles.tt}>
            <Pressable onPress={temp}>
                <Text>로그아웃</Text>
            </Pressable>
            </View>
        </LinearGradient>
    );
});

export default MenuCalculatorScreen;

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
    tt:{
        flex:1,
    },
});