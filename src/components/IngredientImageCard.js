import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';

import { theme } from '../variables/color';

const IngredientImageCard = (arg) => {
    const {businessIngre, setter, image, name, code, diameter, width}=arg.source;

    const clicked = () =>{
        setter(code);
    }

    let mainbody = {
        width:width,
        height:100,
        borderRadius:20,
        backgroundColor: businessIngre===code ? theme.checkedBlue : 'white',
        marginVertical:5,
        marginHorizontal:5,
    };

    let imgWrapper={
        width:80,
        height:80,
        borderRadius:90,
        backgroundColor:businessIngre===code ? theme.checkedBlue : 'white',
        marginLeft:10,
        justifyContent:'center',
        alignItems:'center',
    };

    let text={
        fontWeight:'bold',
        marginLeft:8,
        color:businessIngre===code ? 'white' : 'black',
    };

    return (
        <View style={mainbody}>
            <Pressable style={styles.pressable} onPress={clicked}>
            <View style={imgWrapper}>
                <Image
                    resizeMode='contain'
                    style={{width:diameter, height:diameter,}}
                    source={image}
                >
                </Image>
            </View>
            <Text style={text}>{name}</Text>
            </Pressable>
        </View>
    );
}

export default IngredientImageCard;

const styles = StyleSheet.create({
    pressable:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        height:'100%',
    }
});