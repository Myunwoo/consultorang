import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { BASIC_SHADOW} from '../variables/scales';
import { theme } from '../variables/color';
import {getItemAsyncStorage} from '../abstract/asyncTasks';

import CalcResultCard from '../components/CalcResultCard';

const historyType=['기초 요리', '요리'];

let i=0;

const HistoryButton=(prop, history, callback)=>{
    let btnWrapper={
        flex:1,
        height:'100%',
        borderRadius:30,
        marginHorizontal:20,
        backgroundColor:history===prop ? theme.selectedOrange : 'rgba(0,0,0,0.1)',
        ...BASIC_SHADOW,
    };

    let txtTitle={
        fontSize:16,
        fontWeight:'bold',
        color:'white',
    };
    

    return (
        <View style={btnWrapper}>
            <Pressable onPress={()=>callback(history)} style={styles.btn}>
                <Text style={txtTitle}>{history}</Text>
            </Pressable>
        </View>
    );
}

const MenuCalculatorHistoryScreen = ({navigation}) => {
    const [historyMode, setHistoryMode]=useState(historyType[1]);
    const [cook, setCook]=useState([]);
    //기초 요리 서비스 시작시 활용
    //const [basicCook, setBasicCook]=useState([]);

    //api호출로 변경시 retVal.data로 바뀔듯? 콘솔 출력해서 확인 해볼것.
    useEffect(()=>{
        getItemAsyncStorage('menuCalcResult')
            .then(retVal=>{
                setCook(JSON.parse(retVal))
            })
    },[]);

    return (
        <ScrollView style={{width:'100%',}} contentContainerStyle={styles.scrollview}>
            <View style={styles.headerWrapper}>
                {historyType.map(history=>{
                    return (HistoryButton(historyMode, history, setHistoryMode));
                })}
            </View>
            {historyMode===historyType[0]
                // ?basicCook.map(history=>
                //     <View style={styles.resultCardWrapper}>
                //         <CalcResultCard key={i++} source={{...history, navigation}}></CalcResultCard>
                //     </View>)
                ?<View style={styles.resultCardWrapper}><Text style={{marginLeft:12, marginTop:12, fontSize:16}}>서비스 준비 중입니다</Text></View>
                :cook.map(history=>
                    <View style={styles.resultCardWrapper}>
                        <CalcResultCard key={i++} source={{...history, navigation}}></CalcResultCard>
                    </View>)
            }
        </ScrollView>
    );
}

export default MenuCalculatorHistoryScreen;

const styles = StyleSheet.create({
    scrollview:{
        alignItems:'center',
    },
    headerWrapper:{
        width:'100%',
        height:40,
        marginTop:15,
        flexDirection:'row',
        marginBottom:8,
    },
    btn:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    resultCardWrapper:{
        width:'100%',
        height:150,
        paddingVertical:8, 
        paddingHorizontal:10,
    }
});