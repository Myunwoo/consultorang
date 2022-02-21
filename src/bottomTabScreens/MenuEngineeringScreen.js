
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { theme } from '../variables/color';

import {dateObject, statusBarHeight,CONTENT_SECTION_BORDER_RADIUS, BASIC_SHADOW, SCREEN_HEIGHT, WEATHER_LIST} from '../variables/scales';
import { getItemAsyncStorage, fetchServer } from '../abstract/asyncTasks';

import WeatherComponent from '../components/WeatherComponent';
import MedalComponent from '../components/MedalComponent';
import GraphArrowUp from '../components/GraphArrowUp';
import GraphArrowRight from '../components/GraphArrowRight';
import MenuYellowCircle from '../components/MenuYellowCircle';
import commonStyles from '../variables/commonStyles';

let circleIndex=0;

const initCategory = async(cateSetter) => {
    let categories=[]
    try{
        const categories = await getItemAsyncStorage('categories');
        const cateJSON = JSON.parse(categories);
        cateSetter(cateJSON);
    }catch(err){
        alert(err);
    }finally{
        return categories;
    }
}

const handleSetCategory = (targetId, setter) => {
    const dataToSend={
        'catId': targetId,
        'userId': 27,
        'saleYm': '202202',
    }
    fetchServer('POST', '/engine/getCatEngine', dataToSend).then((responseJson) => {
        setter(responseJson.data);
    }).catch((error) => {
        console.log(error);
    });
}

const MenuEngineeringScreen = ({navigation}) => {
    const {month, date, dateString}=dateObject();
    const [categories, setCategories] = useState([]);
    const [categoryTxt, setCategoryTxt] = useState('카테고리를 불러오고 있습니다');
    const [cateData, setCateData] = useState({
        first:[],
        second:[],
        third:[],
        totalCnt:0,
        totalSale:0,
    });

    //처음 화면이 마운트 되었을 때
    useEffect(()=>{
        initCategory(setCategories);
    },[]);

    //categories가 업데이트 되면 첫 번째 카테고리의 이름과 데이터를 화면에 랜더링 합니다.
    useEffect(() => {
        if(categories.length>0){
            setCategoryTxt(categories[0].catNm);
            handleSetCategory(categories[0].catId, setCateData);
        }
    },[categories])

    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={commonStyles.mainbody}>
            <View style={commonStyles.headerSection}>
                <View style={commonStyles.dateSection}>
                    <View style={commonStyles.dateWrapper}>
                        <Text style={{fontSize:12,color:'white',}}>Today</Text>
                        <Text style={{fontSize:16,color:'white',}}>{`${month}/${date}`}</Text>
                    </View>
                    <View style={commonStyles.dayWrapper}>
                        <Text style={{fontWeight:'bold',fontSize:20,color:theme.engineeringYellow,}}>{dateString}</Text>
                    </View>
                </View>
                <View style={commonStyles.weatherImgWrapper}>
                    {/* 날씨 api와의 연동에서 한 번 더 고민 필요 */}
                    <WeatherComponent 
                        source={{size:(SCREEN_HEIGHT*0.06) > 60 ? 60 : (SCREEN_HEIGHT*0.06)}}>    
                    </WeatherComponent>
                </View>
            </View>
            <View style={styles.selectSection}>
                <View style={styles.selectSection__selectRow}>
                    <Pressable 
                        style={styles.selectSection__pressable}
                        onPress={() => handleSetCategory(1,setCateData)}
                    >
                        <Text style={{width:'90%',textAlign:'center',}}>{categoryTxt}</Text>
                        <Text>^</Text>
                    </Pressable>
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
                <GraphArrowUp></GraphArrowUp>
                <GraphArrowRight></GraphArrowRight>
                {/* 여기서 인풋받은 아이템들을 좌표대로 찍어주기 */}
                {cateData.first.map((circle) => <MenuYellowCircle key={circleIndex++} source={circle}></MenuYellowCircle>)}
                {cateData.second.map((circle) => <MenuYellowCircle key={circleIndex++} source={circle}></MenuYellowCircle>)}
                {cateData.third.map((circle) => <MenuYellowCircle key={circleIndex++} source={circle}></MenuYellowCircle>)}
            </View>
            <View style={styles.resultSection}>
                <View style={styles.resultSection__headerWrapper}>
                    <Text style={styles.resultSection__header}>메뉴 엔지니어링</Text>
                </View>
                <View style={styles.resultContentSection}>
                    <View style={styles.resultContent__header}>
                        <Text style={styles.resultTitle}>분석 결과</Text>
                        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.resultContent}>등급별 솔루션이 궁금하다면 메달을 클릭해 보세요!</Text>
                    </View>
                    <View style={styles.medalSection}>
                        <Pressable onPress={() => navigation.navigate('MenuEngineeringInfoScreen',{type:0,array:cateData.first, categoryTxt})}>
                            <MedalComponent key={0} source={{type: 'gold', num:cateData.first.length}}></MedalComponent>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('MenuEngineeringInfoScreen',{type:1,array:cateData.second, categoryTxt})}>
                            <MedalComponent key={1} source={{type: 'silver', num:cateData.second.length}}></MedalComponent>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('MenuEngineeringInfoScreen',{type:2,array:cateData.third, categoryTxt})}>
                            <MedalComponent key={2} source={{type: 'bronze', num:cateData.third.length}}></MedalComponent>    
                        </Pressable>                        
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
        height:'10%',
        maxHeight:64,
        alignItems:'center',
    },
    selectSection__selectRow:{
        borderRadius:15,
        width:'90%',
        maxWidth:700,
        flex:1,
        backgroundColor:theme.inputBackground2,
        ...BASIC_SHADOW,
    },
    selectSection__pressable:{
        flexDirection:'row',
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
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
    },
    selectSection__content:{
        color:'white',
        fontWeight:'bold',
        fontSize:20,
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
    resultSection:{
        height:'40%',
        maxHeight:220,
        
    },
    resultSection__headerWrapper:{
        marginLeft:'5%',
    },
    resultSection__header:{
        color:'white',
        fontSize:15,
        fontWeight:'bold',
        marginBottom:5,
    },
    resultContentSection:{
        flex:1,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        backgroundColor:theme.inputBackground2,
    },
    resultContent__header:{
        flexDirection:'row',
        marginHorizontal:'5%',
        marginTop:10,
        justifyContent:'center',
        alignItems:'center',
    },
    resultTitle:{
        marginRight:10,
        fontSize:24,
        fontWeight:'bold',
    },
    resultContent:{
        flex:1,
    },
    medalSection:{
        width:'100%',
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
});