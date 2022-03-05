import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

import { theme } from '../variables/color';

const FixedContentComponent = (arg) => {
    const {setter, title}=arg.source;

    let img;
    switch(title){
        case '식재료비':
            img=require('../../image/medal_gold.png');
            break;
        case '인건비':
            img=require('../../image/medal_silver.png');
            break;
        case '고정비':
            img=require('../../image/medal_bronze.png');
            break;
    }

    const handlePress=()=>{
        
    };

    return (
        <View style={styles.mainbody}>
            <Pressable style={styles.btn} onPress={handlePress}>
            <Image
                resizeMode='contain'
                style={{flex:1, maxWidth:'100%', maxHeight:100, marginTop:'15%',}}
                source={img}
            >
            </Image>
            <Text style={{marginBottom:'15%',}}>{title}</Text>
            </Pressable>
        </View>
    );
}

export default FixedContentComponent;

const styles = StyleSheet.create({
    mainbody:{
        flex:1,
        backgroundColor:theme.inputBackground2,
        margin:10,
        borderRadius:15,
        borderColor:theme.darkGrey,
        borderWidth:4,
    },
    btn:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'space-between',
    },
});