import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS,
} from '../variables/scales';

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
                        <Text style={{color:theme.loginBlue, fontSize:16, fontWeight:'bold',}}>프라임 코스트 비율</Text>
                    </View>
                    <View style={styles.underGuiderWrapper}>
                        <Text style={{fontWeight:'bold', color:theme.loginBlue, fontSize:21, marginTop:12,}}>상황별 원가 비율 선택 Tip</Text>
                        <View style={styles.underGuideImgRow}>
                            
                        </View>
                        <View style={styles.underGuideRow}>
                            <View style={{...styles.underGuideTitleWrapper, backgroundColor:theme.primeCostRed}}>
                                <View style={styles.caseWrapper}>
                                    <Text style={{color:'white'}}>CASE 1</Text>
                                </View>
                                <Text style={{color:'white'}}>높은 원가 비율 (55 ~ 60%)</Text>
                            </View>
                            {/* 여기에 넣을 계획입니다. */}
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
});