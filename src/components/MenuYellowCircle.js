import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';

const handlePress = (menuNm) => {
    console.log(menuNm);
}

const MenuYellowCircle = (arg) => {
    let {menuNm,popularity:x ,contributionMargin:y}=arg.source;
    x=String(x)+'%';
    y=String(100-y)+'%';
    
    return (
        <View 
            style={{
                width:20,
                height:20,
                borderRadius:16,
                backgroundColor:'white',
                justifyContent:'center',
                alignItems:'center',
                position:'absolute',
                top:y,
                left:x,
                // translateX:-10,
            }}
        >
            <Pressable style={styles.pressable} onPress={() => handlePress(menuNm)}>
                <View style={styles.innerWrapper}></View>
            </Pressable>
        </View>
    );
}

export default MenuYellowCircle;

const styles = StyleSheet.create({
    pressable:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    innerWrapper:{
        width:14,
        height:14,
        borderRadius:14,
        backgroundColor:'yellow',
    },
});