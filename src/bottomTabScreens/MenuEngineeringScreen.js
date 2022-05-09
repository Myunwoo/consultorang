
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Image, Picker, Platform } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

import { theme } from '../variables/color';
import {dateObject, statusBarHeight,CONTENT_SECTION_BORDER_RADIUS, BASIC_SHADOW, SCREEN_HEIGHT, WEATHER_LIST} from '../variables/scales';
import { getItemAsyncStorage, fetchServer } from '../abstract/asyncTasks';

import WeatherHeader from '../components/WeatherHeader';
import MedalComponent from '../components/MedalComponent';
import GraphArrowUp from '../components/GraphArrowUp';
import GraphArrowRight from '../components/GraphArrowRight';
import MenuYellowCircle from '../components/MenuYellowCircle';
import commonStyles from '../variables/commonStyles';

let circleIndex=0;

//1. 메뉴가 안불러와지고있음
//2. 하트, 원 마진이 너무작거나 없음
//3. 메세지 추가해줘야함

//피커에 의해 카테고리에 속한 아이템들을 불러옴, userId와 saleYm를 수정해 주어야 함.
const handleSetCategory = (targetId, setter, userId, saleYm) => {
    const dataToSend={
        'catId': targetId,
        userId,
        saleYm,
    };
    fetchServer('POST', '/engine/getCatEngine', dataToSend).then((responseJson) => {
        if(responseJson.data!==null){
            setter(responseJson.data);
        }
    }).catch((error) => {
        console.log(error);
    });
}

const MenuEngineeringScreen = ({navigation}) => {
    const {year, month, date, dateString, yyyymmdd}=dateObject();
    const [userId, setUserId]=useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId]=useState(-1);
    const [categoryTxt, setCategoryTxt]=useState('');
    const [cateData, setCateData] = useState({
        first:[],
        second:[],
        third:[],
        totalCnt:0,
        totalSale:0,
    });

    const [graphSize, setGraphSize]=useState({width:0, height:0});

    const pickerRef = useRef();

    const handleClickMedal=(arg)=>{
        if(!categoryId){
            alert('카테고리를 먼저 선택해주세요.');
            return;
        }
        switch(arg){
            case 0:
                navigation.navigate('MenuEngineeringInfoScreen',{type:0,array:cateData.first, categoryTxt});
                break;
            case 1:
                navigation.navigate('MenuEngineeringInfoScreen',{type:1,array:cateData.second, categoryTxt});
                break;
            case 2:
                navigation.navigate('MenuEngineeringInfoScreen',{type:2,array:cateData.third, categoryTxt});
                break;
        }
    }

    function openCategoryPicker() {
        //pickerRef.current.focus();
    }

    function closeCategoryPicker() {
        pickerRef.current.blur();
    }

    useEffect(()=>{
        getItemAsyncStorage('userId').then(res=>{
            setUserId(res);
        }).catch((error)=>{
            console.log(error);
        });
    },[]);

    useEffect(()=>{
        const dataToSend={
            userId,
            saleYm: `${year}${month<10?'0'+month:month}`,
        };
        fetchServer('POST', '/engine/getCatList', dataToSend).then((responseJson) => {
            if(responseJson.data!==null){
                setCategories(responseJson.data);
            }else{
                setCategories([]);
            }
        }).catch((error) => {
            setCategories([-1]);
            console.log(error);
        });
    },[userId])

    //카테고리 아이디에 변화가 있을 때 (카테고리 처음 불러올 때, 피커에서 변경될 때) 뷰의 텍스트와 점 렌더링
    useEffect(()=>{
        if(categoryId===-1 || categoryId===null) return;
        const result=categories.find(category=>category.catId===categoryId);
        if(result){
            handleSetCategory(result.catId, setCateData ,userId, `${year}${month<10?'0'+month:month}`);
            setCategoryTxt(result.catNm);
        }
    },[categoryId]);

    useEffect(()=>{
    },[cateData]);

    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={commonStyles.mainbody}>
            <WeatherHeader></WeatherHeader>
            <View style={styles.selectSection}>
                <View style={styles.pickerInnerWrapper}>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        fixAndroidTouchableBug={true}
                        onValueChange={(value)=>{
                            setCategoryId(value);
                        }}
                        selectedValue={categoryId}
                        items={categories.map(category=>{
                            return {label:category.catNm, value:category.catId}
                        })}
                        style={pickerSelectStyles}
                        Icon={() => {
                            return <Image style={{width:20, height:20,}} source={require('../../image/ingreModal_arrow.png')} resizeMode='contain'/>;
                        }}
                    />
                </View>
                <View style={styles.selectSection__showRow}>
                    <View style={styles.selectSection__showColumn}>
                        <Text style={styles.selectSection__title}>월간 판매량</Text>
                        <Text style={styles.selectSection__content}>{cateData.totalCnt+'건'}</Text>
                    </View>
                    <View style={styles.selectSection__showColumn}>
                        <Text style={styles.selectSection__title}>총 매출</Text>
                        <Text style={styles.selectSection__content}>{cateData.totalSale+'원'}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.graphSection}>
                <View style={styles.graphUpperWrapper}>
                    <View style={styles.heartImgWrapper}>
                        <Image
                            resizeMode='contain'
                            style={{width:30,height:30,}}
                            source={require('../../image/engineering_heart.png')}
                        >
                        </Image>
                    </View>
                    <View style={styles.graphWrapper} onLayout={(event)=>{
                        setGraphSize({
                            width:event.nativeEvent.layout.width,
                            height:event.nativeEvent.layout.height,
                        })
                    }}>
                        <GraphArrowRight source={graphSize}></GraphArrowRight>
                        <GraphArrowUp source={graphSize}></GraphArrowUp>
                        <View style={styles.graphLeftWrapper}>
                            <View style={styles.graphTopLeft}>
                                <View style={styles.inner}>
                                    {cateData.second.map((circle) => <MenuYellowCircle key={circleIndex++} source={{...circle, type:'second'}}></MenuYellowCircle>)}    
                                </View>
                            </View>
                            <View style={styles.graphBottomLeft}>
                                <View style={styles.inner}>
                                    {cateData.third.map((circle) => <MenuYellowCircle key={circleIndex++} source={{...circle, type:'third'}}></MenuYellowCircle>)}
                                </View>
                            </View>
                        </View>
                        <View style={styles.graphRightWrapper}>
                            <View style={styles.graphTopRight}>
                                <View style={styles.inner}>
                                    {cateData.first.map((circle) => <MenuYellowCircle key={circleIndex++} source={{...circle, type:'first'}}></MenuYellowCircle>)}
                                </View>
                            </View>
                            <View style={styles.graphBottomRight}>
                                
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.graphDownWrapper}>
                    <View style={{width:30, height:30,}}></View>
                    <View style={styles.moneyImgWrapper}>
                        <Image
                            resizeMode='contain'
                            style={{width:30,height:30,}}
                            source={require('../../image/engineering_won.png')}
                        >
                        </Image>
                    </View>
                </View>
            </View>
            <View style={styles.resultSection}>
                <View style={styles.resultSection__headerWrapper}>
                    <Text style={styles.txtResultSection__header}>메뉴 엔지니어링</Text>
                </View>
                <View style={styles.resultContentSection}>
                    <View style={styles.resultContent__header}>
                        <Text style={styles.resultTitle}>분석 결과</Text>
                        <Text numberOfLines={1} minimumFontScale={0.5} adjustsFontSizeToFit={true} style={styles.resultContent}>메달을 클릭해 등급별 솔루션을 확인하세요!</Text>
                    </View>
                    <View style={styles.medalSection}>
                        <Pressable onPress={()=>handleClickMedal(0)}>
                            <MedalComponent key={0} source={{type: 'gold', num:cateData.first.length}}></MedalComponent>
                        </Pressable>
                        <Pressable onPress={() => handleClickMedal(1)}>
                            <MedalComponent key={1} source={{type: 'silver', num:cateData.second.length}}></MedalComponent>
                        </Pressable>
                        <Pressable onPress={() => handleClickMedal(2)}>
                            <MedalComponent key={2} source={{type: 'bronze', num:cateData.third.length}}></MedalComponent>    
                        </Pressable>                        
                    </View>
                    <View style={styles.resultGuideWrapper}>
                        <View style={styles.resultGuideInnerWrapper}>
                            <Text style={styles.txtResultGuide}>* 기준값의 하향평준화를 대비해 하위 20% 항목은 포함하고 있지 않습니다. 참고에 유의하시기 바랍니다. *</Text>
                        </View>
                    </View>
                </View>
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
        height:'7%',
        maxHeight:64,
        marginHorizontal:'5%',
        alignItems:'center',
    },
    dateSection:{
        flexDirection:'row',
        marginRight:8,
    },
    dateWrapper:{
        alignItems:'center',
        marginRight:8,
    },
    dayWrapper:{
        justifyContent:'center',
        marginRight:8,
    },
    weatherImgWrapper:{

    },
    selectSection:{
        height:64,
        alignItems:'center',
    },
    pickerInnerWrapper:{
        width:'90%',
        maxWidth:700,
        flex:1,
    },
    selectSection__showRow:{
        flexDirection:'row',
        justifyContent:'center',
        width:'90%',
        maxWidth:700,
        flex:1,
    },
    selectSection__showColumn:{
        flexDirection:'row',
        flex:1,
        height:'100%',
        alignItems:'flex-end',
    },
    selectSection__title:{
        color:'white',
        marginRight:5,
        ...commonStyles.commonTextShadow,
    },
    selectSection__content:{
        color:'white',
        fontWeight:'bold',
        fontSize:20,
        ...commonStyles.commonTextShadow,
    },
    divider:{
        height:1,
        marginVertical:5,
        width:'90%',
        backgroundColor:theme.inputBackground2,
        alignSelf:'center',
    },
    graphSection:{
        flex:1,
    },
    graphUpperWrapper:{
        flex:1,
        flexDirection:'row',
    },
    graphWrapper:{
        flex:1,
        height:'100%',
        flexDirection:'row',
    },
    graphDownWrapper:{
        flexDirection:'row',
        width:'100%',
        height:30,
    },
    moneyImgWrapper:{
        flex:1,
        height:'100%',
        alignItems:'center',
        marginTop:6,
    },
    heartImgWrapper:{
        width:30,
        height:'100%',
        justifyContent:'center',
        marginRight:6,
    },
    graphLeftWrapper:{
        flex:1,
        height:'100%',
    },
    graphRightWrapper:{
        flex:1,
        height:'100%',
    },
    inner:{
        width:'80%',
        height:'80%',
    },
    graphTopLeft:{
        width:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    graphTopRight:{
        width:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    graphBottomLeft:{
        width:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    graphBottomRight:{
        width:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    resultSection:{
        height:260,
    },
    resultSection__headerWrapper:{
        marginLeft:'5%',
    },
    txtResultSection__header:{
        color:'white',
        fontSize:15,
        fontWeight:'bold',
        marginBottom:5,
        ...commonStyles.commonTextShadow
    },
    resultContentSection:{
        flex:1,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        backgroundColor:theme.inputBackground2,
        ...BASIC_SHADOW,
    },
    resultContent__header:{
        flexDirection:'row',
        marginHorizontal:'5%',
        marginVertical:10,
        justifyContent:'center',
        alignItems:'center',
    },
    resultTitle:{
        marginRight:10,
        fontSize:24,
        fontWeight:'bold',
        ...commonStyles.commonTextShadow,
    },
    resultContent:{
        flex:1,
        ...commonStyles.commonTextShadow,
        ...Platform.select({
            ios:{
                fontSize:20,
            },
            android:{
                fontSize:20,
            }
        })
    },
    medalSection:{
        width:'100%',
        height:120,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    resultGuideWrapper:{
        marginTop:12,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    resultGuideInnerWrapper:{
        width:'90%',
    },
    txtResultGuide:{
        color:theme.uncheckedGrey
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        height: '100%',
        width:'100%',
        color: '#000000',
        padding: 10,
        textAlign:'center',
        borderRadius:32,
        backgroundColor:theme.inputBackground2,
        ...BASIC_SHADOW,
    },
    inputAndroid: {
        fontSize: 14,
        height:'100%',
        width: '100%',
        color: '#000000',
        textAlign:'center',
        borderRadius:32,
        backgroundColor:theme.inputBackground2,
    },
    iconContainer: {
        right: 10,
        height:'100%',
        width:32,
        justifyContent:'center',
        alignItems:'center',
    },
});