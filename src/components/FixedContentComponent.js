import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

import { theme } from '../variables/color';

const FixedContentComponent = (arg) => {
    const {name, setter, title}=arg.source;

    let img;
    switch(title){
        case '식재료비':
            img=(name==title?require('../../image/fixed_ingredient_chk.png') : require('../../image/fixed_ingredient_unchk.png'));
            break;
        case '인건비':
            img=(name==title?require('../../image/fixed_human_chk.png') : require('../../image/fixed_human_unchk.png'));
            break;
        case '고정비':
            img=(name==title?require('../../image/fixed_fix_chk.png') : require('../../image/fixed_fix_unchk.png'));
            break;
    }

    const handlePress=()=>{
        setter(title);
    };

    let mainbody={
        flex:1,
        margin:10,
        borderRadius:15,
        backgroundColor:name===title?theme.btnExpenditureBlue : theme.inputBackground2,
        borderWidth:3,
        borderColor:name===title?theme.btnExpenditureBlue : theme.darkGrey,
    }

    let txt={
        marginVertical:8,
        color:name===title?'white' : theme.torangGrey,
    }

    return (
        <View style={mainbody}>
            <Pressable style={styles.btn} onPress={handlePress}>
            <Image
                resizeMode='contain'
                style={{flex:1, maxWidth:'100%', maxHeight:100, marginTop:'15%',}}
                source={img}
            >
            </Image>
            <Text style={txt}>{title}</Text>
            </Pressable>
        </View>
    );
}

export default FixedContentComponent;

const styles = StyleSheet.create({
    btn:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'space-between',
    },
});