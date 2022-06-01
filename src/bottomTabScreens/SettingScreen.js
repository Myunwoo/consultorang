import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {statusBarHeight} from '../variables/scales';

import { theme } from '../variables/color';
import SettingItem from '../components/SettingItem';

const Divider=()=>{
    return(<View style={styles.divider}></View>)
}

const SettingScreen = ({navigation}) => {
    //내 정보 화면으로 이동
    const myInfo=()=>{
        navigation.navigate('SettingUserInfo');
    }
    //로그아웃 함수
    const logout=()=>{
        AsyncStorage.clear();
        navigation.replace('Auth');
    };

    return (
        <View style={styles.mainbody}>
            <Divider></Divider>
            <SettingItem text={'내 정보'} func={myInfo}></SettingItem>
            <Divider></Divider>
            <SettingItem text={'로그아웃'} func={logout}></SettingItem>
            <Divider></Divider>
        </View>
    );
}

export default SettingScreen;

const styles = StyleSheet.create({
    mainbody:{
        width:'100%',
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        paddingTop:statusBarHeight,
    },
    divider:{
        width:'100%',
        height:1,
        backgroundColor:theme.uncheckedGrey,
    }
});