import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { theme } from '../variables/color';
import {dateObject, statusBarHeight,CONTENT_SECTION_BORDER_RADIUS, BASIC_SHADOW, SCREEN_HEIGHT, WEATHER_LIST} from '../variables/scales';
import { getItemAsyncStorage, fetchServer } from '../abstract/asyncTasks';
import commonStyles from '../variables/commonStyles';

import WeatherHeader from '../components/WeatherHeader';

//이 함수는 useEffect를 이용해서 서버로부터 문자열을 받아야 할 가능성이 있음
const init=(type)=>{
    let img;
    let medalColor='#E5E5E5';
    let medalText='';
    switch(type){
        case 0:
            img=require('../../image/medal_gold.png');
            medalColor='#FFE279';
            medalText='금메달 메뉴';
            break;
        case 1:
            img=require('../../image/medal_silver.png');
            medalColor='#E0E0DF';
            medalText='은메달 메뉴';
            break;
        case 2:
            img=require('../../image/medal_bronze.png');
            medalColor='#D7654F';
            medalText='동메달 메뉴';
            break;
    }
    return {img, medalColor, medalText,};
}

const MenuEngineeringInfoScreen = (({route, navigation}) => {
    let index=1;
    const {type, array, categoryTxt}=route.params;
    
    const [medal, setMedal]=useState(type);
    const [menus, setMenus]=useState(array);
    const [category, setCategory]=useState(categoryTxt);
    
    const {month, date, dateString}=dateObject();
    const {img, medalColor, medalText,}=init(type);

    ///////
    //
    //
    ///////

    // {
    // 		"medalType" : Number, //금(1),은(2),동(3)
    // 		"userId" : 30,
    // 		"hasMenu": Boolean, //true(메뉴가 존재), false(메뉴가 없음)
    // }

    //sendObj구성하는 법
    //medalType에 들어갈 데이터는 type변수에 있습니다.(1을 더해서 사용하면 맞을거에요).
    //userId는 우선 30으로 고정하고 해주세요.
    //hasMenu는 array변수의 array.length한 번 찍어 보시고 0이면 hasMenu를 false, 데이터가 있으면 hasMenu를 true

    //fetchServer활용법
    // fetchServer('POST', '/engine/getEngineSolList', sendObj).then((responseJson) => {
    //     console.log(responseJson);
    // }).catch((error) => {
    //     console.log(error);
    // });

    //구현해야 할 일
    //1. 화면이 처음 열리면 sendObj를 만들어 주세요.
    //2. 만든 sendObj를 서버에 전달 해주세요.
    //3. response가 도착할 탠데, totalSol 내용을 키키에 넣어주세요.
    //4. solutions의 solTitle은 크크
    //5. solution의 solContent는 케케
    //6. imgId에 따라서 ??????된 이미지의 내용을 바꿔 주세요.


    
    //1번 내용을 작성할 곳
    useEffect(()=>{
        //서버로부터 키키, 케케, 크크에 넣을 데이터를 받으면 그 데이터를 useState를 이용해서 세팅 해주셔야
        //화면이 달라질 겁니다. 
    },[])

    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={commonStyles.mainbody}>
            <WeatherHeader></WeatherHeader>
            <View style={commonStyles.contentSection}>
            <View style={commonStyles.titleWrapper}>
                <Text style={commonStyles.txtTitle}>메뉴 엔지니어링</Text>
            </View>
            <View style={{width:50, height:50, backgroundColor:theme.titleWrapperBlue, position:'absolute', top:30, left:0, zIndex:1}}></View>
                <View style={commonStyles.contentWrapper}>
                    {/*나중에 메뉴선택을 위한 컴포넌트를 제작해서 추가해야 할 듯*/}
                    <View style={styles.categoryWrapper}>
                        <Text style={styles.txtCategory}>{category}</Text>
                    </View>
                    <ScrollView  style={styles.scrollbody} contentContainerStyle={{alignItems:'center',}}>
                        <View style={styles.analysisTitleWrapper}>
                            <View style={{width:20, height:4, backgroundColor:'#E5E5E5'}}></View>
                            <View style={{width:10, height:10, borderRadius:20, backgroundColor:theme.darkGrey, marginRight:8,}}></View>
                            <Text style={styles.txtTitle}>분석 결과</Text>
                        </View>
                        <View style={styles.analysisWrapper}>
                            <View style={styles.analysisMedalWrapper}>
                                <Image
                                    resizeMode='contain'
                                    style={{position:'absolute', top:-3, left:0,  width:72, height:72, zIndex:33}}
                                    source={img}
                                >
                                </Image>
                                <View style={{ width:'80%', height:40, borderRadius: 20, justifyContent:'center', alignItems:'center', backgroundColor:medalColor, position:'absolute', top:10, left: 36,}}>
                                    <Text style={styles.txtMedal}>{medalText}</Text>
                                </View>
                            </View>
                            <View style={styles.analysisTextWrapper}>
                                <Text>키키</Text>
                            </View>
                            <View style={styles.categoryListWrapper}>
                                {menus.map((menu)=><Text>{`${index++}. ${menu.menuNm}`}</Text>)}
                            </View>
                        </View>
                        <View style={styles.analysisTitleWrapper}>
                            <View style={{width:20, height:4, backgroundColor:'#E5E5E5'}}></View>
                            <View style={{width:10, height:10, borderRadius:20, backgroundColor:'#E5E5E5', marginRight:8,}}></View>
                            <Text style={styles.txtTitle}>Solution</Text>
                        </View>
                        <View style={styles.solutionOutterWrapper}>
                            <View style={styles.solutionImgWrapper}>
                                {/* <Image
                                    resizeMode='contain'
                                    style={{width:30, height:30,}}
                                    source={??????}
                                >
                                </Image> */}
                            </View>
                            <View style={{position:'absolute', top:22, left:18, width:52, height:1, backgroundColor:theme.engineeringCircleNavy, zIndex:3333}}></View>
                            <View style={{position:'absolute', top:19, left:66, width:8, height:8, borderRadius:8, backgroundColor:theme.engineeringCircleNavy, zIndex:3333}}></View>
                            <View style={{width:50}}></View>
                            <View style={styles.solutionContentWrapper}>
                                <Text>크크</Text>
                                <Text>케케</Text>
                            </View>
                        </View>
                        <View style={styles.analysisTitleWrapper}>
                            <View style={{width:20, height:4, backgroundColor:'#E5E5E5'}}></View>
                            <View style={{width:10, height:10, borderRadius:20, backgroundColor:'#E5E5E5', marginRight:8,}}></View>
                            <Text style={styles.txtTitle}>Solution</Text>
                        </View>
                        <View style={styles.solutionOutterWrapper}>
                            <View style={styles.solutionImgWrapper}>
                                {/* <Image
                                    resizeMode='contain'
                                    style={{width:30, height:30,}}
                                    source={??????}
                                >
                                </Image> */}
                            </View>
                            <View style={{position:'absolute', top:22, left:18, width:52, height:1, backgroundColor:theme.engineeringCircleNavy, zIndex:3333}}></View>
                            <View style={{position:'absolute', top:19, left:66, width:8, height:8, borderRadius:8, backgroundColor:theme.engineeringCircleNavy, zIndex:3333}}></View>
                            <View style={{width:50}}></View>
                            <View style={styles.solutionContentWrapper}>
                                <Text>크크</Text>
                                <Text>케케</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </LinearGradient>
    );
});

export default MenuEngineeringInfoScreen;

const styles=StyleSheet.create({
    categoryWrapper:{
        width:'90%',
        height:36,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#E5E5E5',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        marginBottom:12,
        marginTop:15,
    },
    scrollbody:{
        width:'100%',
    },
    txtCategory:{
        fontWeight:'bold',
        color:'black',
    },
    analysisTitleWrapper:{
        alignItems:'center',
        alignSelf:'flex-start',
        flexDirection:'row',
        marginBottom:12,
    },
    txtTitle:{
        fontSize:16,
        fontWeight:'bold',
        color:theme.engineeringNavy,
    },
    analysisWrapper:{
        width:'90%',
        backgroundColor:'white',
        ...BASIC_SHADOW,
        marginBottom:15,
        alignItems:'center',
    },
    analysisMedalWrapper:{
        width:'80%',
        height:60,
        marginBottom:8,
    },
    txtMedal:{
        fontSize:16,
        fontWeight:'bold',
    },
    analysisTextWrapper:{
        width:'90%',
        marginBottom:16,
    },
    categoryListWrapper:{
        width:'90%',
        justifyContent:'center',
        backgroundColor:theme.categoryCyan,
        paddingVertical:15,
        paddingLeft:12,
        marginBottom:16,
    },
    solutionOutterWrapper:{
        width:'90%',
        height:200,
        flexDirection:'row',
    },
    solutionImgWrapper:{
        position:'absolute',
        top:0,
        left:0,
        width:36,
        height:36,
        borderRadius:36,
        backgroundColor:theme.engineeringCircleNavy,
        justifyContent:'center',
        alignItems:'center'
    },
    solutionContentWrapper:{
        backgroundColor:'white',
        flex:1,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        marginBottom:20,
        paddingVertical:20,
        paddingHorizontal:16,
        ...BASIC_SHADOW,
        zIndex:0,
        
    },
})