import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';

import { theme } from '../variables/color';

const IngredientImageCard = (arg) => {
    const {businessIngre, setter, image, name, code, diameter, width}=arg.source;

    const clicked = () =>{
        const arr=businessIngre.slice();
        const idx = arr.indexOf(code)
        if(idx > -1){
            arr.splice(idx, 1);
        }else{
            arr.push(code);
        }
        arr.sort();
        setter(arr);
    }

    let mainbody = {
        width:width,
        height:100,
        borderRadius:20,
        backgroundColor: businessIngre.includes(code) ? 'blue':'white',
        marginVertical:5,
        marginHorizontal:5,
    };

    return (
        <View style={mainbody}>
            <Pressable style={styles.pressable} onPress={clicked}>
            <View style={styles.imgWrapper}>
                <Image
                    resizeMode='contain'
                    style={{width:diameter, height:diameter,}}
                    source={image}
                >
                </Image>
            </View>
            <Text style={styles.text}>{name}</Text>
            </Pressable>
        </View>
    );
}

export default IngredientImageCard;

const styles = StyleSheet.create({
    imgWrapper:{
        width:80,
        height:80,
        borderRadius:90,
        backgroundColor:theme.inputBackground2,
        marginLeft:10,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontWeight:'bold',
        marginLeft:8,
    },
    pressable:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        height:'100%',
    }
});