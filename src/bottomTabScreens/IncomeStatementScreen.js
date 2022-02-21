import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const IncomeStatementScreen = (({navigation}) => {
    return (
        <View style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center',}}>
            <Pressable onPress={() => navigation.replace('Auth')}>
                <Text>로그아웃</Text>
            </Pressable>
        </View>
    );
});

export default IncomeStatementScreen;