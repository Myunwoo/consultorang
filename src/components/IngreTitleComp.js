import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import {
    BASIC_SHADOW,
} from '../variables/scales';
import { theme } from '../variables/color';

const IngreTitleComp = (arg) => {
    const {img, title, prop, setter}=arg;

    const handlePress=()=>{
        setter(!prop);
    }

    return (
        <View style={styles.mainbody}>
            <Pressable onPress={handlePress} style={styles.pressable}>
                <Image
                    source={img}
                    style={{width:40, height:40}}
                >                
                </Image>
                <View style={{marginLeft:20, flex:1,}}>
                    <Text style={{fontWeight:'bold', fontSize:20, color:theme.titleWrapperBlue,}}>{title}</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default IngreTitleComp;

const styles = StyleSheet.create({
    mainbody:{
        width:'100%',
        height:60,
        backgroundColor:'white',
        ...BASIC_SHADOW,
    },
    pressable:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:16,
    }
});