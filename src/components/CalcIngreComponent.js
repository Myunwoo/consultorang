import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "../variables/color";
import {calcWeight, calcCost} from '../abstract/commonTasks';

// condimentList.map(condi=>{
        //     newArr.push({
        //         name:condi.name,
        //         totalCost:condi.price,
        //         totalWeight:condi.amount,
        //         totalUnit:condi.amountUnit,
        //         weight:calcWeight(condi),
        //         weightUnit:condi.unit,
        //         cost:calcCost(condi),
        //     })
        // });

const CalcIngreComponent = (arg) => {
    const {name, price:totalCost, amount:totalWeight, amountUnit:totalUnit, unit}=arg.source;
    const weight=calcWeight(arg.source);
    const cost=calcCost(arg.source);

    return(
        <View style={style.mainBody}>
            <View style={style.mainWrapper}>
                <View style={style.mainLeft}>
                    <Text style={style.mainTxtName}>{name}</Text>
                    <View style={style.totalLeft}>
                        <Text style={style.totalCostRight}>{`${totalCost}원`}</Text>
                        <Text>{`(${totalWeight}${totalUnit})`}</Text>
                    </View>
                </View>
                <View style={style.mainTxtWrapper}>
                    <Text style={style.mainTxt}>{`${weight}`}</Text>
                </View>
                <View style={style.mainTxtWrapper}>
                    <Text style={style.mainTxt}>{`${cost}원`}</Text>
                </View>
                
            </View>
        </View>
    );
};

export default CalcIngreComponent;

const style = StyleSheet.create({
    mainBody:{
        width: "100%",
        height: "100%",
        paddingHorizontal:16,
        justifyContent:'center',
    },
    mainLeft:{
        flex:1,
    },
    mainWrapper:{
        flexDirection: "row",
    },
    totalLeft:{
        flexDirection: "row",
    },
    totalCostRight:{
        paddingRight:5,
    },
    mainTxtName:{
        fontSize: 17,
        fontWeight:"bold",
    },
    mainTxtWrapper:{
        flex:1,
        alignItems:'flex-end',
        paddingRight:12,
    },
    mainTxt:{
        fontSize:17,
        fontWeight:"bold",
    },
});