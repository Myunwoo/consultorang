import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, } from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS,
} from '../variables/scales';

import { theme } from '../variables/color';

let i=0;

const PrimeCostModal = ({ showModal, setShowModal,}) => {
    
    const handleOutsideClick=()=>{
        setShowModal(false);
    };
 
    return (
        <View style={styles.outside}>
            <Pressable onPress={handleOutsideClick} style={{flex:2, width:'100%',}}></Pressable>
            <View style={styles.mainbody}>
                <View style={styles.headerWrapper}><Text style={styles.txtHeader}>프라임 코스트 법이란</Text></View>
                <View style={styles.contentOutterWrapper}>
                    
                </View>
            </View>
        </View>
    );
}

export default PrimeCostModal;

const styles = StyleSheet.create({
    outside:{
        flex:1,
        width:'100%',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    mainbody:{
        width:'100%',
        flex:8,
        alignItems:'center',
        backgroundColor:theme.inputBackground2,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    headerWrapper:{
        width:'100%',
        height:60,
        backgroundColor:theme.primeCostOrange,
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        justifyContent:'center',
        paddingLeft:20,
    },
    txtHeader:{
        fontWeight:'bold',
        fontSize:20,
        color:'white',
    },
    contentOutterWrapper:{
        width:'100%',
        flex:9,
        alignItems:'center',
    },
});