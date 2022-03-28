import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView,  } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { theme } from '../variables/color';
import {CONTENT_SECTION_BORDER_RADIUS, BASIC_SHADOW} from '../variables/scales';

import commonStyles from '../variables/commonStyles';
import WeatherHeader from '../components/WeatherHeader';

const MenuCalculatorHistory = (({navigation, route}) => {
    const {img, name, date}=route.params;

    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={commonStyles.mainbody}>
            <WeatherHeader></WeatherHeader>
            <View style={commonStyles.contentSection}>
                <View style={commonStyles.titleWrapper}>
                    <Text style={commonStyles.txtTitle}>메뉴 가격 계산기</Text>
                </View>       
                <View style={{width:50, height:50, backgroundColor:theme.titleWrapperBlue, position:'absolute', top:30, left:0, zIndex:1}}></View>
                <View style={commonStyles.contentWrapper}>
                    <ScrollView style={{width:'100%',}} contentContainerStyle={styles.scrollview}>
                        <Text>{img}</Text>
                        <Text>{name}</Text>
                        <Text>{date}</Text>
                    </ScrollView>
                </View>
            </View>
        </LinearGradient>
    );
});

export default MenuCalculatorHistory;

const styles=StyleSheet.create({
    scrollview:{
        alignItems:'center',
    },
});