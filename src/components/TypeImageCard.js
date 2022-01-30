import {StyleSheet, Image, Text, View, Pressable} from 'react-native';
import React,{ useState } from 'react';

import { theme } from '../variables/color';

const TypeImageCard = (arg) => {
    const {image, name, code, setter, diameter}=arg.source;
    const [checked, setChecked]=useState(false);

    let textWrapper={
        width:'100%',
        height:'35%',
        position:'absolute',
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:checked ? theme.checkedBlue : theme.uncheckedGrey,
    }
    
    const onClicked = () => {
        setChecked(!checked);
        setter(code);
    }
    
    return(
        <View style={
            {width:diameter, height:diameter, borderRadius:diameter, overflow:'hidden', marginHorizontal:5, marginVertical:5,}} onPress={onClicked}>
            <Pressable style={styles.pressable} onPress={onClicked}>
                <Image style={styles.img} source={image} resizemode='contain'
                />
                <View style={textWrapper}>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default TypeImageCard;

const styles=StyleSheet.create({
    pressable:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    img:{
        width:'100%',
        height:'100%',
    },
    text:{
        color:'white',
        fontWeight:'bold',
    }
});