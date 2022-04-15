import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS,
} from '../variables/scales';

import { theme } from '../variables/color';

const IngreGuideComp = (arg) => {
    const {text}=arg;

    return (
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
                            <View style={{...styles.guideInfoColumn, marginLeft:20, paddingTop: 8,}}>
                                <View style={styles.infoNumWrapper}><Text style={{color:'white',}}>3</Text></View>
                            </View>
                            <View style={styles.guideInfoColumn}>
                                <View style={{paddingHorizontal:12, paddingVertical:4, borderRadius:CONTENT_SECTION_BORDER_RADIUS, backgroundColor:theme.uncheckedGrey, justifyContent:'center', alignItems:'center',}}>
                                    <Text style={{color:'white', fontSize:20,}}>+</Text>
                                </View>
                                <Text style={{fontSize:16,}}>입력 전</Text>
                            </View>
                            <View style={{...styles.guideInfoColumn, paddingTop:8}}>
                                <Text>{`->`}</Text>
                            </View>
                            <View style={styles.guideInfoColumn}>
                                <View style={{paddingHorizontal:12, paddingVertical:4, borderRadius:CONTENT_SECTION_BORDER_RADIUS, backgroundColor:theme.titleWrapperBlue, justifyContent:'center', alignItems:'center',}}>
                                    <Text style={{color:'white', fontSize:20,}}>+</Text>
                                </View>
                                <Text style={{fontSize:16,}}>후</Text>
                            </View>
                            <View style={{...styles.guideInfoColumn, paddingTop:8,}}>
                                <Text style={{fontSize:16,}}>클릭 !</Text>
                            </View>
                            <View style={{...styles.guideInfoColumn, paddingTop: 8, alignItems:'flex-start'}}>
                                <View style={{flexDirection:'row', flex:1}}>
                                    <View style={styles.infoNumWrapper}><Text style={{color:'white',}}>4</Text></View>
                                    <Image
                                        source={require('../../image/register_check.png')}
                                        style={{width:16, height:16, marginLeft:8,}}
                                    >
                                    </Image>
                                    <Text style={{marginLeft:8,}}>완료 !</Text>
                                </View>
                                <View style={{flex:1,}}>
                                    <Text>(체크표시를 확인하세요!)</Text>
                                </View>
                                
                            </View>
                        </View>
                    </View>
    );
}

export default IngreGuideComp;

const styles = StyleSheet.create({
    guideWrapper:{
        marginTop:15,
        width:'95%',
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
    },
    infoNumWrapper:{
        borderRadius:20, 
        width:16, 
        height:16, 
        backgroundColor:theme.primeCostOrange,
        justifyContent:'center',
        alignItems:'center',
    },
    guideInfoColumn:{
        height:'100%',
        marginHorizontal:4,
        justifyContent:'space-between',
        alignItems:'center',
    },
});