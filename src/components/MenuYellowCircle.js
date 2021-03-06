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
            posX=(x-50)*2;
            posY=(y-50)*2;
            break;
        case 'second':
            posX=x*2;
            posY=(y-50)*2;
            break;
        case 'third':
            posX=x*2;
            posY=y*2;
            break;
    }
    if(posX>=90) posX=90;
    if(posY>=90) posY=90;
    // let diffX=Math.abs(50-posX)*(5/100);
    // let diffY=Math.abs(50-posY)*(5/100);

    // //first, second, third가 어떤 기준으로 오는지 알아야될듯??????
    // /////
    // if(posX>=50 && posY>=50){
    //     posX-=diffX;
    //     posY-=diffY;
    // }else if(posX<50 && posY>=50){
    //     posX+=diffX;
    //     posY-=diffY;
    // }else if(posX>=50 && posY<50){
    //     posX-=diffX;
    //     posY+=diffY;
    // }else{
    //     posX+=diffX;
    //     posY+=diffY;
    // }
    posX=String(Math.round(posX))+'%';
    posY=String(Math.round(posY))+'%';

    console.log(menuNm);
    console.log(`popularity: ${x}, contrinutionMargin: ${y}`);
    console.log(`posX: ${posX}, posY: ${posY}`);

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