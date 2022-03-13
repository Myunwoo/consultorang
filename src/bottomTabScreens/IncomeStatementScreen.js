import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { theme } from '../variables/color';
import commonStyles from '../variables/commonStyles';

import WeatherHeader from '../components/WeatherHeader';
import GraphType from '../components/GraphType';

const GT_LIST = [
    {text:'동일 업종'},
    {text:'동일 매출액'},
    {text:'동일 규모'},
]


const IncomeStatementScreen = (({navigation}) => {
    const [graphType, setGraphType]=useState(GT_LIST[0].text);

    let i=0;
    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={commonStyles.mainbody}>
            <WeatherHeader></WeatherHeader>
            <View style={styles.contentSection}>
                <View style={styles.dateSelectWrapper}>
                    <Text style={{color:'white', fontSize:18,}}>2022년 3월</Text>
                </View>
                <View style={styles.selectButtonsWrapper}>
                    {GT_LIST.map(g=><GraphType key={i++} source={{prop:graphType, setter:setGraphType, ...g}}></GraphType>)}
                </View>
                <View style={{width:'90%', height:1, backgroundColor:'white', marginTop:8,}}></View>
                <View style={styles.graphSection}>

                </View>
                <View style={styles.percentSection}>
                    <View style={styles.percentOutterWrapper}>
                        <View style={styles.percentInnerWrapper}>
                            <Text style={styles.txtPercent}>매출(수익)</Text>
                            <Text style={styles.txtPercent}>12%</Text>
                        </View>
                        <View style={styles.percentInnerWrapper}>
                            <Text style={styles.txtPercent}>식재료비</Text>
                            <Text style={styles.txtPercent}>11%</Text>
                        </View>
                        <View style={styles.percentInnerWrapper}>
                            <Text style={styles.txtPercent}>인건비</Text>
                            <Text style={styles.txtPercent}>6%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.chartSection}>
                    <View style={styles.chartHeader}>
                        <Text style={{color:'white',}}>{`${graphType} ()대비`}</Text>
                    </View>
                    <View style={styles.chartContent}>

                    </View>
                </View>
                <View style={styles.infoSection}>
                    <Text style={{color:theme.selectedOrange, fontWeight:'bold',}}>※ 주의사항 ※</Text>
                    <Text style={styles.txtInfo}>·  해당 자료는 정부기관의 연구자료에 입각하여<Text style={styles.txtHighlight}>각색한 평균값</Text>
                        으로, 매장의 상황에 따라 다소 차이가 있을 수 있습니다. <Text style={styles.txtUnHighlight}>(농촌경제연구원 [외식사업 실태조사])</Text>     
                    </Text>
                    <Text style={styles.txtInfo}>· 세 가지 지표는 <Text style={styles.txtHighlight}>참고 수준</Text>으로 사용해주세요.</Text>
                    <Text style={styles.txtInfo}>· 인건비 : 고용인, 가족 종사자, 대표자 인건비의 총 합</Text>
                </View>
            </View>
        </LinearGradient>
    );
});

export default IncomeStatementScreen;

const styles=StyleSheet.create({
    contentSection:{
        flex:1,
        alignItems:'center',
    },
    dateSelectWrapper:{
        marginTop:4,
    },
    selectButtonsWrapper:{
        flexDirection:'row',
        width:'90%',
    },
    graphSection:{
        flex:1,
        width:'90%',
        backgroundColor:'tomato',
        marginTop:8,
    },
    percentSection:{
        marginTop:8,
        width:'90%',
        height:80,
    },
    percentOutterWrapper:{
        flexDirection:'row',
        flex:1,
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.1)',
        borderRadius:40,
        paddingHorizontal:'5%',
    },
    percentInnerWrapper:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    txtPercent:{
        color:'white',
    },
    chartSection:{
        marginTop:8,
        width:'90%',
        height:180,
        borderRadius:15,
    },
    chartHeader:{
        width:'100%',
        height:40,
        backgroundColor:'#2C456D',
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        justifyContent:'center',
        alignItems:'center',
    },
    chartContent:{
        backgroundColor:'white',
        flex:1,
        width:'100%',
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15,
    },
    infoSection:{
        marginTop:12,
        width:'90%',
        height:140,
        backgroundColor:'rgba(0,0,0,0.1)',
        borderRadius:15,
        marginBottom:8,
        justifyContent:'center',
        paddingHorizontal:'5%',
        paddingVertical:'5%',
    },
    txtInfo:{
        color:'white',
    },
    txtHighlight:{
        backgroundColor:theme.selectedOrange,
    },
    txtUnHighlight:{
        color:'#95A9BA',
    }
});