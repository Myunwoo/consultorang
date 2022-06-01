import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable, ImageBackground } from 'react-native';

import Slider from '@react-native-community/slider';
import { theme } from '../variables/color';
import {BASIC_SHADOW, CONTENT_SECTION_BORDER_RADIUS, statusBarHeight} from '../variables/scales';
import { HOUR_LIST, SIT_LIST, EMPLOYEE_LIST, CODE_LIST_ROW1, CODE_LIST_ROW2, ING_LIST_ROW1, CODE_LIST_ROW3, ING_LIST_ROW2, HOW_LIST, DAY_LIST_1, DAY_LIST_2 } from '../variables/codelist';
import { SCREEN_WIDTH } from '../variables/scales';
import { fetchServer } from '../abstract/asyncTasks';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

import TypeImageCard from '../components/TypeImageCard';
import IngredientImageCard from '../components/IngredientImageCard';
import QuestionHeader from '../components/QuestionHeader';
import MultiSelectButtons from '../components/MultiSelectButtons';

const typeDiameter=SCREEN_WIDTH*0.8*0.25;

const getAlready=(arg)=>{

    if(arg==25){
        return '30';
    }else if(arg==75){
        return '70';
    }else{
        return String(arg);
    }
}

const FoodInfoRegisterScreen = ({route,navigation}) => {
    const {
        businessName,
        businessNum, 
        userAgree, 
        userEmail, 
        userPassword, 
        userPhoneNumber
    }=route.params;

    const [businessType,setBusinessType]=useState('');
    const [businessIngre, setBusinessIngre]=useState('');
    const [businessCookway, setBusinessCookway]=useState([]);
    //already는 전송할 때 string이어야 함.
    const [businessAlready, setBusinessAlready]=useState(0);
    const [businessSit, setBusinessSit]=useState('');
    const [businessStaff, setBusinessStaff]=useState('');
    const [startHour, setStartHour]=useState(-1);
    const [endHour, setEndHour]=useState(-1);
    const [businessHoliday,setBusinessHoliday]=useState([]);

    let i=0;
    const handleGoNext = () => {
        //navigation.navigate('LoginScreen');
        // console.log(businessType);
        // console.log(businessIngre.join(','));
        // console.log(businessCookway.join(','));
        // console.log(businessAlcohol.join(','));
        if(businessType===''){
            alert('어떤 스타일의 음식을 판매하시는지 먼저 알려주세요');
            return;
        }
        if(businessIngre===''){
            alert('주로 어떤 재료를 사용하시는지 먼저 알려주세요');
            return;
        }
        if(businessCookway.length<=0){
            alert('주로 어떻게 요리하시는지 먼저 알려주세요');
            return;
        }
        // if(businessAlready===-1){
        //     alert('반조리 식품의 비율을 알려주세요');
        //     return;
        // }
        if(businessSit===''){
            alert('좌석 수를 알려주세요');
            return;
        }
        if(businessStaff===''){
            alert('직원 수를 알려주세요');
            return;
        }
        if(startHour===-1 || endHour===-1){
            alert('영업 시간을 알려주세요');
            return;
        }

        const dataToSend={
            email:userEmail,
            pw:userPassword,
            phone:userPhoneNumber,
            serviceYn:userAgree?'Y':'N',
            businessNum,
            businessName,
            businessType,
            businessIngre,
            businessCookway:businessCookway.join(','),
            businessAlready:getAlready(businessAlready),
            businessSize:businessSit,
            businessStaff,
            businessStart:startHour,
            businessEnd:endHour+12,
            businessHoliday,
        };

        //fetchServer한 후 성공, 실패 여부 분기하기
        fetchServer('POST','/login/signup',dataToSend)
            .then((responseJson) => {
                const {retCode,data}=responseJson;
                if(data){
                    if(retCode==='0'){
                        alert('회원가입에 성공하였습니다.');
                        navigation.replace('Auth');
                    }
                    else{
                        alert('회원가입에 실패하였습니다');
                        return;
                    }
                }else{
                    alert('회원가입에 실패했습니다.');
                    return;
                }
            })
            .catch(error => console.log(error));
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
                        <View style={styles.foodStyleCircleRow}>
                            {CODE_LIST_ROW3.map((code) => <TypeImageCard key={i++} source={Object.assign(code,{businessType, setter:setBusinessType, diameter: typeDiameter})}></TypeImageCard>)}
                        </View>
                    </View>
                    <View style={styles.ingSection}>
                        <QuestionHeader text={'주로 어떤 재료를 사용하시나요?'}></QuestionHeader>
                        <View style={styles.ingSelectRow}>
                            {ING_LIST_ROW1.map((ing) => <IngredientImageCard key={i++} source={Object.assign(ing,{businessIngre, setter: setBusinessIngre, diameter: typeDiameter, width:SCREEN_WIDTH*0.9*0.45})}></IngredientImageCard>)}
                        </View>
                        <View style={styles.ingSelectRow}>
                            {ING_LIST_ROW2.map((ing) => <IngredientImageCard key={i++} source={Object.assign(ing,{businessIngre, setter: setBusinessIngre, diameter: typeDiameter, width:SCREEN_WIDTH*0.9*0.45})}></IngredientImageCard>)}
                        </View>
                    </View>
                    <View style={styles.howcookSection}>
                        <QuestionHeader text={'주로 어떻게 요리하시나요?(복수선택 가능)'}></QuestionHeader>
                        <MultiSelectButtons source={{list:HOW_LIST, setter:setBusinessCookway, prop:businessCookway}}/>
                        <View style={styles.howcookInfoSection}>
                            <View style={styles.howcookRow}>
                                <Text style={styles.howcookTitle}>※ 일반조리</Text>
                                <View>
                                    <Text style={styles.howcookText}>: 특별한 설비나 방식이 필요하지 않은,</Text>
                                    <Text style={styles.howcookHText}>가정집과 비슷한 복합 조리 방식</Text>
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
                    <View style={styles.halfcookSection}>
                        <QuestionHeader text={'식재료 중, 반조리 식품의 비율은 어느정도 인가요?'}></QuestionHeader>
                        <View style={styles.howcookInfoSection}>
                            <View style={styles.howcookRow}>
                                <Text style={styles.howcookTitle}>※ 반조리식품</Text>
                                <View>
                                    <Text style={styles.howcookText}>: 사장님이 직접 요리하지 않았지만, 재료로 사용하거나 판매하는 식품을 말합니다.</Text>
                                </View>
                            </View>
                            <View style={styles.exRow}>
                                <View style={styles.exCircle}>
                                    <Text style={{color:'white'}}>예</Text>
                                </View>
                                <View style={styles.exContentWrapper}>
                                    <Text numberOfLines={1} adjustsFontSizeToFit={true}>케이크 : 시판 케이크를 해동해서 판매 -{'>'} <Text style={{fontWeight:'bold'}}>반조리 100%</Text></Text>
                                    <Text numberOfLines={1} adjustsFontSizeToFit={true}>치킨 : 직접 손질하고 튀긴 닭 + 시판소스 -{'>'} <Text style={{fontWeight:'bold'}}>반조리 30%</Text></Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.halfcookSelectWrapper}>
                            <Slider
                                style={{width: '100%', height: 30,}}
                                minimumValue={0}
                                maximumValue={100}
                                step={25}
                                minimumTrackTintColor={theme.torangYellow}
                                maximumTrackTintColor={theme.uncheckedGrey}
                                thumbTintColor={theme.torangYellow}
                                onSlidingComplete={arg=>setBusinessAlready(arg)}
                                tapToSeek={true}
                                value={businessAlready}
                            />
                            <View style={{width:'100%', height:20, flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={styles.txtSlider}>사용 안함</Text>
                                <Text style={styles.txtSlider}>30%</Text>
                                <Text style={styles.txtSlider}>50%</Text>
                                <Text style={styles.txtSlider}>70%</Text>
                                <Text style={styles.txtSlider}>100%</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.pickerOutterWrapper}>
                        <QuestionHeader text={'좌석 수는 몇 개 인가요?'}></QuestionHeader>
                        <View style={styles.pickerInnerWrapper}>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                fixAndroidTouchableBug={true}
                                placeholder={{
                                    label: '좌석 수를 선택해주세요',
                                }}
                                onValueChange={(value)=>{
                                    setBusinessSit(value);
                                }}
                                selectedValue={businessSit}
                                items={SIT_LIST.map(sit=>{
                                    return {label:sit.name, value:sit.code}
                                })}
                                style={pickerSelectStyles}
                                Icon={() => {
                                    return <Image style={{width:20, height:20,}} source={require('../../image/ingreModal_arrow.png')} resizeMode='contain'/>;
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.pickerOutterWrapper}>
                        <QuestionHeader text={'직원 수는 몇 명 인가요?'}></QuestionHeader>
                        <View style={styles.pickerInnerWrapper}>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                fixAndroidTouchableBug={true}
                                placeholder={{
                                    label: '직원 수를 선택해주세요',
                                }}
                                onValueChange={(value)=>{
                                    setBusinessStaff(value);
                                }}
                                selectedValue={businessStaff}
                                items={EMPLOYEE_LIST.map(em=>{
                                    return {label:em.name, value:em.code}
                                })}
                                style={pickerSelectStyles}
                                Icon={() => {
                                    return <Image style={{width:20, height:20,}} source={require('../../image/ingreModal_arrow.png')} resizeMode='contain'/>;
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.timeOutterWrapper}>
                        <QuestionHeader text={'영업 시간을 알려주세요.'}></QuestionHeader>
                        <View style={styles.timeInnerWrapper}>
                            <View style={{backgroundColor:theme.checkedBlue, height:'80%', maxHeight:40, width:64, borderRadius:60, justifyContent:'center', alignItems:'center'}}>
                                <Text style={{color:'white',}}>오전</Text>
                            </View>
                            <View style={styles.timePickerWrapper}>
                                    <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
                                        onValueChange={(value)=>{
                                            setStartHour(value);
                                        }}
                                        placeholder={{
                                            label: '시간',
                                        }}
                                        selectedValue={startHour}
                                        items={HOUR_LIST.map(h=>{
                                            return {label:h.name, value:h.code}
                                        })}
                                        style={timeSelectStyles}
                                    />
                                </View>
                            <Text style={{marginHorizontal:4,}}>부터</Text>
                            <View style={{backgroundColor:theme.checkedBlue, height:'80%', maxHeight:40, width:64, borderRadius:60, justifyContent:'center', alignItems:'center'}}>
                                <Text style={{color:'white',}}>오후</Text>
                            </View>
                            <View style={styles.timePickerWrapper}>
                                <RNPickerSelect
                                    useNativeAndroidPickerStyle={false}
                                    onValueChange={(value)=>{
                                        setEndHour(value);
                                    }}
                                    placeholder={{
                                        label: '시간',
                                    }}
                                    selectedValue={endHour}
                                    items={HOUR_LIST.map(h=>{
                                        return {label:h.name, value:h.code}
                                    })}
                                    style={timeSelectStyles}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.holidayOutterWrapper}>
                        <QuestionHeader text={'휴무일을 알려주세요.'}></QuestionHeader>
                        <View style={styles.holidayRow}>
                            <View style={styles.holidayRowTxtWrapper}>
                                <Text style={styles.txtHoliday}>매주</Text>
                            </View>
                            <MultiSelectButtons source={{list:DAY_LIST_1, setter:setBusinessHoliday, prop:businessHoliday}}/>
                        </View>
                        <View style={{...styles.holidayRow, justifyContent:'flex-end'}}>
                            <MultiSelectButtons source={{list:DAY_LIST_2, setter:setBusinessHoliday, prop:businessHoliday}}/>
                            <View style={styles.holidayRowTxtWrapper}>
                                <Text style={styles.txtHoliday}>에 쉽니다.</Text>
                            </View>
                        </View>
                    </View>
                    <ImageBackground
                        style={styles.imgTorang}
                        source={require('../../image/torang2.png')}
                        resizeMode={'contain'}
                    >
                    </ImageBackground>
                    <View style={styles.btnUnploadWrapper}>
                        <Pressable style={styles.btnUnpload} onPress={handleGoNext}>
                            <Text style={styles.txtUpload}>회원가입 {'>'}</Text>
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
        backgroundColor:theme.darkGrey,
        borderRadius:30,
      
    },
    howcookRow:{
        flexDirection:'row',
        flexWrap:'wrap',
        flex:1,
        alignItems:'center',
        marginVertical:4,
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
    imgTorang:{
        //추후에 새로운 이미지가 들어오면 스타일 변경하는걸로
        width:'100%',
        height:240,
        backgroundColor:'teal',
    },
    goNextTextSection:{
        zIndex:9999,
        position:'absolute',
        bottom:30,
        left:10,
        backgroundColor:'teal',
    },
    btnUnploadWrapper:{
        width:100,
        height:50,
        borderRadius:15,
        backgroundColor:theme.torangYellow,
        alignSelf:'center',
        marginTop:12,
    },
    btnUnpload:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    txtUpload:{
        
    },
    exRow:{
        flex:1,
        height:'100%',
        flexDirection:'row',
        alignItems:'center',
    },
    exCircle:{
        width:32,
        height:32,
        backgroundColor:theme.checkedBlue,
        borderRadius:40,
        justifyContent:'center',
        alignItems:'center',
        marginRight:8,
    },
    exContentWrapper:{
        flex:1,
        height:'100%',
        alignItems:'center',
        justifyContent:'space-evenly',
    },
    pickerOutterWrapper:{
        width:'100%',
        height:80,
        marginVertical:4,
    },
    pickerInnerWrapper:{
        width:'100%',
        height:50,
    },
    timeOutterWrapper:{
        marginVertical:8,
        width:'100%',
        height:80,
    },
    timeInnerWrapper:{
        width:'100%',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    },
    timePickerWrapper:{
        flex:1,
        height:'80%',
        maxHeight:40,
        marginHorizontal:4,
    },
    holidayOutterWrapper:{
        width:'100%',
        height:130,
    },
    holidayRow:{
        flex:1,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
    },
    txtHoliday:{
        color:theme.checkedBlue,
        fontSize:16,
    },
    halfcookSelectWrapper:{
        width:'100%',
        marginTop:12,
    },
    txtSlider:{
        fontSize:12,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        height: '100%',
        width:'100%',
        color: '#000000',
        padding: 10,
        textAlign:'center',
        borderColor:theme.checkedBlue,
        borderWidth:1,
        borderRadius:32,
    },
    inputAndroid: {
        fontSize: 16,
        height:'100%',
        width: '100%',
        color: '#000000',
        textAlign:'center',
        borderColor:theme.checkedBlue,
        borderWidth:1,
        borderRadius:32,
    },
    iconContainer: {
        right: 10,
        height:'100%',
        width:32,
        justifyContent:'center',
        alignItems:'center',
    },
});

const timeSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 10,
        height: '100%', 
        width:'100%',
        color: '#000000',
        padding: 10,
        textAlign:'center',
        backgroundColor:'white',
        borderRadius:4,
        ...BASIC_SHADOW,
    },
    inputAndroid: {
        fontSize: 10,
        height: '100%', 
        width: '100%', 
        color: '#000000',
        padding: 10,
        textAlign:'center',
        backgroundColor:'white',
        borderRadius:4,
        ...BASIC_SHADOW,
    },
    iconContainer: {
        right: 10,
    },
});

