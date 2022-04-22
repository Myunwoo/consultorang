import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { theme } from '../variables/color';

const FilterItem = (arg) => {
    const {name, setter, title}=arg.source;

    const handlePress=()=>{
        setter(title);
    };

    let mainbody={
        flex:1,
        backgroundColor:name==title?theme.torangGrey : theme.inputBackground2,
        margin:10,
        borderRadius:15,
        borderColor:name==title?theme.torangGrey : theme.darkGrey,
        borderWidth:2,
    }
    let txt={
        color:name==title?theme.inputBackground2 : 'black',
    }

    return (
        <View style={mainbody}>
            <Pressable style={styles.btn} onPress={handlePress}>
                <Text style={txt}>{title}</Text>
            </Pressable>
        </View>
    );
}

export default FilterItem;

const styles = StyleSheet.create({
    btn:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
});