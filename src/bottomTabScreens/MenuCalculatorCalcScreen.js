import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView, TextInput, Keyboard } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '../variables/color';
import {dateObject,CONTENT_SECTION_BORDER_RADIUS, BASIC_SHADOW} from '../variables/scales';

import commonStyles from '../variables/commonStyles';
import WeatherHeader from '../components/WeatherHeader';

const MenuCalculatorCalcScreen = (({navigation, route}) => {
    const {menuImg, menuName}=route.params;
    
    //console.log(navigation.getState());

    const handleCalc=()=>{

    };

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
                        <View style={styles.imgWrapper}>
                            <Image
                                resizeMode='contain'
                                style={{width:72, height:72,}}
                                source={menuImg}
                            >
                            </Image>
                        </View>
                        <View style={styles.menuNameWrapper}>
                            <Text>ddd</Text>
                            <Text>{menuName}</Text>
                            <Text>ddd</Text>
                        </View>
                        <View style={styles.contentWrapper}>
                            <View style={styles.btnCalcWrapper}>
                                <Pressable onPress={handleCalc} style={{width:'100%', height:'100%', justifyContent:'center',alignItems:'center',}}>
                                    <Text style={{color:'black', fontSize:20, fontWeight:'bold',}}>계산하기</Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </LinearGradient>
    );
});

export default MenuCalculatorCalcScreen;

const styles=StyleSheet.create({
    scrollview:{
        alignItems:'center',
    },
    imgWrapper:{
        width:'100%',
        height:200,
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        backgroundColor:theme.backgroundGrey,
        justifyContent:'center',
        alignItems:'center',
    },
    menuNameWrapper:{
        backgroundColor:'white',
        width:'80%',
        height:48,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        transform: [{translateY: -24}],
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:12,
        ...BASIC_SHADOW,
    },
    inputWrapper:{
        flex:1,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    contentWrapper:{
        width:'100%',
        paddingHorizontal:20,
    },
    stepWrapper:{
        width:80,
        height:28,
        borderColor:theme.loginBlue,
        borderWidth:1,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        justifyContent:'center',
        alignItems:'center',
        marginTop:8,
    },
    stepTitleWrapper:{
        marginTop:8,
    },
    stepContentWrapper:{
        marginTop:8,
    },
    btnIngreOutterWrapper:{
        width:'100%',
        height:80,
        backgroundColor:theme.titleWrapperBlue,
        marginTop:16,
        marginBottom:12,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        ...BASIC_SHADOW,
        justifyContent:'center',
        alignItems:'center',
    },
    btnIngre:{
        width:'100%',
        height:'100%',
        alignItems:'center',
    },
    btnIngreInner:{
        height:'100%',
        width:'60%',
        maxWidth:220,
        justifyContent:'center',
        alignItems:'center',
    },
    ingreScrollView:{
        marginTop:8,
        width:'100%',
        height:260,
        backgroundColor:'white',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        ...BASIC_SHADOW,
    },
    btnCalcWrapper:{
        width:'80%',
        height:44,
        backgroundColor:theme.torangYellow,
        marginTop:20,
        marginBottom:12,
        alignSelf:'center',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        ...BASIC_SHADOW,
    },
});