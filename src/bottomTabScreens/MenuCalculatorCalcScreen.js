import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView, TextInput, Keyboard } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { theme } from '../variables/color';
import {CONTENT_SECTION_BORDER_RADIUS, BASIC_SHADOW} from '../variables/scales';

import commonStyles from '../variables/commonStyles';
import WeatherHeader from '../components/WeatherHeader';
import CalcSelectBtn from '../components/CalcSelectBtn';
import MenuCalculatorHistoryScreen from './MenuCalculatorHistoryScreen';

const TYPE=[
    {text:'메뉴 가격 계산기'},
    {text:'목록'}
];

const MenuCalculatorCalcScreen = (({navigation, route}) => {
    const {menuImg, menuName}=route.params;
    const [human, setHuman]=useState('시급');
    const [numHuman, setNumHuman]=useState('');
    const [time, setTime]=useState('분');
    const [numTime, setNumTime]=useState('');
    const [count, setCount]=useState('인분');
    const [numCount, setNumCount]=useState('');
    const [type, setType]=useState(TYPE[0].text);

    const handleCalc=()=>{
        if(isNaN(numHuman) || numHuman==='0' || numHuman===''){
            alert('시급/월급을 올바르게 입력해주세요.');
            return;
        }
        if(isNaN(numTime) || numTime==='0' || numTime===''){
            alert('분/시간을 올바르게 입력해주세요.');
            return;
        }
        if(isNaN(numCount) || numCount==='0' || numCount===''){
            alert('인분/개를 올바르게 입력해주세요.');
            return;
        }
        navigation.navigate('MenuCalculatorResultScreen', { menuName });
    };

    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={commonStyles.mainbody}>
            <WeatherHeader></WeatherHeader>
            <View style={commonStyles.nonHeaderWrapper}>
                <View style={commonStyles.realHeaderWrapper}>
                    <View style={type===TYPE[0].text?{...commonStyles.navigateWrapper,zIndex:1,}:{...commonStyles.navigateWrapper, backgroundColor:theme.titleWrapperBlue}}>
                        <View style={commonStyles.navigateInnerWrapper}>
                            <Pressable onPress={()=>setType(TYPE[0].text)} style={commonStyles.navigatePressable}><Text style={type===TYPE[0].text? {color:theme.checkedBlue} : {color:'white'} }>메뉴 가격 계산기</Text></Pressable>
                        </View>
                        <View style={commonStyles.navigateInnerWrapper}></View>
                    </View>
                    <View style={type===TYPE[0].text?{...commonStyles.navigateWrapper, position:'absolute', left:110,backgroundColor:theme.titleWrapperBlue}:{...commonStyles.navigateWrapper,zIndex:1, position:'absolute', left:110,backgroundColor:theme.inputBackground2}}>
                        <View style={commonStyles.navigateInnerWrapper}>
                            <Pressable onPress={()=>setType(TYPE[1].text)} style={commonStyles.navigatePressable}><Text style={type===TYPE[0].text? {color:'white'} : {color:theme.checkedBlue} }>가격 히스토리</Text></Pressable>
                        </View>
                        <View style={commonStyles.navigateInnerWrapper}></View>
                    </View>
                </View> 
            </View>
            <View style={commonStyles.contentSection}>
                <View style={commonStyles.contentWrapper}>
                    {type===TYPE[0].text 
                    ? <ScrollView style={{width:'100%',}} contentContainerStyle={styles.scrollview}>
                        <View style={styles.imgWrapper}>
                            <Image
                                resizeMode='contain'
                                style={{width:72, height:72,}}
                                source={menuImg}
                            >
                            </Image>
                        </View>
                        <View style={styles.menuNameWrapper}>
                            <View style={{flexDirection:'row', height:'100%', width:5, justifyContent:'space-between', alignItems:'center'}}>
                                <View style={{width:1, height:'20%',backgroundColor:theme.titleWrapperBlue}}></View>
                                <View style={{width:1, height:'30%',backgroundColor:theme.titleWrapperBlue}}></View>
                            </View>
                            <Text>ddd</Text>
                            <View style={{flexDirection:'row', height:'100%', width:5, justifyContent:'space-between', alignItems:'center'}}>
                                <View style={{width:1, height:'30%',backgroundColor:theme.titleWrapperBlue}}></View>
                                <View style={{width:1, height:'20%',backgroundColor:theme.titleWrapperBlue}}></View>
                            </View>
                        </View>
                        <View style={styles.contentWrapper}>
                        <View style={styles.stepWrapper}>
                                <Text style={{color:theme.loginBlue}}>STEP 3</Text>
                            </View>
                            <View style={styles.stepTitleWrapper}>
                                <Text style={{color:theme.loginBlue, fontWeight:'bold', fontSize:24,}}>직접 인건비 구하기</Text>
                            </View>
                            <View style={styles.smallTitleWrapper}>
                                <Image
                                    resizeMode='contain'
                                    style={styles.smallTitleImg}
                                    source={require('../../image/calc_human.png')}
                                >
                                </Image>
                                <Text style={styles.smallTitle}>직접 인건비</Text>
                            </View>
                            <View style={styles.infoWrapper}>
                                <Text>메뉴 생산에 참여하는 인원(근무하는 모든 인원수 아님)</Text>
                            </View>
                            <View style={styles.smallContentWrapper}>
                                <View style={styles.calcCompWrapper}><CalcSelectBtn source={{prop:human,setter:setHuman,title:'시급',}}></CalcSelectBtn></View>
                                <View style={styles.calcCompWrapper}><CalcSelectBtn source={{prop:human,setter:setHuman,title:'월급',}}></CalcSelectBtn></View>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(txt) => setNumHuman(txt)}
                                    placeholder={'시급을 입력해 주세요'}
                                    placeholderTextColor={theme.placeholderColor}
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                    underlineColorAndroid="#f000"
                                    keyboardType={'numeric'}
                                    returnKeyType="next"
                                    maxLength={20}
                                    multiline={false}
                                    textAlign={'center'}
                                />
                                <View style={styles.smallTxtWrapper}>
                                    <Text numberOfLines={1} adjustsFontSizeToFit={true} style={styles.txtSmall}>원의</Text>
                                </View>
                            </View>
                            <View style={{...styles.smallContentWrapper, justifyContent:'flex-end'}}>
                                <View style={styles.smallTxtWrapper}>
                                    <Text numberOfLines={1} adjustsFontSizeToFit={true} style={styles.txtSmall}>직원</Text>
                                </View>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(txt) => setNumHuman(txt)}
                                    placeholder={'시급을 입력해 주세요'}
                                    placeholderTextColor={theme.placeholderColor}
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                    underlineColorAndroid="#f000"
                                    keyboardType={'numeric'}
                                    returnKeyType="next"
                                    maxLength={20}
                                    multiline={false}
                                    textAlign={'center'}
                                />
                                <View style={styles.smallTxtWrapper}>
                                    <Text numberOfLines={1} adjustsFontSizeToFit={true} style={styles.txtSmall}>명이</Text>
                                </View>
                            </View>
                            <View style={{width:'100%', height:1, backgroundColor:theme.backgroundGrey,}}></View>
                            <View style={styles.smallTitleWrapper}>
                                <Image
                                    resizeMode='contain'
                                    style={styles.smallTitleImg}
                                    source={require('../../image/calc_time.png')}
                                >
                                </Image>
                                <Text style={styles.smallTitle}>조리 시간</Text>
                            </View>
                            <View style={styles.infoWrapper}>
                                <Text>1일 영업 중, 해당 메뉴 생산에 할애하는 대략적인 시간</Text>
                            </View>
                            <View style={styles.smallContentWrapper}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(txt) => setNumTime(txt)}
                                    placeholder={'시간을 입력해 주세요.'}
                                    placeholderTextColor={theme.placeholderColor}
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                    underlineColorAndroid="#f000"
                                    keyboardType={'numeric'}
                                    returnKeyType="next"
                                    maxLength={20}
                                    multiline={false}
                                    textAlign={'center'}
                                />
                                <View style={styles.calcCompWrapper}><CalcSelectBtn source={{prop:time,setter:setTime,title:'분',}}></CalcSelectBtn></View>
                                <View style={styles.calcCompWrapper}><CalcSelectBtn source={{prop:time,setter:setTime,title:'시간',}}></CalcSelectBtn></View>
                                <View style={styles.smallTxtWrapper}>
                                    <Text numberOfLines={1} adjustsFontSizeToFit={true} style={{fontSize:18}}>동안</Text>
                                </View>
                            </View>
                            <View style={{width:'100%', height:1, backgroundColor:theme.backgroundGrey,}}></View>
                            <View style={styles.smallTitleWrapper}>
                                <Image
                                    resizeMode='contain'
                                    style={styles.smallTitleImg}
                                    source={require('../../image/calc_count.png')}
                                >
                                </Image>
                                <Text style={styles.smallTitle}>완성 개수</Text>
                            </View>
                            <View style={styles.infoWrapper}>
                                <Text>1일 영업 중, 해당 메뉴의 총 생산량</Text>
                            </View>
                            <View style={styles.smallContentWrapper}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(txt) => setNumCount(txt)}
                                    placeholder={'인분/개를 입력해 주세요.'}
                                    placeholderTextColor={theme.placeholderColor}
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                    underlineColorAndroid="#f000"
                                    keyboardType={'numeric'}
                                    returnKeyType="next"
                                    maxLength={20}
                                    multiline={false}
                                    textAlign={'center'}
                                />
                                <View style={styles.calcCompWrapper}><CalcSelectBtn source={{prop:count,setter:setCount,title:'인분',}}></CalcSelectBtn></View>
                                <View style={styles.calcCompWrapper}><CalcSelectBtn source={{prop:count,setter:setCount,title:'개',}}></CalcSelectBtn></View>
                                <View style={styles.smallTxtWrapper}>
                                    <Text numberOfLines={1} adjustsFontSizeToFit={true} style={{fontSize:18}}>만듭니다.</Text>
                                </View>
                            </View>
                            <View style={styles.btnCalcWrapper}>
                                <Pressable onPress={handleCalc} style={{width:'100%', height:'100%', justifyContent:'center',alignItems:'center',}}>
                                    <Text style={{color:'black', fontSize:20, fontWeight:'bold',}}>계산하기</Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                    :<View style={commonStyles.historyScreenWrapper}>
                        <MenuCalculatorHistoryScreen navigation={navigation}></MenuCalculatorHistoryScreen>
                    </View>}
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
    smallTitleWrapper:{
        height:28,
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:8,
        flexDirection:'row',
    },
    smallTitleImg:{
        width:24,
        height:24,
        marginRight:6,
    },
    smallTitle:{
        color:theme.loginBlue,
        fontSize:18,
    },
    calcCompWrapper:{
        width:60,
        height:60,
        marginLeft:8,
    },
    smallContentWrapper:{
        width:'100%',
        height:80,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginVertical:8,
    },
    inputStyle:{
        backgroundColor:'white',
        flex:1,
        height:60,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:8,
        ...BASIC_SHADOW,
    },
    smallTxtWrapper:{
        height:60,
        justifyContent:'flex-end',
        marginLeft:8,
    },
    infoWrapper:{
        width:'100%',
        height:36,
        backgroundColor:theme.backgroundGrey,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        justifyContent:'center',
        alignItems:'center',
        marginTop:8,
    },
    txtSmall:{
        fontSize:22
    },
    historyScreenWrapper:{
        flex:1,
        width:'100%',
    }
});