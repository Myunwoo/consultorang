import React from 'react';
import { StyleSheet, Image, View, } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { theme } from '../variables/color';

const GraphArrowUp = (arg) => {
    const {width, height}=arg.source;
    const leftPosition=Math.round(width/2)-15;

    return (
        <View style={{
            height:'100%',
            alignSelf:'center',
            width:30,
            position:'absolute',
            top:0,
            left:leftPosition
        }}>
            <View style={styles.triangle}></View>
            <LinearGradient colors={['#A17082', '#58789F', '#2A7AB2']} style={styles.arrowbody}>
            </LinearGradient>
        </View>
    );
}

export default GraphArrowUp;

const styles = StyleSheet.create({
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 20,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "#A17082",
        marginBottom:-1,
        alignSelf:'center',
    },
    arrowbody:{
        width:8,
        flex:1,
        alignSelf:'center',
        borderBottomLeftRadius:4,
        borderBottomRightRadius:4,
    },
});