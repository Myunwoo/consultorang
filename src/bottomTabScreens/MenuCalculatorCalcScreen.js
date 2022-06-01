import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView, TextInput, Keyboard, AsyncStorage } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { theme } from '../variables/color';
import {CONTENT_SECTION_BORDER_RADIUS, BASIC_SHADOW} from '../variables/scales';
import {getItemAsyncStorage} from '../abstract/asyncTasks';

import commonStyles from '../variables/commonStyles';
import WeatherHeader from '../components/WeatherHeader';
import CalcSelectBtn from '../components/CalcSelectBtn';
import MenuCalculatorHistoryScreen from './MenuCalculatorHistoryScreen';

const TYPE=[
    {text:'메뉴 가격 계산기'},
    {text:'목록'}
];

const MenuCalculatorCalcScreen = (({navigation, route}) => {
    const {menuImg, menuName, ingreArr}=route.params;
    // 시급/월급 타입
    const [wageType, setWageType]=useState('시급');
    // 시급/월급 액수
    const [wage, setWage]=useState('');
    // 직원 수
    const [numOfEmployee, setNumOfEmployee]=useState('');
    // 조리 시간
    const [timeTaken, setTimeTaken]=useState('');
    // 분/시간 타입
    const [unitOfTime, setUnitOfTime]=useState('분');
    // 인분/개 수
    const [count, setCount]=useState('');
    // 인분/개 타입
    const [unitOfCount, setUnitOfCount]=useState('인분');

    const [type, setType]=useState(TYPE[0].text);
    //쉬는날의 수
    const [holiday, setHoliday]=useState([]);
    const [businessTime, setBusinessTime]=useState({
        businessStart:8,
        businessEnd:18,
    });

    useEffect(()=>{
        getItemAsyncStorage('businessHoliday')
            .then(retVal=>JSON.parse(retVal))
            .then(retVal=>setHoliday(retVal))
            .catch(error=> {
                console.log(error)
                setHoliday([]);
            });

        Promise.all([getItemAsyncStorage('businessStart'),getItemAsyncStorage('businessEnd')])
            .then((values)=>{
                setBusinessTime({
                    businessStart:values[0],
                    businessEnd:values[1]
                });
            })
            .catch(error=>{
                setBusinessTime({
                    businessStart:8,
                    businessEnd:20
                });
            });
    },[]);

    //월급을 시급으로 변환해주는 함수
    const monthToHourlyWage=(wage)=>{
        //하루 근무시간
        let workTime=0;
        const bsStart=Number(businessTime.businessStart);
        const bsEnd=Number(businessTime.businessEnd);
        
        if(bsStart>=bsEnd){
            workTime+=(bsEnd+(24-bsStart));
        }else{
            workTime+=(bsEnd-bsStart);
        }
        //4시간에 30분 휴식 부여
        workTime-=parseInt(workTime/4)*0.5;


        //한달은 30일로 고정했고, 쉬는 날은 각 요일당 4번 존재하는 것으로 통일함
        //공휴일에 대한 처리는 어떻게 해야하는 건지... 그냥 일요일과 동일하게 취급
        let workDay=28-(holiday.length*4);
        if(holiday.includes('공휴일') && holiday.includes('일')) workDay+=4;

        let result=wage;
        result/=workDay;
        result/=workTime;
        result=Math.round(result/10)*10;
        return result;
    }

    const handleCalc=()=>{
        if(isNaN(wage) || wage==='0' || wage===''){
            alert('시급/월급을 올바르게 입력해주세요.');
            return;
        }
        if(isNaN(numOfEmployee) || numOfEmployee==='0' || numOfEmployee===''){
            alert('직원수를 올바르게 입력해주세요.');
            return;
        }
        if(isNaN(timeTaken) || timeTaken==='0' || timeTaken===''){
            alert('분/시간을 올바르게 입력해주세요.');
            return;
        }
        if(isNaN(count) || count==='0' || count===''){
            alert('인분/개를 올바르게 입력해주세요.');
            return;
        }
        //1. 1개 or 1인분을 만드는 데 들어가는 돈을 구합니다.
        //2. 월급으로 적었을 경우에 시급으로 환산해줍니다.
        //3. 이곳에서 구한 인건비와, ingreArr에 적힌 원재료 가격을 다음 화면으로 넘겨주면 되겠습니다.
        let hourlyWage=wage;
        if(wageType==='월급') hourlyWage=monthToHourlyWage(wage);

        ///////
        let myTimeTaken=timeTaken;
        if(unitOfTime==='분') myTimeTaken/=60;
        //메뉴 하나를 만드는 데 든 비용
        let costOfOne=hourlyWage*myTimeTaken/count;
        
        costOfOne=Math.round(costOfOne/10)*10;

        navigation.navigate('MenuCalculatorResultScreen', { menuImg, menuName, costOfOne, ingreArr});
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
                                <View style={styles.calcCompWrapper}><CalcSelectBtn source={{prop:wageType,setter:setWageType,title:'시급',}}></CalcSelectBtn></View>
                                <View style={styles.calcCompWrapper}><CalcSelectBtn source={{prop:wageType,setter:setWageType,title:'월급',}}></CalcSelectBtn></View>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(txt) => setWage(txt)}
                                    placeholder={'시급/월급을 입력해 주세요'}
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
                                    onChangeText={(txt) => setNumOfEmployee(txt)}
                                    placeholder={'인원수를 입력해 주세요'}
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
                                    onChangeText={(txt) => setTimeTaken(txt)}
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
                                <View style={styles.calcCompWrapper}><CalcSelectBtn source={{prop:unitOfTime,setter:setUnitOfTime,title:'분',}}></CalcSelectBtn></View>
                                <View style={styles.calcCompWrapper}><CalcSelectBtn source={{prop:unitOfTime,setter:setUnitOfTime,title:'시간',}}></CalcSelectBtn></View>
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
                                    onChangeText={(txt) => setCount(txt)}
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
                                <View style={styles.calcCompWrapper}><CalcSelectBtn source={{prop:unitOfCount,setter:setUnitOfCount,title:'인분',}}></CalcSelectBtn></View>
                                <View style={styles.calcCompWrapper}><CalcSelectBtn source={{prop:unitOfCount,setter:setUnitOfCount,title:'개',}}></CalcSelectBtn></View>
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