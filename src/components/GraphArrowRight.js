import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { theme } from '../variables/color';

const GraphArrowRight = (arg) => {
    const {text}=arg;

    return (
        <View style={styles.mainbody}>
            <View style={styles.imgWrapper}>
                <Image
                    resizeMode='contain'
                    style={{width:30,height:30,}}
                    source={require('../../image/engineering_heart.png')}
                >
                </Image>
            </View>
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
    mainbody:{
        width:'90%',
        flexDirection:'row',
        position:'absolute',
        top:'50%',
        left:'5%',
        height:30,
    },
    imgWrapper:{
        width:30,
        height:30,
        marginRight:5,
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