import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { theme } from '../variables/color';

const GraphArrowRight = (arg) => {
    const {width, height}=arg.source;
    
    const topPosition=Math.round(height/2)-15;

    return (
        <View style={{
            width:'100%',
            height:30,
            flexDirection:'row',
            position:'absolute',
            top:topPosition,
            left:0,
        }}>
            <LinearGradient 
                colors={['#A17082', '#58789F', '#2A7AB2']}
                style={styles.arrowbody}
                start={{x: 1, y: 0.25}} end={{x: 0, y: 0.75}}
            >
            </LinearGradient>
            <View style={styles.triangle}></View>
        </View>
    );
}

export default GraphArrowRight;

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
        transform: [{ rotate: "90deg" }],
        alignSelf:'center',
    },
    arrowbody:{
        height:8,
        flex:1,
        alignSelf:'center',
        borderBottomLeftRadius:4,
        borderTopLeftRadius:4,
    }
});