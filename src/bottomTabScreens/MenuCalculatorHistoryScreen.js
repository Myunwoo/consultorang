import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { theme } from '../variables/color';

import CalcResultCard from '../components/CalcResultCard';

const tempHistory=[
    {name:'레몬 마들렌', date:'2022/03/18'},
    {name:'바닐라 까눌레', date:'2022/02/11'},
    {name:'아', date:'2022/01/01'},
]

let i=0;

const MenuCalculatorHistoryScreen = ({navigation}) => {
    return (
        <ScrollView style={{width:'100%',}} contentContainerStyle={styles.scrollview}>
            {tempHistory.map(history=><View style={{width:'100%', height:130, margin:15, paddingHorizontal:10,}}><CalcResultCard ket={i++} source={{...history, navigation}}></CalcResultCard></View>)}
        </ScrollView>
    );
}

export default MenuCalculatorHistoryScreen;

const styles = StyleSheet.create({
    scrollview:{
        alignItems:'center',
    },
});