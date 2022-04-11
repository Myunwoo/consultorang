import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "../variables/color";

const CalcIngreComponent = (arg) => {
    const { name, totalCost, totalWeight, weight, cost } = arg.source;

    return(
        <View style={style.mainBody}>
            <View style={style.mainWrapper}>
                <View style={style.mainLeft}>
                    <Text style={style.mainTxtName}>{name}</Text>
                    <View style={style.totalLeft}>
                        <Text style={style.totalCostRight}>{totalCost}</Text>
                        <Text>{`(${totalWeight})`}</Text>
                    </View>
                </View>
                <View style={style.mainTxtWrapper}>
                    <Text style={style.mainTxt}>{weight}</Text>
                </View>
                <View style={style.mainTxtWrapper}>
                    <Text style={style.mainTxt}>{cost}</Text>
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
    },
    mainTxt:{
        fontSize:17,
        fontWeight:"bold",
    },
});