import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { theme } from '../variables/color';

const ModalTitle = (arg) => {
    const {text}=arg;

    return (
        <View style={styles.titleWrapper}>
            <View style={{width:20, height:2, backgroundColor:'#E5E5E5'}}></View>
            <View style={{width:10, height:10, borderRadius:20, backgroundColor:'#E5E5E5', marginRight:8,}}></View>
            <Text>{text}</Text>
        </View>
    );
}

export default ModalTitle;

const styles = StyleSheet.create({
    titleWrapper:{
        width:'100%',
        height:40,
        flexDirection:'row',
        alignItems:'center',
    },
});