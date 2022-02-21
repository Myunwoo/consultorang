import React from 'react';
import { Pressable, StyleSheet, Text, View, } from 'react-native';

import { theme } from '../variables/color';
import { BASIC_SHADOW } from '../variables/scales';


    // 특이사항
    // 1. handlePress —> 눌렀을때 저 까만 색이 되도록 한번 뷰를 만들어 보세요.
    // 2. Today —> true이면 까맣도록
const handlePress = () => {
    console.log('나 눌렸음 ');
};

const HyeSun = (arg) => {
    const {width, height, date, day}=arg.source;
      
    return (
        <View style={{width, height,backgroundColor:'tomato',borderRadius:15, ...BASIC_SHADOW}}>
            <Pressable style={styles.pressable} onPress={handlePress}>
            <View style={styles.dotWrapper}>
                <View style={styles.redDot}></View>
            </View>
            <View style={styles.numWrapper}>
                <Text>{day}</Text>
            </View>
            <View style={styles.dateWrapper}>
                <Text>{date}</Text>
            </View>
            </Pressable>
        </View>
    );
}

export default HyeSun;

const styles = StyleSheet.create({
    pressable:{
        width:'100%',
        height:'100%',
    },
    dotWrapper:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        height:16,
        width:'100%',
        marginTop:2,
    },
    numWrapper:{
        alignItems:'center',
        flex:2,
    },
    dateWrapper:{
        alignItems:'center',
        flex:3,
    },
    redDot:{
        width:8,
        height:8,
        borderRadius:10,
        backgroundColor:'red',
    },
});