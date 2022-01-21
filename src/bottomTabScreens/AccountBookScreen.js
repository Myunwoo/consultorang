import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const AccountBookScreen = (({navigation}) => {
    const press=()=>{
        //실제 로그아웃 기능에선 토큰, 자동로그인여부, 아이디 저장여부, 아이디 및 비번을 말소시켜야 동작이 올바를 듯.
        navigation.replace('Auth');
    };

    return (
        <View>
            <Pressable style={styles.temp} onPress={press}>
                <Text>로그아웃</Text>
            </Pressable>
            <Text>월간 가계부 페이지</Text>
        </View>
    );
});

export default AccountBookScreen;

const styles = StyleSheet.create({
    temp:{
        width:300,
        height:300,
    }
  });