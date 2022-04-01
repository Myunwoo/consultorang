import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '../variables/color';

const SettingScreen = ({navigation}) => {
    //로그아웃 함수
    const temp=()=>{
        navigation.replace('Auth');
        AsyncStorage.setItem('autoLogin', 'false');
        AsyncStorage.setItem('emailSave', 'false');
        AsyncStorage.clear();
    };

    return (
        <View style={styles.mainbody}>
            <Pressable onPress={temp} style={styles.tt}></Pressable>
        </View>
    );
}

export default SettingScreen;

const styles = StyleSheet.create({
    mainbody:{
        width:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    tt:{
        width:50,
        height:50,
        backgroundColor:'red',
    },
});