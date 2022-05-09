import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Image} from 'react-native';
import {
    BASIC_SHADOW,
    CONTENT_SECTION_BORDER_RADIUS,
} from '../variables/scales';
import {commonStyles, modalStyles} from '../variables/commonStyles';

import {LOW_COST_COMP_LIST, HIGH_COST_COMP_LIST} from '../variables/codelist';
import { theme } from '../variables/color';
import PrimeCostRowComp from '../components/PrimeCostRowComp';
import ModalGraphComp from '../components/ModalGraphComp';

let i=0;

const OriginCostModal = ({ showModal, setShowModal,}) => {
    
    const handleOutsideClick=()=>{
        setShowModal(false);
    };
 
    return (
        <View style={modalStyles.outside}>
            <Pressable onPress={handleOutsideClick} style={{flex:1, width:'100%',}}></Pressable>
            <View style={modalStyles.mainbody}>
                <View style={modalStyles.headerWrapper}>
                    <Text style={modalStyles.txtHeader}>원가기준</Text>
                    <Text style={modalStyles.txtHeader}>가격결정법 <Text style={{fontSize:16, fontWeight:'normal'}}>이란?</Text></Text>
                </View>
                <ScrollView contentContainerStyle={{alignItems:'center',}} style={modalStyles.contentOutterWrapper}>
                    <View style={modalStyles.upperGuideWrapper}>
                        <Text>객관적 가격결정법 (수치화된 기초 자료 활용)으로, 식재료
                        원가를 기준으로 가격을 책정합니다.
                        </Text>
                    </View>
                    <View style={modalStyles.graphHeader}>
                        <Text style={{color:theme.loginBlue, fontSize:16, fontWeight:'bold', marginRight:8,}}>적정 가격</Text>
                        <Text>(원)</Text>
                    </View>
                    <View style={modalStyles.graphWrapper}>
                        <ModalGraphComp 
                            type={'origin'}
                            data={[1360, 1440, 1600, 1760, 2000]}
                            column={['40%', '35%', '30%', '25%', '20%',]}>
                        </ModalGraphComp>
                    </View>
                    <View style={modalStyles.underGuideHeader}>
                        <Text style={{color:theme.loginBlue, fontSize:16, fontWeight:'bold',}}>식재료 원가 비율</Text>
                    </View>
                    <View style={modalStyles.underGuiderWrapper}>
                        <Text style={{fontWeight:'bold', color:theme.loginBlue, fontSize:21, marginTop:12,}}>상황별 원가 비율 선택 Tip</Text>
                        <View style={modalStyles.underGuideImgRow}>
                            <View style={modalStyles.imgWrapper}>
                                <Image
                                    style={modalStyles.img}
                                    source={require('../../image/torang1.png')}
                                >
                                </Image>
                            </View>
                            <View style={{flex:1, height:'100%', alignItems:'center', justifyContent:'center',}}>
                                <View style={modalStyles.bubbleWrapper}>
                                    <Text style={modalStyles.txtBubble}>우리 매장은 어떤 가격을 골라야 할까?</Text>
                                </View>
                                <View style={{justifyContent:'center', alignItems:'center',}}>
                                    <Text style={{...commonStyles.commonTextShadow,}}>매장의 상황, 전략 등에 맞게 결정하여야</Text>
                                    <Text style={{...commonStyles.commonTextShadow,}}>보다 합리적인 가격이 됩니다.</Text>
                                    <Text style={{...commonStyles.commonTextShadow,}}>(프라임 코스트법과 원리 동일)</Text>
                                </View>
                            </View>
                        </View>
                        <View style={modalStyles.underGuideRow}>
                            <View style={{...modalStyles.underGuideTitleWrapper, backgroundColor:theme.primeCostRed}}>
                                <View style={modalStyles.caseWrapper}>
                                    <Text style={{color:'white'}}>CASE 1</Text>
                                </View>
                                <Text style={{color:'white'}}>높은 원가 비율 (55 ~ 60%)</Text>
                            </View>
                            {LOW_COST_COMP_LIST.map(comp=>{
                                return (<View style={modalStyles.rowCompWrapper}>
                                    <PrimeCostRowComp source={{...comp, type:'0'}}></PrimeCostRowComp>
                                </View>);
                                }
                            )}
                        </View>
                        <View style={modalStyles.underGuideRow}>
                            <View style={{...modalStyles.underGuideTitleWrapper, backgroundColor:theme.primeCostBlue}}>
                                <View style={modalStyles.caseWrapper}>
                                    <Text style={{color:'white'}}>CASE 2</Text>
                                </View>
                                <Text style={{color:'white'}}>낮은 원가 비율 (40 ~ 45%)</Text>
                            </View>
                            {HIGH_COST_COMP_LIST.map(comp=>{
                                return (<View style={modalStyles.rowCompWrapper}>
                                    <PrimeCostRowComp source={{...comp, type:'1'}}></PrimeCostRowComp>
                                </View>);
                                }
                            )}
                        </View>
                    </View>
                    <View style={modalStyles.bottomInfoWrapper}>
                        <Text style={modalStyles.txtBottomInfo}><Text style={{fontSize:22, color:theme.primeCostRed,}}>※ </Text>
                        사장님의 매장에 대한 객관적인 평가와 방향성과 함께 고려되어야 함으로, 참고 수준으로 사용해주세요!
                        <Text style={{fontSize:22, color:theme.primeCostRed,}}> ※</Text></Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default OriginCostModal;