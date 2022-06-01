import { theme } from '../variables/color';
import React, {useEffect, useState,forwardRef, useImperativeHandle} from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Keyboard, Platform} from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS, 
} from '../variables/scales';

const IngreInput=(prop, ref)=>{
    const {prop:list, setter:setList, visible:myVisible, setVisible:mySetVisible}=prop;
    const [name, setName]=useState('');
    const [price,setPrice]=useState('');
    const [amount, setAmount]=useState('');
    const [amountUnit, setAmountUnit]=useState('');
    const [usage, setUsage]=useState('');
    const [unit, setUnit]=useState('');
    const [isFilled, setIsFilled]=useState(false);
    let nameEditable=true;

    const mySetName=(arg)=>{
        setName(arg);
    }

    const mySetNameEditable=(arg)=>{
        nameEditable=arg;
    }

    useImperativeHandle(ref,()=>({
        setName: (arg) => {mySetName(arg)},
        setNameEditable: (arg) => {mySetNameEditable(arg)}
    }))
    
    //정확한 기입이 이루어졌는지 확인하는 과정 필요
    const handlePlus=()=>{
        let copy=list.slice();
        copy.push({
            name,
            price,
            amount,
            amountUnit,
            usage,
            unit,
        });
        setList(copy);
        mySetVisible(false);
    };

    useEffect(()=>{
        if(name!=='' && price!=='' && amount!=='' && usage!=='' && unit!==''){
            setIsFilled(true);
        }else{
            setIsFilled(false);
        }
    },[name, price, amount, usage, unit]);

    let btnPlusWrapper={
        width:32,
        height:myVisible===false?0:30,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        backgroundColor:isFilled===true?theme.btnExpenditureBlue:theme.dateCheckedGrey,
    };

    let mainbody={
        width:'100%',
        height:myVisible===false?0:100,
        backgroundColor:theme.ingreBackDarkGrey,
    };
    let inputRow={
        width:'100%',
        flex:myVisible===false?0:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:12,
    };
    let leftInputWrapper={
        flex:25,
        height:myVisible===false?0:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    };
    let rightInputWrapper={
        flex:75,
        height:myVisible===false?0:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    };
    let txtWrapper={
        width:26,
        height:myVisible===false?0:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:4,
    };
    let inputStyle={
        paddingVertical:myVisible===false?0:8,
        paddingHorizontal:myVisible===false?0:12,
        textAlign:'center',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        backgroundColor:theme.inputBackground2,
        flex:1,
        marginHorizontal:myVisible===false?0:4,
    };
    let btnPlus={
        justifyContent:'center',
        alignItems:'center',
        width:myVisible===false?0:'100%',
        height:myVisible===false?0:'100%',
    };
   
    return(
        <View style={mainbody}>
            <View style={inputRow}>
                <View style={leftInputWrapper}>
                    <TextInput
                        style={inputStyle}
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
                        editable={nameEditable}
                    />
                </View>
                <View style={txtWrapper}>
                    <Text style={inputStyles.txt}>구매</Text>
                </View>
                <View style={rightInputWrapper}>
                    <TextInput
                        style={inputStyle}
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
                        style={inputStyle}
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
                    <TextInput
                        style={inputStyle}
                        value={amountUnit}
                        onChangeText={(txt) => setAmountUnit(txt)}
                        placeholder={'구입 단위'}
                        placeholderTextColor={theme.placeholderColor}
                        keyboardType={'default'}
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                        secureTextEntry={false}
                        editable={true}
                    />
                </View>
            </View>
            <View style={inputRow}>
                <View style={leftInputWrapper}>

                </View>
                <View style={txtWrapper}>
                    <Text style={inputStyles.txt}>사용</Text>
                </View>
                <View style={rightInputWrapper}>
                    <TextInput
                        style={inputStyle}
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
                        style={inputStyle}
                        value={unit}
                        onChangeText={(txt) => setUnit(txt)}
                        placeholder={'단위'}
                        placeholderTextColor={theme.placeholderColor}
                        keyboardType={'default'}
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                        secureTextEntry={false}
                        editable={true}
                    />
                    <View style={btnPlusWrapper}>
                        <Pressable disabled={!isFilled} onPress={handlePlus} style={btnPlus}>
                            <Text style={inputStyles.txtBtn}>+</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default forwardRef(IngreInput);

const inputStyles=StyleSheet.create({
    txt:{
        color:theme.btnExpenditureBlue,
        fontWeight:'bold',
    },
    txtBtn:{
        color:'white',
        fontWeight:'bold',
        fontSize:18,
    },
});