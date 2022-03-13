import {StyleSheet, Image, Text, View, Pressable} from 'react-native';
import React,{ useState } from 'react';

import { theme } from '../variables/color';

const GraphType = (arg) => {
    const {prop, text, setter,}=arg.source;
    const [checked, setChecked]=useState(false);

    let mainbody={
        backgroundColor:prop===text ? theme.selectedOrange : 'rgba(0,0,0,0.1)',
        flex:1,
        height:40,
        marginTop:8,
        marginHorizontal:4,
        borderRadius:15,
    }
    
    const onClicked = () => {
        setChecked(!checked);
        setter(text);
    }
    
    return(
        <View style={mainbody}>
            <Pressable style={styles.pressable} onPress={onClicked}>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        </View>
    );
};

export default GraphType;

const styles=StyleSheet.create({
    pressable:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        color:'white',
        fontWeight:'bold',
    }
});