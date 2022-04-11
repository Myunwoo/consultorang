import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Image} from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS,
} from '../variables/scales';

import { theme } from '../variables/color';

let i=0;

const IngreModal = ({ showModal, setShowModal,}) => {
    
    const handleOutsideClick=()=>{
        setShowModal(false);
    };
 
    return (
        <View style={styles.outside}>
            <Pressable onPress={handleOutsideClick} style={{flex:1, width:'100%',}}></Pressable>
            <View style={styles.mainbody}>
                <View style={styles.headerWrapper}><Text style={styles.txtHeader}>식재료 담기</Text></View>
                <ScrollView contentContainerStyle={{alignItems:'center'}} style={styles.contentOutterWrapper}>
                    <View style={styles.guideWrapper}>
                        <Text>메뉴에 사용되는 재료를 기입하는 단계입니다.</Text>
                        <Text style={{marginBottom:4,}}>자세히 기입 할 수록 가격의 정확도가 올라갑니다!</Text>
                        <Text style={{marginBottom:8,}}>매장별 식재료 구매 금액이 다를 수 있기 때문에, 정확도를 위해 구매 용량과 가격을 직접 입력하셔야 합니다.</Text>
                        <View style={{flexDirection:'row',}}>
                            <Image
                                resizeMode='contain'
                                style={{width:20, height:20, marginRight:8,}}
                                source={require('../../image/account_cart.png')}
                            >
                            </Image>
                            <Text style={{color:theme.primeCostOrange, fontSize:20}}>Guide</Text>
                        </View>
                        <View style={styles.guideCircleWrapper}>
                            <View style={styles.guideCircle}>
                                <View style={styles.guideNumWrapper}><Text style={{color:'white',}}>1</Text></View>
                                <Text style={{color:'white'}}>재료 선택 or 입력</Text>
                            </View>
                            <View style={styles.guideCircle}>
                            <View style={styles.guideNumWrapper}><Text style={{color:'white',}}>2</Text></View>
                                <Text style={{color:'white'}}>{`단위 -> 사용량 입력`}</Text>
                            </View>
                        </View>
                        <View style={styles.guideInfoWrapper}>
                            <View style={styles.infoNumWrapper}><Text style={{color:'white',}}>3</Text></View>
                            
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default IngreModal;

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
        backgroundColor:theme.inputBackground2,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    headerWrapper:{
        width:'100%',
        height:40,
        backgroundColor:theme.btnExpenditureBlue,
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        justifyContent:'center',
        paddingLeft:20,
    },
    txtHeader:{
        fontWeight:'bold',
        color:'white',
    },
    contentOutterWrapper:{
        width:'100%',
        flex:9,
    },
    guideWrapper:{
        marginTop:15,
        width:'95%',
        height:270,
        backgroundColor:theme.backgroundGrey,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        padding:10,
    },
    guideCircle:{
        borderRadius:30,
        backgroundColor:theme.titleWrapperBlue,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:12,
        marginHorizontal:8,
    },
    guideCircleWrapper:{
        width:'100%',
        height:40,
        flexDirection:'row',
        marginVertical:8,
    },
    guideNumWrapper:{
        position:'absolute',
        top:-3,
        left:-3,
        borderRadius:20, 
        width:16, 
        height:16, 
        backgroundColor:theme.primeCostOrange,
        justifyContent:'center',
        alignItems:'center',
    },
    guideInfoWrapper:{
        flexDirection:'row',
        width:'100%',
        height:60,
        backgroundColor:'teal',
    },
    infoNumWrapper:{
        borderRadius:20, 
        width:16, 
        height:16, 
        backgroundColor:theme.primeCostOrange,
        justifyContent:'center',
        alignItems:'center',
    },
});