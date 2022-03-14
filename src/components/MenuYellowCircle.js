import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';

const handlePress = (menuNm) => {
    console.log(menuNm);
}

const MenuYellowCircle = (arg) => {
    const {menuNm,popularity:x ,contributionMargin:y, type}=arg.source;
    let posX=0;
    let posY=0;

    switch(type){
        case 'first':
            posX=String((x-50)*2)+'%';
            posY=String((y-50)*2)+'%';
            break;
        case 'second':
            posX=String(x)+'%';
            posY=String((y-50)*2)+'%';
            break;
        case 'third':
            posX=String(x)+'%';
            posY=String(y)+'%';
            break;
    }
    
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
                left:posX,
                bottom:posY,
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