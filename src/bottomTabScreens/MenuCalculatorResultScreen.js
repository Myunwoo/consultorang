import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView, TextInput, Keyboard, Platform } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { theme } from '../variables/color';
import {dateObject,CONTENT_SECTION_BORDER_RADIUS, BASIC_SHADOW} from '../variables/scales';

import commonStyles from '../variables/commonStyles';
import WeatherHeader from '../components/WeatherHeader';

import ModalComponent from '../modals/ModalComponent';
import PrimeCostModal from '../modals/PrimeCostModal';
import CompeteCostModal from '../modals/CompeteCostModal';
import OriginCostModal from '../modals/OriginCostModal';
import MenuCalculatorHistoryScreen from './MenuCalculatorHistoryScreen';

const TYPE=[
    {text:'메뉴 가격 계산기'},
    {text:'목록'}
]

const MenuCalculatorResultScreen = (({navigation, route}) => {
    //추후에 route로부터 초기값을 얻어내게 되면, useState의 초기값 세팅에 활용해 주도록 합시다.
    const {menuName}=route.params;
    const [type, setType]=useState(TYPE[0].text);
    const [competeVisible, setCompeteVisible]=useState(false);
    const [primeVisible, setPrimeVisible]=useState(false);
    const [originVisible, setOriginVisible]=useState(false);
    const [cost, setCost]=useState({
       ingre:1,
       human:2, 
    });
    const [primeCost, setPrimeCost]=useState({
        min:0,
        max:100,
    });
    const [rawCost, setRawCost]=useState({
        min:2,
        max:99,
    });
    const [companyCost, setCompanyCost]=useState({
       min:3,
       max:98, 
    });

    const handlePrimeOpen=()=>{
        setPrimeVisible(true);
    };

    const handleCompeteOpen=()=>{
        setCompeteVisible(true);
    };

    const handleOriginOpen=()=>{
        setOriginVisible(true);
    };
    //로컬에 계산된 데이터를 저장해 주어야 합니다
    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={commonStyles.mainbody}>
            <ModalComponent showModal={primeVisible} setShowModal={setPrimeVisible}>
                <PrimeCostModal showModal={primeVisible} setShowModal={setPrimeVisible}></PrimeCostModal>
            </ModalComponent>
            <ModalComponent showModal={competeVisible} setShowModal={setCompeteVisible}>
                <CompeteCostModal showModal={competeVisible} setShowModal={setCompeteVisible}></CompeteCostModal>
            </ModalComponent>
            <ModalComponent showModal={originVisible} setShowModal={setOriginVisible}>
                <OriginCostModal showModal={originVisible} setShowModal={setOriginVisible}></OriginCostModal>
            </ModalComponent>
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
                        <View style={styles.infoOutterWrapper}>
                            <View style={styles.infoTitleWrapper}>
                                <Text style={styles.txtInfoTitle}>{menuName}</Text>
                                <Text style={styles.txtInfoSubTitle}>Prime Cost</Text>
                            </View>
                            <View style={styles.infoInnerWrapper}>
                                <View style={styles.infoCostWrapper}>
                                    <Text style={styles.txtInfoCost}>{`${cost.ingre}원`}</Text>
                                    <Text style={styles.txtInfoSubCost}>식재료 원가</Text>
                                </View>
                                <View style={{width:1, hegiht:'90%', backgroundColor:theme.backgroundGrey}}></View>
                                <View style={styles.infoCostWrapper}>
                                    <Text style={styles.txtInfoCost}>{`${cost.human}원`}</Text>
                                    <Text style={styles.txtInfoSubCost}>인건비</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.triangleWrapper}>
                            <View style={styles.triangle}></View>   
                        </View>
                        <View style={styles.costCardWrapper}>
                            <View style={{backgroundColor:theme.primeCostOrange, width:16, height:'100%', borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS, borderBottomLeftRadius:CONTENT_SECTION_BORDER_RADIUS}}></View>
                            <View style={styles.cardContentWrapper}>
                                <View style={styles.cardTitleOutterWrapper}>
                                    <View style={{backgroundColor:theme.primeCostOrange ,...styles.cardTitleInnerWrapper}}>
                                        <Text style={styles.txtCardTitle}>프라임 코스트법</Text>
                                    </View>
                                </View>
                                <View style={styles.cardTxtWrapper}>
                                    <Text style={styles.txtMinCost}>{`${primeCost.min} ~ ${primeCost.max}원`}</Text>
                                    <View style={{...styles.cardInfoWrapper, backgroundColor:theme.primeCostOrange}}>
                                        <Pressable onPress={handlePrimeOpen} style={styles.btnCardInfo}>
                                            <View style={styles.companyTriangle}></View>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.costCardWrapper}>
                            <View style={{backgroundColor:theme.btnExpenditureBlue, width:16, height:'100%', borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS, borderBottomLeftRadius:CONTENT_SECTION_BORDER_RADIUS}}></View>
                            <View style={styles.cardContentWrapper}>
                                <View style={styles.cardTitleOutterWrapper}>
                                    <View style={{backgroundColor:theme.btnExpenditureBlue ,...styles.cardTitleInnerWrapper}}>
                                        <Text style={styles.txtCardTitle}>원가기준 가격결정법</Text>
                                    </View>
                                </View>
                                <View style={styles.cardTxtWrapper}>
                                    <Text style={styles.txtMinCost}>{`${rawCost.min} ~ ${rawCost.max}원`}</Text>
                                    <View style={{...styles.cardInfoWrapper, backgroundColor:theme.btnExpenditureBlue}}>
                                        <Pressable onPress={handleOriginOpen} style={styles.btnCardInfo}>
                                            <View style={styles.companyTriangle}></View>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{width:'100%', height:20, marginBottom:16, justifyContent:'center', alignItems:'center',}}>
                            <Text style={styles.txtGuide}>※ 위의 가격은 부가세가 포함된 가격입니다. ※</Text>
                        </View>
                        <View style={{...styles.costCardWrapper, height:170,}}>
                            <View style={{backgroundColor:theme.torangGrey, width:16, height:'100%', borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS, borderBottomLeftRadius:CONTENT_SECTION_BORDER_RADIUS}}></View>
                            <View style={styles.cardContentWrapper}>
                                <View style={styles.cardTitleOutterWrapper}>
                                    <View style={{backgroundColor:theme.torangGrey ,...styles.cardTitleInnerWrapper}}>
                                        <Text style={styles.txtCardTitle}>경쟁자 가격결정법</Text>
                                    </View>
                                </View>
                                <View style={styles.competeTxtOutterWrapper}>
                                    <View style={{...styles.competeTxtInnerWrapper, alignItems:'flex-end'}}>
                                        <Text style={styles.txtCompete}>주변상권, 혹은 동종업계 경쟁자의 가격과 비슷하게 책정하는 방법입니다.</Text>
                                    </View>
                                    <View style={{width:'100%', height:8,}}></View>
                                    <View style={{...styles.competeTxtInnerWrapper, justifyContent:'space-between',}}>
                                        <View style={{maxWidth:'80%',}}>
                                            <Text style={styles.txtCompete}>맹목적 반영보다는 <Text style={{color:theme.primeCostOrange}}>비교 용도</Text>로 사용하는 것이 바랍직합니다.</Text>
                                        </View>
                                        
                                        <View style={{...styles.cardInfoWrapper, backgroundColor:theme.torangGrey}}>
                                            <Pressable onPress={handleCompeteOpen} style={styles.btnCardInfo}>
                                                <View style={styles.companyTriangle}></View>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    :   <View style={commonStyles.historyScreenWrapper}>
                        <MenuCalculatorHistoryScreen navigation={navigation}></MenuCalculatorHistoryScreen>
                    </View>}
                </View>
            </View>
        </LinearGradient>
    );
});

export default MenuCalculatorResultScreen;

const styles=StyleSheet.create({
    scrollview:{
        alignItems:'center',
        paddingHorizontal:12,
    },
    infoOutterWrapper:{
        width:'100%',
        height:220,
        backgroundColor:theme.ingreBackDarkGrey,
        marginTop:15,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        alignItems:'center',
    },
    infoTitleWrapper:{
        width:'100%',
        height:100,
        justifyContent:'center',
        alignItems:'center',
    },
    txtInfoTitle:{
        fontSize:20,
        ...commonStyles.commonTextShadow,
    },
    txtInfoSubTitle:{
        fontSize:22,
        fontWeight:'bold',
        ...commonStyles.commonTextShadow,
    },
    txtInfoCost:{
        fontSize:24,
        fontWeight:'bold',
        ...commonStyles.commonTextShadow,
    },
    txtInfoSubCost:{
        fontSize:20,
        ...commonStyles.commonTextShadow,
    },
    infoInnerWrapper:{
        width:'90%',
        flex:1,
        backgroundColor:'white',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        marginBottom:12,
        flexDirection:'row',
    },
    infoCostWrapper:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    triangleWrapper:{
        width:'100%',
        height:40,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 20,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: theme.torangYellow,
        transform: [{ rotate: "180deg" }],
        alignSelf:'center',
    },
    costCardWrapper:{
        width:'100%',
        height:140,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        backgroundColor:'white',
        flexDirection:'row',
        marginBottom:16,
        ...BASIC_SHADOW,
    },
    cardContentWrapper:{
        flex:3
    },
    cardTitleOutterWrapper:{
        flexDirection:'row',
        height:24,
        marginTop:12,
        marginLeft:8,
    },
    cardTitleInnerWrapper:{
        height:'100%',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        paddingHorizontal:32,
        justifyContent:'center',
        alignItems:'center',
    },
    txtCardTitle:{
        color:'white',
        fontSize:16,
        ...commonStyles.commonTextShadow,
    },
    cardInfoWrapper:{
        width:50,
        height:50,
        borderRadius:50,
    },
    btnCardInfo:{
        width:36,
        height:36,
        justifyContent:'center',
        alignItems:'center',
    },
    cardTxtWrapper:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginTop:8,
        marginLeft:32,
        marginRight:20,
    },
    txtMinCost:{
        fontSize:30,
        fontWeight:'bold',
        marginBottom:8,
    },
    txtMaxCost:{
        fontSize:24,
        fontWeight:'bold',
        ...commonStyles.commonTextShadow,
    },
    companyBtnOutterWrapper:{
        flex:1,
        width:'100%',
        marginBottom:8,
        alignItems:'flex-end',
    },
    btnCompanyWrapper:{
        width:40,
        height:40,
        borderRadius:40,
        backgroundColor:theme.torangGrey,
        marginRight:20,
    },
    companyTriangle:{
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: 'white',
        transform: [{ rotate: "90deg", }],
        alignSelf:'center',
        marginLeft:20,
        marginTop:14,
    },
    bottomInfoWrapper:{
        width:'100%',
        height:40,
        marginBottom:16,
        justifyContent:'center',
        alignItems:'center',
    },
    txtGuide:{
        color:theme.torangGrey,
        ...commonStyles.commonTextShadow,
        ...Platform.select({
            ios:{
                fontSize:17,
            },
            android:{
                fontSize:14,
            }
        })
    },
    competeTxtOutterWrapper:{
        marginBottom:14,
        flex:1,
        width:'100%',
        alignItems:'center',
    },
    competeTxtInnerWrapper:{
        flex:1,
        width:'90%',
        flexDirection:'row',
    },
    txtCompete:{
        ...Platform.select({
            ios:{
                fontSize:17,
            },
            android:{
                fontSize:14,
            }
        })
    },
});