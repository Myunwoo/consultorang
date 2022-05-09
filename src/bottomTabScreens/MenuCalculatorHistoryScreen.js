import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { BASIC_SHADOW} from '../variables/scales';
import { theme } from '../variables/color';

import CalcResultCard from '../components/CalcResultCard';

const tempHistory=[
    {name:'레몬 마들렌', date:'2022/03/18'},
    {name:'바닐라 까눌레', date:'2022/02/11'},
    {name:'아', date:'2022/01/01'},
];
const tempBasicHistory=[
    {name:'기초요리1', date:'2022/03/18'},
    {name:'기초요리2', date:'2021/02/11'},
    {name:'기초요리3', date:'2020/01/01'},
];
const historyType=[ '기초 요리', '요리'];

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
    const [historyMode, setHistoryMode]=useState(historyType[0]);

    return (
        <ScrollView style={{width:'100%',}} contentContainerStyle={styles.scrollview}>
            <View style={styles.headerWrapper}>
                {historyType.map(history=>{
                    return (HistoryButton(historyMode, history, setHistoryMode));
                })}
            </View>
            {historyMode===historyType[0]
                ?tempHistory.map(history=>
                    <View style={{width:'100%', height:150, paddingVertical:8, paddingHorizontal:10,}}>
                        <CalcResultCard ket={i++} source={{...history, navigation}}></CalcResultCard>
                    </View>)
                :tempBasicHistory.map(history=>
                    <View style={{width:'100%', height:150, paddingVertical:8, paddingHorizontal:10,}}>
                        <CalcResultCard ket={i++} source={{...history, navigation}}></CalcResultCard>
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
});