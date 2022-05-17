import { theme } from '../variables/color';
import React, {useEffect, useState,} from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Keyboard, Platform} from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS, 
} from '../variables/scales';

const IngreInput=({prop, setter, data})=>{
    const [name, setName]=useState('');
    const [price,setPrice]=useState('');
    const [amount, setAmount]=useState('');
    const [usage, setUsage]=useState('');
    const [unit, setUnit]=useState('');
    const [isFilled, setIsFilled]=useState(false);

    //정확한 기입이 이루어졌는지 확인하는 과정 필요
    const handlePlus=()=>{
        let copy=prop.slice();
        copy.push({
            name,
            price,
            amount,
            usage,
            unit,
        });
        setter(copy);
    };

    useEffect(()=>{
        if(name!=='' && price!=='' && amount!=='' && usage!=='' && unit!==''){
            setIsFilled(true);
        }else{
            setIsFilled(false);
        }
    },[name, price, amount, usage, unit]);

    let btnPlusWrapper={
        width:40,
        height:30,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        backgroundColor:isFilled===true?theme.btnExpenditureBlue:theme.dateCheckedGrey,
    };
   

    return(
        <View style={inputStyles.mainbody}>
            <View style={inputStyles.inputRow}>
                <View style={inputStyles.leftInputWrapper}>
                    <TextInput
                        style={inputStyles.inputStyle}
                        value={name}
                        onChangeText={(txt) => setName(txt)}
                        placeholder={'재료명'}
                        placeholderTextColor={theme.placeholderColor}
                        keyboardType={'numeric'}
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                        secureTextEntry={false}
                        editable={true}
                    />
                </View>
                <View style={inputStyles.txtWrapper}>
                    <Text style={inputStyles.txt}>구매</Text>
                </View>
                <View style={inputStyles.rightInputWrapper}>
                    <TextInput
                        style={inputStyles.inputStyle}
                        value={price}
                        onChangeText={(txt) => setPrice(txt)}
                        placeholder={'구입 가격'}
                        placeholderTextColor={theme.placeholderColor}
                        keyboardType={'numeric'}
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                        secureTextEntry={false}
                        editable={true}
                    />
                    <TextInput
                        style={inputStyles.inputStyle}
                        value={amount}
                        onChangeText={(txt) => setAmount(txt)}
                        placeholder={'구입 용량'}
                        placeholderTextColor={theme.placeholderColor}
                        keyboardType={'numeric'}
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                        secureTextEntry={false}
                        editable={true}
                    />
                </View>
            </View>
            <View style={inputStyles.inputRow}>
                <View style={inputStyles.leftInputWrapper}>

                </View>
                <View style={inputStyles.txtWrapper}>
                    <Text style={inputStyles.txt}>사용</Text>
                </View>
                <View style={inputStyles.rightInputWrapper}>
                    <TextInput
                        style={inputStyles.inputStyle}
                        value={usage}
                        onChangeText={(txt) => setUsage(txt)}
                        placeholder={'사용량'}
                        placeholderTextColor={theme.placeholderColor}
                        keyboardType={'numeric'}
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                        secureTextEntry={false}
                        editable={true}
                    />
                    <TextInput
                        style={inputStyles.inputStyle}
                        value={unit}
                        onChangeText={(txt) => setUnit(txt)}
                        placeholder={'단위'}
                        placeholderTextColor={theme.placeholderColor}
                        keyboardType={'numeric'}
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                        secureTextEntry={false}
                        editable={true}
                    />
                    <View style={btnPlusWrapper}>
                        <Pressable disabled={!isFilled} onPress={handlePlus} style={inputStyles.btnPlus}>
                            <Text style={inputStyles.txtBtn}>+</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default IngreInput;

const inputStyles=StyleSheet.create({
    mainbody:{
        width:'100%',
        height:100,
        backgroundColor:theme.ingreBackDarkGrey,
    },
    inputRow:{
        width:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:12,
    },
    leftInputWrapper:{
        flex:3,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    rightInputWrapper:{
        flex:7,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    inputStyle:{
        paddingVertical:8,
        paddingHorizontal:12,
        textAlign:'center',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        backgroundColor:theme.inputBackground2,
        flex:1,
        marginHorizontal:8,
    },
    txtWrapper:{
        width:32,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:8,
    },
    txt:{
        color:theme.btnExpenditureBlue,
        fontWeight:'bold',
    },
    btnPlus:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100%',
    },
    txtBtn:{
        color:'white',
        fontWeight:'bold',
        fontSize:18,
    },
});