import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView, TextInput, Keyboard } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '../variables/color';
import {dateObject,CONTENT_SECTION_BORDER_RADIUS, BASIC_SHADOW} from '../variables/scales';

import commonStyles from '../variables/commonStyles';
import WeatherHeader from '../components/WeatherHeader';

import ModalComponent from '../modals/ModalComponent';
import IngreModal from '../modals/IngreModal';

const MenuCalculatorScreen = (({navigation}) => {
    const [menuImg, setMenuImg]=useState(require('../../image/calc_placeholder.png'));
    const [menuName, setMenuName]=useState('');
    const [ingreVisible, setIngreVisible]=useState(false);
    const [ingreArr, setIngreArr]=useState([]);

    const handleIngre=()=>{
        if(menuName===''){
            alert('메뉴 이름을 먼저 입력해 주세요.');
            return;
        }
        setIngreVisible(true);
    };

    const handleApply=()=>{
        // if(ingreArr.length<=0){
        //     alert('재료를 추가하지 않았습니다.');
        //     return;
        // }
        navigation.navigate('MenuCalculatorCalcScreen', { menuImg, menuName });
    };

    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={commonStyles.mainbody}>
            <ModalComponent showModal={ingreVisible} setShowModal={setIngreVisible}>
                <IngreModal setSendObj={setIngreArr} showModal={ingreVisible} setShowModal={setIngreVisible}></IngreModal>
            </ModalComponent>
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
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(txt) => setMenuName(txt)}
                                placeholder={'메뉴 이름을 입력 해 주세요'}
                                placeholderTextColor={theme.placeholderColor}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                                maxLength={20}
                                multiline={false}
                            />
                            <Text>ddd</Text>
                        </View>
                        <View style={styles.contentWrapper}>
                            <View style={styles.stepWrapper}>
                                <Text style={{color:theme.loginBlue}}>STEP 1</Text>
                            </View>
                            <View style={styles.stepTitleWrapper}>
                                <Text style={{color:theme.loginBlue, fontWeight:'bold', fontSize:24,}}>식재료 원가 구하기</Text>
                            </View>
                            <View style={styles.stepContentWrapper}>
                                <Text>메뉴에 사용되는 재료와 용량을 알려주세요.</Text>
                                <Text>원가는 ~~~ 을 바탕으로 자동 계산됩니다.</Text>
                            </View>
                            <View style={styles.btnIngreOutterWrapper}>
                                <Pressable onPress={handleIngre} style={styles.btnIngre}>
                                    <View style={styles.btnIngreInner}>
                                        <Image
                                            resizeMode='contain'
                                            style={{width:72, height:72, position:'absolute', left:0}}
                                            source={require('../../image/account_cart.png')}
                                        >   
                                        </Image>
                                        <Text style={{color:'white', fontSize:24, fontWeight:'bold',}}>식재료 담기</Text>
                                    </View>
                                </Pressable>
                            </View>
                            <View style={styles.stepWrapper}>
                                <Text style={{color:theme.loginBlue}}>STEP 2</Text>
                            </View>
                            <View style={styles.stepTitleWrapper}>
                                <Text style={{color:theme.loginBlue, fontWeight:'bold', fontSize:24,}}>재료 확인</Text>
                            </View>
                            <View style={styles.stepContentWrapper}>
                                <Text>입력한 재료가 맞는지 다시 한 번 확인 해 주세요.</Text>
                                <Text>정확한 원가계산은 가격결정의 핵심입니다.</Text>
                            </View>
                            <ScrollView style={styles.ingreScrollView}>

                            </ScrollView>
                            <View style={styles.btnApplyWrapper}>
                                <Pressable onPress={handleApply} style={{width:'100%', height:'100%', justifyContent:'center',alignItems:'center',}}>
                                    <Text style={{color:'white', fontSize:20, fontWeight:'bold',}}>확인</Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </LinearGradient>
    );
});

export default MenuCalculatorScreen;

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
    btnApplyWrapper:{
        width:'80%',
        height:44,
        backgroundColor:theme.titleWrapperBlue,
        marginTop:20,
        marginBottom:12,
        alignSelf:'center',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        ...BASIC_SHADOW,
    },
});