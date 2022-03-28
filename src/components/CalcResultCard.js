import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

import { theme } from '../variables/color';

const CalcResultCard = (arg) => {
    const {img, name, date, navigation}=arg.source;
    console.log(navigation);

    const handleShowHistory=()=>{
        //히스토리를 볼 수 있는 화면으로 넘어가야 합니다.
        navigation.navigate('MenuCalculatorHistory',{img, name, date,});
    };

    return (
        <View style={styles.mainbody}>
            <Image
                resizeMode='contain'
                style={{flex:3, height:'100%',}}
                source={require('../../image/filter_black.png')}
            >
            </Image>
            <Pressable style={styles.contentWrapper} onPress={handleShowHistory}>
                <Text style={styles.title}>{name}</Text>
                <View style={{flexDirection:'row',}}>
                    <Text style={styles.date}>{`측정일 : ${date}`}</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default CalcResultCard;

const styles = StyleSheet.create({
    mainbody:{
        width:'100%',
        height:'100%',
        flexDirection:'row',
        backgroundColor:'white',
        borderRadius:15,
    },
    contentWrapper:{
        flex:7,
        height:'100%',
        padding:12,
        justifyContent:'space-between'
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
    },
    date:{
        fontSize:16,
    }
});