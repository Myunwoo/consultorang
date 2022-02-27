import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const IncomeStatementScreen = (({navigation}) => {
    const temp=()=>{
        navigation.replace('Auth');
        AsyncStorage.setItem('autoLogin', 'false');
        AsyncStorage.setItem('emailSave', 'false');
    }

    return (
        <View style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center',}}>
            <Pressable onPress={temp}>
                <Text>로그아웃</Text>
            </Pressable>
        </View>
    );
});

export default IncomeStatementScreen;