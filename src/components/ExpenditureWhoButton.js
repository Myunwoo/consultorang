import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { theme } from '../variables/color';

const ExpenditureWhoButton = (arg) => {
    const {text, code, setter, prop}=arg.source;

    let mainbody={
        height:40,
        paddingHorizontal:20,
        borderRadius:16,
        backgroundColor:code===prop?theme.btnExpenditureBlue:theme.inputBackground2,
        borderWidth:1,
        borderColor:code===prop?theme.btnExpenditureBlue:theme.backgroundGrey,
    }
    
    let txt={
        color:code===prop?'white':theme.torangGrey,
        fontSize:16,
    };

    const handleClick=()=>{
        setter(code);
    }

    return (
        <View style={mainbody}>
            <Pressable onPress={handleClick} style={styles.btn}>
                <Text style={txt}>{text}</Text>
            </Pressable>
        </View>
    );
};

export default ExpenditureWhoButton;

const styles = StyleSheet.create({
    btn:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
});