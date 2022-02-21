import React from 'react';
import { StyleSheet, Image, View, } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { theme } from '../variables/color';

const GraphArrowUp = (arg) => {
    const {text}=arg;

    return (
        <View style={styles.mainbody}>
            <View style={styles.triangle}></View>
            <LinearGradient colors={['#A17082', '#58789F', '#2A7AB2']} style={styles.arrowbody}>
            </LinearGradient>
            <View style={styles.imgWrapper}>
                <Image
                    resizeMode='contain'
                    style={{width:30,height:30,}}
                    source={require('../../image/engineering_won.png')}
                >
                </Image>
            </View>
        </View>
    );
}

export default GraphArrowUp;

const styles = StyleSheet.create({
    mainbody:{
        height:'100%',
        alignSelf:'center',
        width:30,
    },
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
    imgWrapper:{
        width:30,
        height:30,
        alignSelf:'center',
        marginTop:5,
    }
});