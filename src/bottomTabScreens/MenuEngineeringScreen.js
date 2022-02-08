import React from 'react';
import { Platform, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { theme } from '../variables/color';
import {statusBarHeight,CONTENT_SECTION_BORDER_RADIUS, BASIC_SHADOW} from '../variables/scales';

import MedalComponent from '../components/MedalComponent';

const MenuEngineeringScreen = ({navigation}) => {
    const today=new Date();
    const month=today.getMonth()+1;
    const date=today.getDate();
    const day=today.getDay();
    let dateString=''
    switch(day){
        case 0:
            dateString='일요일';
            break;
        case 1:
            dateString='월요일';
            break;
        case 2:
            dateString='화요일';
            break;
        case 3:
            dateString='수요일';
            break;
        case 4:
            dateString='목요일';
            break;
        case 5:
            dateString='금요일';
            break;
        case 6:
            dateString='토요일';
            break;
    }
    
    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={styles.mainbody}>
            <View style={styles.headerSection}>
                <View style={styles.dateSection}>
                    <View style={styles.dateWrapper}>
                        <Text style={{fontSize:12,color:'white',}}>Today</Text>
                        <Text style={{fontSize:16,color:'white',}}>{`${month}/${date}`}</Text>
                    </View>
                    <View style={styles.dayWrapper}>
                        <Text style={{fontWeight:'bold',fontSize:20,color:theme.engineeringYellow,}}>{dateString}</Text>
                    </View>
                </View>
                <View style={styles.weatherImgWrapper}>
                    <Text>대충 날씨 사진</Text>
                </View>
            </View>
            <View style={styles.selectSection}>
                <View style={styles.selectSection__selectRow}>
                    <Pressable style={styles.selectSection__pressable}>
                        <Text style={{width:'90%',textAlign:'center',}}>커피</Text>
                        <Text>^</Text>
                    </Pressable>
                </View>
                <View style={styles.selectSection__showRow}>
                    <View style={styles.selectSection__showColumn}>
                        <Text style={styles.selectSection__title}>월간 판매량</Text>
                        <Text style={styles.selectSection__content}>492건</Text>
                    </View>
                    <View style={styles.selectSection__showColumn}>
                        <Text style={styles.selectSection__title}>총 매출</Text>
                        <Text style={styles.selectSection__content}>1,571,000원</Text>
                    </View>
                </View>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.graphSection}>

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
                        <MedalComponent key={0} source={{type: 'gold', num:5}}></MedalComponent>
                        <MedalComponent key={1} source={{type: 'silver', num:7}}></MedalComponent>
                        <MedalComponent key={2} source={{type: 'bronze', num:12}}></MedalComponent>
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
    }
});