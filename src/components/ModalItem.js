import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { theme } from '../variables/color';

const ModalItem = (arg) => {
    const {name, amount, date, setter, prop}=arg;

    const handleDel=()=>{
        console.log('handleDel');
    };

    return (
        <View style={styles.mainbody}>
            <View style={styles.header}>
                <Text>{name}</Text>
                <Text>{date}</Text>
            </View>
            <View style={styles.content}>
                <Text>{amount}원</Text>
                <View style={styles.btnWrapper}>
                    <Pressable onPress={handleDel} style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'flex-end'}}>
                        <Text style={{marginRight:8,}}>X</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default ModalItem;

const styles = StyleSheet.create({
    mainbody:{
        width:'100%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'rgba(255,255,255,0.4)',
        borderRadius:8,
    },
    header:{
        justifyContent:'center',
    },
    content:{
        flexDirection:'row',
        alignItems:'center',
    },
    btnWrapper:{
        width:30,
        height:'100%',
    }
});