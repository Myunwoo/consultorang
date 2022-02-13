import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';

import { BASIC_SHADOW } from '../variables/scales';

let numColor='black';

const MedalComponent = (arg) => {
    const {type,num}=arg.source;
    let img;
    switch(type){
        case 'gold':
            img=require('../../image/medal_gold.png');
            numColor='#E31E2D';
            break;
        case 'silver':
            img=require('../../image/medal_silver.png');
            numColor='#377506';
            break;
        case 'bronze':
            img=require('../../image/medal_bronze.png');
            numColor='#575151';
            break;
    }

    return (
        <View style={styles.mainbody}>
            <Image
                resizeMode='contain'
                style={{width:50, height:50,}}
                source={img}
            >
            </Image>
            <View style={styles.textWrapper}>
                <View style={styles.numberWrapper}>
                    <Text style={{ fontWeight:'bold', fontSize:30, marginRight:1,color:numColor}}>{num}</Text>
                </View>
                <View style={styles.gunWrapper}>
                    <Text style={styles.gun}>건</Text>
                </View>
            </View>
        </View>
    );
}

export default MedalComponent;

const styles=StyleSheet.create({
    mainbody:{
        width:90,
        height:100,
        borderRadius:8,
        backgroundColor:'white',
        marginHorizontal:10,
        alignItems:'center',
        ...BASIC_SHADOW,
    },
    textWrapper:{
        width:60,
        height:35,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    numberWrapper:{
        height:40,
        justifyContent:'flex-end',
        
    },
    gunWrapper:{
        height:40,
        justifyContent:'flex-end',
        marginBottom:8,
    },
    gun:{
        
    },
});