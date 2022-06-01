import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import {BASIC_SHADOW} from '../variables/scales';

import { theme } from '../variables/color';

const SettingItem = (arg) => {
    const {text, func}=arg;

    return (
        <View style={styles.mainbody}>
            <Pressable onPress={func} style={styles.pressable}>
                <Text style={styles.txt}>{text}</Text>
            </Pressable>
        </View>
    );
}

export default SettingItem;

const styles = StyleSheet.create({
    mainbody:{
        width:'100%',
        height:40,
    },
    pressable:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
    },
    txt:{
        marginLeft:12,
        
    }
});