import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';

import { theme } from '../variables/color';
import {statusBarHeight} from '../variables/scales';
import { CODE_LIST_ROW1, CODE_LIST_ROW2, ING_LIST_ROW1, ING_LIST_ROW2, HOW_LIST, ALCOHOL_LIST } from '../variables/codelist';
import { SCREEN_WIDTH } from '../variables/scales';

import TypeImageCard from '../components/TypeImageCard';
import IngredientImageCard from '../components/IngredientImageCard';
import QuestionHeader from '../components/QuestionHeader';
import MultiSelectButtons from '../components/MultiSelectButtons';


/*
1. 각종 뷰들이 실제로 데이터를 조작할 수 있도록 기능을 탑재해야 함.
*/

const typeDiameter=SCREEN_WIDTH*0.8*0.25;

const FoodInfoRegisterScreen = ({route,navigation}) => {
    const [businessType,setBusinessType]=useState('ST001');
    const [businessIngre, setBusinessIngre]=useState('IG001,IG002');
    const [businessCookway, setBusinessCookway]=useState('HC004');
    const [businessAlcohol, setBusinessAlcohol]=useState('AL002');
    const [businessAlready, setBusinessAlready]=useState('80');
    const [businessStaff, setBusinessStaff]=useState(10);
    const [businessHours, setBusinessHours]=useState('09:00~10:00');

    let i=0;
    const handleGoNext = () => {
        //navigation.navigate('LoginScreen');
    };

    return (
        <View style={styles.mainbody}>
            <View style={styles.headerSection}>
                <Text style={styles.title}>기초질문</Text>
            </View>
            <View style={styles.inputSection}>
                <ScrollView style={styles.scrollbody}>
                    <View style={styles.foodStyleSection}>
                        <QuestionHeader text={'어떤 스타일의 음식을 판매하시나요?'}></QuestionHeader>
                        <View style={styles.foodStyleCircleRow}>
                            {CODE_LIST_ROW1.map((code) => <TypeImageCard key={i++} source={Object.assign(code,{businessType, setter:setBusinessType, diameter: typeDiameter})}></TypeImageCard>)}
                        </View>
                        <View style={styles.foodStyleCircleRow}>
                            {CODE_LIST_ROW2.map((code) => <TypeImageCard key={i++} source={Object.assign(code,{businessType, setter:setBusinessType, diameter: typeDiameter})}></TypeImageCard>)}
                        </View>
                    </View>
                    <View style={styles.ingSection}>
                        <QuestionHeader text={'주로 어떤 재료를 사용하시나요?(복수선택 가능)'}></QuestionHeader>
                        <View style={styles.ingSelectRow}>
                            {ING_LIST_ROW1.map((ing) => <IngredientImageCard key={i++} source={Object.assign(ing,{diameter: typeDiameter, width:SCREEN_WIDTH*0.9*0.45})}></IngredientImageCard>)}
                        </View>
                        <View style={styles.ingSelectRow}>
                            {ING_LIST_ROW2.map((ing) => <IngredientImageCard key={i++} source={Object.assign(ing,{diameter: typeDiameter, width:SCREEN_WIDTH*0.9*0.45})}></IngredientImageCard>)}
                        </View>
                    </View>
                    <View style={styles.howcookSection}>
                        <QuestionHeader text={'주로 어떻게 요리하시나요?(복수선택 가능)'}></QuestionHeader>
                        <MultiSelectButtons source={{list:HOW_LIST}}/>
                        <View style={styles.howcookInfoSection}>
                            <View style={styles.howcookRow}>
                                <Text style={styles.howcookTitle}>※ 일반조리</Text>
                                <View>
                                    <Text style={styles.howcookText}>: 특별한 설비나 방식이 필요하지 않은,</Text>
                                    <Text style={styles.howcookHText}>가정집과 비슷한 조리 방식</Text>
                                </View>
                            </View>
                            <View style={styles.howcookRow}>
                                <Text style={styles.howcookTitle}>※ 비가열</Text>
                                <View>
                                    <Text style={styles.howcookText}>: 회, 샌드위치 등과 같이 가열없이</Text>
                                    <Text style={styles.howcookHText}>도마에서 끝낼 수 있는 조리방식</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.alcholSection}>
                        <QuestionHeader text={'주류를 판매하시나요?(복수선택 가능)'}></QuestionHeader>
                        <MultiSelectButtons source={{list:ALCOHOL_LIST}}/>
                    </View>
                    <View style={styles.halfcookSection}>
                        <QuestionHeader text={'식재료 중, 반조리 식품의 비율은 어느정도 인가요?'}></QuestionHeader>
                        <View><Text>스크롤을 이용한 이벤트 필요</Text></View>
                    </View>
                    <View style={styles.employeeSection}>
                        <QuestionHeader text={'직원 수는 몇 명 인가요?'}></QuestionHeader>
                        <View><Text>스크롤을 이용한 이벤트 필요</Text></View>
                    </View>
                    <View style={styles.timeSection}>
                        <QuestionHeader text={'영업 시간을 알려주세요.'}></QuestionHeader>
                        <View><Text>스크롤을 이용한 이벤트 필요</Text></View>
                    </View>
                    <View style={styles.goNextOutterWrapper}>
                        <Image
                            style={styles.imgTorang}
                            source={require('../../image/torang2.png')}
                            resizeMode='contain'
                        />
                        {/* <View style={styles.goNextTextSection}>
                            <Text>거의 다 왔습니다!</Text>
                            <Text>포스기기의 엑셀파일 혹은 메뉴판을 업로드 해 주세요!</Text>
                        </View> */}
                    </View>
                    <View style={styles.btnUnploadWrapper}>
                        <Pressable style={styles.btnUnpload} onPress={handleGoNext}>
                            <Text style={styles.txtUpload}>Upload {'>'}</Text>
                        </Pressable>  
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default FoodInfoRegisterScreen;

const styles = StyleSheet.create({
    mainbody:{
        backgroundColor:theme.registerEmerald,
        flex:1,
        alignItems:'center',
        marginBottom:20,
    },
    headerSection:{
        flex:11,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    title:{
        marginTop:statusBarHeight,
        color:theme.textWhite,
        fontWeight:'bold',
        fontSize:25,
    },
    inputSection:{
        flex:89,
        backgroundColor:theme.inputBackground2,
        width:'100%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        paddingTop:8,
    },
    scrollbody:{
        marginVertical:8,
        width:'100%',
        paddingHorizontal:'5%',
    },
    foodStyleSection:{
        
    },
    foodStyleCircleRow:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    ingSelectRow:{
        flexDirection:'row',
        width:'100%',
    },
    howcookInfoSection:{
        marginTop:5,
        paddingHorizontal:15,
        paddingVertical:10,
        width:'100%',
        height:120,
        backgroundColor:theme.howcookBackgoundGrey,
        borderRadius:30,
      
    },
    howcookRow:{
        flexDirection:'row',
        flexWrap:'wrap',
        flex:1,
        alignItems:'center',
    },
    howcookTitle:{
        marginRight:5,
        color:theme.checkedBlue,
        fontWeight:'bold',
        alignSelf:'flex-start'
    },
    howcookHText:{
        fontWeight:'700',
    },
    goNextOutterWrapper:{
        width:'100%',
        backgroundColor:'teal',
        height:400,
        backgroundColor:'tomato'
    },
    imgTorang:{
        width:'100%',
        
    },
    goNextTextSection:{
        zIndex:9999,
    },
    btnUnploadWrapper:{
        width:100,
        height:50,
        borderRadius:15,
        backgroundColor:'teal',
        alignSelf:'center',
    },
    btnUnpload:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    txtUpload:{
        
    }
});