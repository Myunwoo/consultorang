import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView, TextInput, Keyboard } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '../variables/color';
import {dateObject,CONTENT_SECTION_BORDER_RADIUS, BASIC_SHADOW} from '../variables/scales';

import commonStyles from '../variables/commonStyles';
import WeatherHeader from '../components/WeatherHeader';
import CalcIngreComponent from '../components/CalcIngreComponent';
import ModalComponent from '../modals/ModalComponent';
import IngreModal from '../modals/IngreModal';
import GraphType from '../components/GraphType';
import MenuCalculatorHistoryScreen from './MenuCalculatorHistoryScreen';

const TYPE=[
    {text:'메뉴 가격 계산기'},
    {text:'목록'}
]
let i=0;

const MenuCalculatorScreen = (({navigation}) => {
    const [menuImg, setMenuImg]=useState(require('../../image/calc_placeholder.png'));
    const [menuName, setMenuName]=useState('');
    const [ingreVisible, setIngreVisible]=useState(false);
    const [ingreArr, setIngreArr]=useState([]);
    const [type, setType]=useState(TYPE[0].text);

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

    //useEffect가 되었든, 어떤 방식이 되었든 로컬에 저장된 히스토리를 불러와야 합니다.
    //일단 tempHistory배열을 사용해서 구현합니다.
    useEffect(()=>{

    });

    const handleNavigate=(type)=>{
        
    };
    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={commonStyles.mainbody}>
            <ModalComponent showModal={ingreVisible} setShowModal={setIngreVisible}>
                <IngreModal setSendObj={setIngreArr} showModal={ingreVisible} setShowModal={setIngreVisible}></IngreModal>
            </ModalComponent>
            <WeatherHeader></WeatherHeader>
            <View style={commonStyles.contentSection}>
                {/* <View style={styles.titleWrapper}>
                    {TYPE.map(g=><GraphType key={i++} source={{prop:type, setter:setType, ...g}}></GraphType>)}
                </View>        */}
                <View style={type===TYPE[0].text? {...styles.titleBackBlock, backgroundColor:theme.inputBackground1} : {...styles.titleBackBlock, backgroundColor:theme.titleWrapperBlue}}></View>
                <View style={styles.titleWrapper}>
                    <View style={type===TYPE[0].text?styles.navigateWrapper:{...styles.navigateWrapper, backgroundColor:theme.titleWrapperBlue}}>
                        <Pressable onPress={()=>setType(TYPE[0].text)} style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}><Text style={type===TYPE[0].text? {color:theme.checkedBlue} : {color:'white'} }>메뉴 가격 계산기</Text></Pressable>
                    </View>
                    <View style={type===TYPE[0].text?{...styles.navigateWrapper, position:'absolute', left:110,backgroundColor:theme.titleWrapperBlue, zIndex:-1}:{...styles.navigateWrapper, position:'absolute', left:110,backgroundColor:theme.inputBackground1}}>
                        <Pressable onPress={()=>setType(TYPE[1].text)} style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}><Text style={type===TYPE[0].text? {color:'white'} : {color:theme.checkedBlue} }>가격 히스토리</Text></Pressable>
                    </View>
                </View>
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
                        <View style={{flexDirection:'row', height:'100%', width:5, justifyContent:'space-between', alignItems:'center'}}>
                            <View style={{width:1, height:'30%',backgroundColor:theme.titleWrapperBlue}}></View>
                            <View style={{width:1, height:'20%',backgroundColor:theme.titleWrapperBlue}}></View>
                        </View>
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
                            <View style={styles.calcIngreCompWrapper}>
                                <CalcIngreComponent source={{name:'박력밀가루', totalCost:'19140원', totalWeight:'20Kg', weight:'150g', height:'100%', cost:'144원'}}></CalcIngreComponent>
                            </View>
                            <View style={styles.calcIngreCompWrapper}>
                                <CalcIngreComponent source={{name:'우유', totalCost:'4090원', totalWeight:'1.8L', weight:'300g', height:'100%', cost:'680원'}}></CalcIngreComponent>                                                    
                            </View>
                        </ScrollView>
                        <View style={styles.btnApplyWrapper}>
                            <Pressable onPress={handleApply} style={{width:'100%', height:'100%', justifyContent:'center',alignItems:'center',}}>
                                <Text style={{color:'white', fontSize:20, fontWeight:'bold',}}>확인</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
                : <View style={styles.historyScreenWrapper}>
                    <MenuCalculatorHistoryScreen navigation={navigation}></MenuCalculatorHistoryScreen>
                </View>}
                </View>
            </View>
        </LinearGradient>
    );
});

export default MenuCalculatorScreen;

const styles=StyleSheet.create({
    titleBackBlock:{
        width:50,
        height:50,
        position:'absolute',
        top:20, 
        left:0, 
        zIndex:0,
    },
    titleWrapper:{
        width:'100%',
        height:30,
        flexDirection:'row',
    },
    navigateWrapper:{
        width:120,
        height:'100%',
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        backgroundColor:theme.inputBackground1,
        zIndex:1,
    },
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
    calcIngreCompWrapper:{
        width:'100%',
        height:60,
    },
    historyScreenWrapper:{
        flex:1,
        width:'100%',
    }
});