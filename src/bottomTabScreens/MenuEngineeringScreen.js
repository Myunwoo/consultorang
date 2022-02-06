import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { theme } from '../variables/color';
import {statusBarHeight} from '../variables/scales';

const MenuEngineeringScreen = ({navigation}) => {
    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={styles.mainbody}>
            <View style={styles.headerSection}>
                <View style={styles.dateSection}>
                    <Text>Today</Text>
                    <Text>6/25 금요일</Text>
                </View>
                <View style={styles.weatherImgWrapper}>
                    <Text>대충 날씨 사진</Text>
                </View>
                <View style={styles.ringImgWrapper}>
                    <Text>대충 종 사진</Text>
                </View>
            </View>
            <View style={styles.selectSection}>

            </View>
            <View style={styles.graphSection}>

            </View>
            <View style={styles.resultSection}>

            </View>
        </LinearGradient>
    );
};

export default MenuEngineeringScreen;

const styles = StyleSheet.create({
    mainbody:{
        flex:1,
        paddingTop:statusBarHeight,
        justifyContent:'flex-end',
    },
    headerSection:{
        flexDirection:'row',
        height:'10%',
        maxHeight:64,
    },
    selectSection:{
        height:'10%',
        maxHeight:64,
    },
    graphSection:{
        flex:1,
    },
    resultSection:{
        height:'40%',
        maxHeight:240,
    }
});