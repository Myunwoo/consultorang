import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Image, TextInput, Keyboard} from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS, BASIC_SHADOW
} from '../variables/scales';

import { theme } from '../variables/color';

import IngreGuideComp from '../components/IngreGuideComp';
import IngreTitleComp from '../components/IngreTitleComp';
let i=0;
const IngreModal = ({ showModal, setShowModal,}) => {
    const [basicVisible, setBasicVisible]=useState(false);
    const [condimentVisible, setCondimentVisible]=useState(false);
    const [ingreVisible, setIngreVisible]=useState(false);

    const [foodCount, setFoodCount]=useState('0');
    
    const handleOutsideClick=()=>{
        setShowModal(false);
    };
 
    return (
        <View style={styles.outside}>
            <Pressable onPress={handleOutsideClick} style={{flex:1, width:'100%',}}></Pressable>
            <View style={styles.mainbody}>
                <View style={styles.headerWrapper}><Text style={styles.txtHeader}>식재료 담기</Text></View>
                <ScrollView contentContainerStyle={{alignItems:'center'}} style={styles.contentOutterWrapper}>
                    <IngreGuideComp></IngreGuideComp>
                    <View style={{width:'100%', height:10,}}></View>
                    <View style={styles.titleCountWrapper}>
                        <Image
                            source={require('../../image/ingreModal_count.png')}
                            style={{width:24, height:24}}
                        >                
                        </Image>
                        <View style={{marginLeft:10, flex:1,}}>
                            <Text style={{fontWeight:'bold', fontSize:20, color:theme.titleWrapperBlue,}}>몇 인분(개) 기준인가요?</Text>
                        </View>
                        <TextInput
                            style={styles.countInputStyle}
                            value={foodCount}
                            onChangeText={(txt) => setFoodCount(txt)}
                            placeholder={''}
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
                    <View style={styles.titleDivider}></View>
                    <IngreTitleComp title={'기초 요리'} img={require('../../image/ingreModal_base.png')} prop={basicVisible} setter={setBasicVisible}></IngreTitleComp>
                    {basicVisible?
                    <View style={styles.baseWrapper}>
                        <View style={styles.baseRow}>
                            <View style={styles.baseRowCompWrapper}></View>
                            <View style={styles.baseRowCompWrapper}></View>
                            <View style={styles.baseRowCompWrapper}></View>
                            <View style={styles.baseRowCompWrapper}></View>
                        </View>
                        <View style={styles.baseRow}>
                            <View style={styles.baseRowCompWrapper}></View>
                            <View style={styles.baseRowCompWrapper}></View>
                            <View style={styles.baseRowCompWrapper}></View>
                            <View style={styles.baseRowCompWrapper}></View>
                        </View>
                    </View>
                    :<View style={styles.titleDivider}></View>}
                    <IngreTitleComp title={'조미료'} img={require('../../image/ingreModal_condiment.png')} prop={condimentVisible} setter={setCondimentVisible}></IngreTitleComp>
                    {condimentVisible?
                    <View><Text>a</Text></View>
                    :<View style={styles.titleDivider}></View>}
                    <IngreTitleComp title={'주재료 / 재료 추가'} img={require('../../image/ingreModal_ingre.png')} prop={ingreVisible} setter={setIngreVisible}></IngreTitleComp>
                    {ingreVisible?
                    <View><Text>a</Text></View>
                    :<View style={styles.titleDivider}></View>}
                </ScrollView>
            </View>
        </View>
    );
}

export default IngreModal;

const styles = StyleSheet.create({
    outside:{
        flex:1,
        width:'100%',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    mainbody:{
        width:'100%',
        flex:9,
        alignItems:'center',
        backgroundColor:theme.inputBackground2,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    headerWrapper:{
        width:'100%',
        height:40,
        backgroundColor:theme.btnExpenditureBlue,
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        justifyContent:'center',
        paddingLeft:20,
    },
    txtHeader:{
        fontWeight:'bold',
        fontSize:16,
        color:'white',
    },
    titleCountWrapper:{
        width:'100%',
        height:60,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:16,
        ...BASIC_SHADOW,
    },
    contentOutterWrapper:{
        width:'100%',
        flex:9,
    },
    countInputStyle:{
        width:50,
        height:28,
        textAlign:'center',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        backgroundColor:theme.inputBackground2
    },
    titleDivider:{
        width:'100%',
        height:3,
    },
    baseWrapper:{
        backgroundColor:theme.ingreBackDarkGrey,
        width:'100%',
        height:84,
    },
    baseRow:{
        flex:1,
    },
});