import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView, TextInput, Keyboard } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { theme } from '../variables/color';
import {dateObject,CONTENT_SECTION_BORDER_RADIUS, BASIC_SHADOW} from '../variables/scales';

import commonStyles from '../variables/commonStyles';
import WeatherHeader from '../components/WeatherHeader';

import ModalComponent from '../modals/ModalComponent';
import PrimeCostModal from '../modals/PrimeCostModal';
import CompeteCostModal from '../modals/CompeteCostModal';

const MenuCalculatorResultScreen = (({navigation, route}) => {0
    const {menuName}=route.params;
    const [competeVisible, setCompeteVisible]=useState(false);
    const [primeVisible, setPrimeVisible]=useState(false);
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
    //로컬에 계산된 데이터를 저장해 주어야 합니다
    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={commonStyles.mainbody}>
            <ModalComponent showModal={primeVisible} setShowModal={setPrimeVisible}>
                <PrimeCostModal showModal={primeVisible} setShowModal={setPrimeVisible}></PrimeCostModal>
            </ModalComponent>
            <ModalComponent showModal={competeVisible} setShowModal={setCompeteVisible}>
                <CompeteCostModal showModal={competeVisible} setShowModal={setCompeteVisible}></CompeteCostModal>
            </ModalComponent>
            <WeatherHeader></WeatherHeader>
            <View style={commonStyles.contentSection}>
                <View style={commonStyles.titleWrapper}>
                    <Text style={commonStyles.txtTitle}>메뉴 가격 계산기</Text>
                </View>       
                <View style={{width:50, height:50, backgroundColor:theme.titleWrapperBlue, position:'absolute', top:30, left:0, zIndex:1}}></View>
                <View style={commonStyles.contentWrapper}>
                    <ScrollView style={{width:'100%',}} contentContainerStyle={styles.scrollview}>
                        <View style={styles.infoOutterWrapper}>
                            <View style={styles.infoTitleWrapper}>
                                <Text style={{fontSize:20,}}>{menuName}</Text>
                                <Text style={{fontSize:22,}}>Prime Cost</Text>
                            </View>
                            <View style={styles.infoInnerWrapper}>
                                <View style={styles.infoCostWrapper}>
                                    <Text style={{fontSize:24,}}>{`${cost.ingre}원`}</Text>
                                    <Text style={{fontSize:20,}}>식재료 원가</Text>
                                </View>
                                <View style={{width:1, hegiht:'90%', backgroundColor:theme.backgroundGrey}}></View>
                                <View style={styles.infoCostWrapper}>
                                    <Text style={{fontSize:24,}}>{`${cost.human}원`}</Text>
                                    <Text style={{fontSize:20,}}>인건비</Text>
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
                                    <Pressable onPress={handlePrimeOpen} style={styles.btnCardInfo}>
                                        <Image
                                            resizeMode='contain'
                                            style={{width:'100%', height:'100%',marginLeft:8,}}
                                            source={require('../../image/calc_human.png')}
                                        >
                                        </Image>
                                    </Pressable>
                                </View>
                                <View style={styles.cardCostWrapper}>
                                    <Text style={styles.txtMinCost}>{`${primeCost.min}`}</Text>
                                    <Text style={styles.txtMaxCost}>{`~ ${primeCost.max}원`}</Text>
                                </View>
                            </View>
                            <View style={styles.cardGraphWrapper}>

                            </View>
                        </View>
                        <View style={styles.costCardWrapper}>
                            <View style={{backgroundColor:theme.btnExpenditureBlue, width:16, height:'100%', borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS, borderBottomLeftRadius:CONTENT_SECTION_BORDER_RADIUS}}></View>
                            <View style={styles.cardContentWrapper}>
                                <View style={styles.cardTitleOutterWrapper}>
                                    <View style={{backgroundColor:theme.btnExpenditureBlue ,...styles.cardTitleInnerWrapper}}>
                                        <Text style={styles.txtCardTitle}>원가기준 가격결정법</Text>
                                    </View>
                                    <Pressable style={styles.btnCardInfo}>
                                        <Image
                                            resizeMode='contain'
                                            style={{width:'100%', height:'100%',marginLeft:8,}}
                                            source={require('../../image/calc_human.png')}
                                        >
                                        </Image>
                                    </Pressable>
                                </View>
                                <View style={styles.cardCostWrapper}>
                                    <Text style={styles.txtMinCost}>{`${rawCost.min}`}</Text>
                                    <Text style={styles.txtMaxCost}>{`~ ${rawCost.max}원`}</Text>
                                </View>
                            </View>
                            <View style={styles.cardGraphWrapper}>

                            </View>
                        </View>
                        <View style={styles.costCardWrapper}>
                            <View style={{backgroundColor:theme.torangGrey, width:16, height:'100%', borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS, borderBottomLeftRadius:CONTENT_SECTION_BORDER_RADIUS}}></View>
                            <View style={styles.cardContentWrapper}>
                                <View style={styles.cardTitleOutterWrapper}>
                                    <View style={{backgroundColor:theme.torangGrey ,...styles.cardTitleInnerWrapper}}>
                                        <Text style={styles.txtCardTitle}>경쟁자 가격결정법</Text>
                                    </View>
                                    <Pressable onPress={handleCompeteOpen} style={styles.btnCardInfo}>
                                        <Image
                                            resizeMode='contain'
                                            style={{width:'100%', height:'100%',marginLeft:8,}}
                                            source={require('../../image/calc_human.png')}
                                        >
                                        </Image>
                                    </Pressable>
                                </View>
                                <View style={styles.companyCardCostWrapper}>
                                    <Text>주변상권, 혹은 동종업계 경쟁자의 가격과 비슷하게 책정하는 방법입니다.</Text>
                                </View>
                                <View style={styles.companyBtnOutterWrapper}>
                                    <View style={styles.btnCompanyWrapper}>
                                        <Pressable style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center',}}>
                                            <View style={styles.companyTriangle}></View>   
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.bottomInfoWrapper}>
                            <Text>위의 모든 가격은 부가세가 포함된 가격입니다.</Text>
                        </View>
                    </ScrollView>
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
        height:280,
        backgroundColor:theme.backgroundGrey,
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
        ...BASIC_SHADOW,
    },
    costCardWrapper:{
        width:'100%',
        height:160,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        backgroundColor:'white',
        flexDirection:'row',
        marginBottom:16,
        ...BASIC_SHADOW,
    },
    cardContentWrapper:{
        flex:3
    },
    cardGraphWrapper:{
        flex:2,
    },
    cardTitleOutterWrapper:{
        flexDirection:'row',
        height:36,
        marginTop:8,
        marginLeft:8,
    },
    cardTitleInnerWrapper:{
        height:'100%',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        paddingHorizontal:20,
        justifyContent:'center',
        alignItems:'center',
    },
    txtCardTitle:{
        color:'white',
    },
    btnCardInfo:{
        width:36,
        height:36,
    },
    cardCostWrapper:{
        flex:1,
        justifyContent:'center',
        marginLeft:12,
    },
    txtMinCost:{
        fontSize:24,
        fontWeight:'bold',
        marginBottom:8,
    },
    txtMaxCost:{
        fontSize:24,
        fontWeight:'bold',
    },
    companyCardCostWrapper:{
        flex:1,
        marginLeft:12,
        marginTop:12,
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
    },
    bottomInfoWrapper:{
        width:'100%',
        height:40,
        marginBottom:16,
        justifyContent:'center',
        alignItems:'center',
    },
});