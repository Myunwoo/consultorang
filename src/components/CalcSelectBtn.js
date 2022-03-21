import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { theme } from '../variables/color';

const CalcSelectBtn = (arg) => {
    const {prop, setter, title}=arg.source;

    const handlePress=()=>{
        setter(title);
    };

    let mainbody={
        flex:1,
        backgroundColor:prop==title?theme.checkedBlue : theme.backgroundGrey,
        borderRadius:100,
    }

    return (
        <View style={mainbody}>
            <Pressable style={styles.btn} onPress={handlePress}>
                <Text style={{color:'white', fontSize:20}}>{title}</Text>
            </Pressable>
        </View>
    );
}

export default CalcSelectBtn;

const styles = StyleSheet.create({
    btn:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
});