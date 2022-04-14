import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, } from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS,
} from '../variables/scales';

import { theme } from '../variables/color';

let i=0;

const CompeteCostModal = ({ showModal, setShowModal,}) => {
    
    const handleOutsideClick=()=>{
        setShowModal(false);
    };
 
    return (
        <View style={styles.outside}>
            <Pressable onPress={handleOutsideClick} style={{flex:1, width:'100%',}}></Pressable>
            <View style={styles.mainbody}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.txtHeader}>경쟁자</Text>
                    <View style={styles.oneLine}>
                        <View style={styles.bottomArray}><Text style={styles.txtHeader}>가격결정법
                        </Text></View>
                        <View style={styles.bottomArray}><Text style={styles.txtHeaderNomal}> 살펴보기
                        </Text></View>
                    </View>
                </View>
                <View style={styles.contentOutterWrapper}>
                    <View style={styles.contentGreyWrapper}>
                        <Text>단순하며 사용하기 편하기 때문에 가장 많이 활용되는 정성적, 주관적 가격결정방법으로, 정량적 가격 측정 이후 비교하는 용도로 사용되는 것이 바람직합니다.</Text>
                        <Text></Text>
                        <Text>아래표는 동종업계의 평균 메뉴 항목과 가격으로, 모든 메뉴를 포함하고 있지 않을 수 있습니다.</Text>
                        <Text style={styles.contentTxtOrange}>참고자료로 사용해주시고, 검색을 통해 사장님이 속한 주변 가게도 꼭 한번 비교해 보세요!</Text>
                        <Text style={styles.contentTxtGrey}>(출처 : 통계청, 농촌경제연구원)</Text>
                    </View>
                </View>
                <View style={styles.oneLine}>
                    <View style={styles.bottomArray}><Text style={styles.contentTxtOrangeBold}>한식</Text></View>
                    <View style={styles.bottomArray}><Text style={styles.contentTxtBold}> 업종별 대표메뉴 가격</Text></View>
                </View>
            </View>
        </View>
    );
}

export default CompeteCostModal;

const styles = StyleSheet.create({
    outside:{
        flex:1,
        width:'100%',
        justifyContent:'flex-end',
    },
    mainbody:{
        width:'100%',
        flex:9,
        alignItems:'center',
        backgroundColor:theme.inputBackground2,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    headerWrapper:{
        width:'100%',
        paddingVertical:'3%',
        backgroundColor:theme.torangGrey,
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
    txtHeaderNomal:{
        fontSize:17,
        color:'white',
    },    
    contentOutterWrapper:{
        width:'100%',
        alignItems:'center',
    },
    contentGreyWrapper:{
        marginTop:'4%',
        width:'90%',
        backgroundColor:theme.competeBackGrey,
        padding:'4%',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        marginBottom:'5%',
    },
    contentTxtOrange:{
        color:theme.competeFontOrange,
    },
    contentTxtOrangeBold:{
        color:theme.competeFontOrange,
        fontWeight:'bold',
        fontSize:24,
    },
    contentTxtBold:{
        fontWeight:'bold',
        fontSize:18,
    },
    contentTxtGrey:{
        color:theme.competeFontGrey,
    },
    oneLine:{
        flexDirection:'row',
        width:'90%'
    },   
    bottomArray:{
        justifyContent:'flex-end',
    },
});
