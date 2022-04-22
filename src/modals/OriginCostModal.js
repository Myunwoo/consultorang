import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Image} from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS,
} from '../variables/scales';

import {LOW_COST_COMP_LIST, HIGH_COST_COMP_LIST} from '../variables/codelist';
import { theme } from '../variables/color';
import PrimeCostRowComp from '../components/PrimeCostRowComp';

let i=0;

const OriginCostModal = ({ showModal, setShowModal,}) => {
    
    const handleOutsideClick=()=>{
        setShowModal(false);
    };
 
    return (
        <View style={styles.outside}>
            <Pressable onPress={handleOutsideClick} style={{flex:1, width:'100%',}}></Pressable>
            <View style={styles.mainbody}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.txtHeader}>원가기준</Text>
                    <Text style={styles.txtHeader}>가격결정법 <Text style={{fontSize:16, fontWeight:'normal'}}>이란?</Text></Text>
                </View>
                <ScrollView contentContainerStyle={{alignItems:'center',}} style={styles.contentOutterWrapper}>
                    <View style={styles.upperGuideWrapper}>
                        <Text>객관적 가격결정법 (수치화된 기초 자료 활용)으로, 식재료
                        원가를 기준으로 가격을 책정합니다.
                        </Text>
                    </View>
                    <View style={styles.graphHeader}>
                        <Text style={{color:theme.loginBlue, fontSize:16, fontWeight:'bold', marginRight:8,}}>적정 가격</Text>
                        <Text>(원)</Text>
                    </View>
                    <View style={styles.graphWrapper}>

                    </View>
                    <View style={styles.underGuideHeader}>
                        <Text style={{color:theme.loginBlue, fontSize:16, fontWeight:'bold',}}>식재료 원가 비율</Text>
                    </View>
                    <View style={styles.underGuiderWrapper}>
                        <Text style={{fontWeight:'bold', color:theme.loginBlue, fontSize:21, marginTop:12,}}>상황별 원가 비율 선택 Tip</Text>
                        <View style={styles.underGuideImgRow}>
                            <View style={styles.imgWrapper}>
                                <Image
                                    style={styles.img}
                                    source={require('../../image/torang1.png')}
                                >
                                </Image>
                            </View>
                            <View style={{flex:1, height:'100%', alignItems:'center', justifyContent:'center',}}>
                                <View style={{paddingHorizontal:12, paddingVertical:10, backgroundColor:'white', marginBottom:8, borderRadius:CONTENT_SECTION_BORDER_RADIUS}}>
                                    <Text>우리 매장은 어떤 가격을 골라야 할까?</Text>
                                </View>
                                <View style={{justifyContent:'center', alignItems:'center',}}>
                                    <Text>매장의 상황, 전략 등에 맞게 결정하여야</Text>
                                    <Text>보다 합리적인 가격이 됩니다.</Text>
                                    <Text>(프라임 코스트법과 원리 동일)</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.underGuideRow}>
                            <View style={{...styles.underGuideTitleWrapper, backgroundColor:theme.primeCostRed}}>
                                <View style={styles.caseWrapper}>
                                    <Text style={{color:'white'}}>CASE 1</Text>
                                </View>
                                <Text style={{color:'white'}}>높은 원가 비율 (55 ~ 60%)</Text>
                            </View>
                            {LOW_COST_COMP_LIST.map(comp=>{<View style={{width:'100%', height:60,}}><PrimeCostRowComp source={{...comp, type:0}}></PrimeCostRowComp></View>})}
                            <View style={{width:'100%',height:60,marginVertical:4,}}><PrimeCostRowComp source={{img:require('../../image/sol_money_down.jpg'), title:'저가 전략 (가격경쟁력)', content:'임대료(상권 특성 등), 시설비 등의 고정비나 투자비(간편한 조리, 연구의 불필요 등)가 적은 경우 야옹야옹', type:'0'}}></PrimeCostRowComp></View>
                           <View style={{width:'100%', height:60,marginVertical:4,}}><PrimeCostRowComp source={{img:require('../../image/sol_money_up.jpg'), title:'낮은 운영비', content:'임대료(상권 특성 등), 시설비 등의 고정비나 투자비(간편한 조리, 연구의 불필요 등)가 적은 경우', type:'0'}}></PrimeCostRowComp></View>
                        </View>
                        <View style={styles.underGuideRow}>
                            <View style={{...styles.underGuideTitleWrapper, backgroundColor:theme.primeCostBlue}}>
                                <View style={styles.caseWrapper}>
                                    <Text style={{color:'white'}}>CASE 2</Text>
                                </View>
                                <Text style={{color:'white'}}>낮은 원가 비율 (40 ~ 45%)</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomInfoWrapper}>
                        <Text style={styles.txtBottomInfo}><Text style={{fontSize:22, color:theme.primeCostRed,}}>※ </Text>
                        사장님의 매장에 대한 객관적인 평가와 방향성과 함께 고려되어야 함으로, 참고 수준으로 사용해주세요!
                        <Text style={{fontSize:22, color:theme.primeCostRed,}}> ※</Text></Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default OriginCostModal;

const styles = StyleSheet.create({
    outside:{
        flex:1,
        width:'100%',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    mainbody:{
        width:'100%',
        flex:9,
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    headerWrapper:{
        width:'100%',
        height:70,
        backgroundColor:theme.loginBlue,
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        justifyContent:'center',
        paddingLeft:20,
    },
    txtHeader:{
        fontWeight:'bold',
        fontSize:20,
        color:'white',
    },
    contentOutterWrapper:{
        width:'100%',
        flex:9,
    },
    upperGuideWrapper:{
        width:'95%',
        marginVertical:16,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        padding:12,
        backgroundColor:'rgb(221,239,242)',
    },
    upperGuideUnderRow:{
        flexDirection:'row',
        justifyContent:'space-evenly',
    },
    guideCircle:{
        backgroundColor:theme.primeCostOrange,
        paddingVertical:8,
        paddingHorizontal:20,
        borderRadius:24,
        justifyContent:'center',
        alignItems:'center',
    },
    guideOperator:{
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:4,
    },
    txtOperator:{
        color:'grey',
        fontSize:20,
    },
    graphHeader:{
        justifyContent:'flex-start',
        width:'95%',
        flexDirection:'row',
        marginBottom:8,
    },
    graphWrapper:{
        width:'95%',
        height:220,
        backgroundColor:'teal',
    },
    underGuideHeader:{
        marginVertical:12,
    },
    underGuiderWrapper:{
        width:'95%',
        backgroundColor:theme.inputBackground2,
        alignItems:'center',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    underGuideImgRow:{
        marginTop:12,
        flexDirection:'row',
        width:'90%',
        height:120,
    },
    imgWrapper:{
        height:100,
    },
    img:{
        resizeMode: 'contain',
        flex: 1,
        aspectRatio: 1
    },
    underGuideRow:{
        width:'95%',
        marginVertical:12,
        alignItems:'center',
    },
    underGuideTitleWrapper:{
        width:'90%',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        flexDirection:'row',
        backgroundColor:'teal',
        paddingVertical:8,
        alignItems:'center',
    },
    caseWrapper:{
        marginLeft:12,
        marginRight:8,
        paddingHorizontal:4,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderWidth:1,
        borderColor:'white',
    },
    bottomInfoWrapper:{
        width:'90%',
        marginTop:20,
        marginBottom:60,
    },
    txtBottomInfo:{
        fontSize:16,
        lineHeight:22,
    }
});