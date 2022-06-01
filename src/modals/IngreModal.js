import React, {useEffect, useState, useRef,} from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Image, TextInput, Keyboard, Platform} from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS, BASIC_SHADOW
} from '../variables/scales';

import { theme } from '../variables/color';
import {SPICE_1, SPICE_2, SPICE_3, SPICE_4, SPICE_5, SPICE_6} from '../variables/codelist';

import IngreGuideComp from '../components/IngreGuideComp';
import IngreTitleComp from '../components/IngreTitleComp';
import IngreInputResult from '../components/IngreInputResult';
import IngreInput from '../components/IngreInput';
import CondimentButton from '../components/CondimentButton';
import {STATE_UN_TARGET, STATE_ON_TARGET, STATE_DONE} from '../components/CondimentButton';

let i=0; 

const IngreModal = ({ showModal, setShowModal, condiArr, mainArr, arrSetter}) => {
    const [basicVisible, setBasicVisible]=useState(false);
    const [condimentVisible, setCondimentVisible]=useState(false);
    const [ingreVisible, setIngreVisible]=useState(false);
    const [foodCount, setFoodCount]=useState('0');
    const scrollViewRef=useRef();
    const condimentInputRef=useRef();
    const condimentBtnRef=useRef([]);
    //let condiBtnIndex=0;
    
    const [condimentInputVisible, setCondimentInputVisible]=useState(false);
    //조미료 리스트
    const [condimentList, setCondimentList]=useState(condiArr);    
    //주재료 / 재료 추가 리스트
    const [mainIngreList, setMainIngreList]=useState(mainArr);
    //현재 추가중인 재료가 무엇인지 저장
    const [isInputting, setIsInputting]=useState([]);

    const handleOutsideClick=()=>{
        setShowModal(false);
    };

    //IngreModal에서 다루는 형식
    //{name:'식초', price:3600, amount:'20', amountUnit:'L', usage:3, unit:'스푼'}


    //MenuCalculatorScreen에서 다루는 형식
    //{name:'박력밀가루', totalCost:'19140원', totalWeight:'20Kg', weight:'150g', cost:'144원'},
    const handleApply=()=>{
        arrSetter(condimentList,mainIngreList);
        setShowModal(false);
    };

    const handleCondiBtnClick=(name, state, callback)=>{
        if(state===STATE_UN_TARGET){
            if(condimentInputVisible){
                condimentInputRef.current.setName(name);
                condimentInputRef.current.setNameEditable(false);
            }else{
                setCondimentInputVisible(true);
                condimentInputRef.current.setName(name);
                condimentInputRef.current.setNameEditable(false);
            }
            callback(state);
            const t=isInputting.slice();
            t.push(name)
            setIsInputting(t);
        }else if(state===STATE_ON_TARGET){
            setCondimentInputVisible(false);
            callback(state);
            setIsInputting([]);
        }else if(state===STATE_DONE){
            let newArr=condimentList.filter((element)=> element.name !== name);
            setCondimentList(newArr);
            callback(state);
        }   
    }

    //
    useEffect(()=>{
        const len=SPICE_1.length+SPICE_2.length+SPICE_3.length+SPICE_4.length+SPICE_5.length+SPICE_6.length;
        condimentBtnRef.current=new Array(len).fill(0);
    },[])

    useEffect(()=>{
        if(ingreVisible) scrollViewRef.current.scrollToEnd({animated:true});
    },[ingreVisible]);

    useEffect(()=>{
        if(isInputting.length>1){
            const shifted=isInputting.shift();
            console.log('shifted ', shifted);
            for(let i=0;i<condimentBtnRef.current.length;i++){
                condimentBtnRef.current[i].findAndDisabled(shifted);
            }
        }
    },[isInputting])
 
    return (
        <View style={styles.outside}>
            <Pressable onPress={handleOutsideClick} style={{flex:1, width:'100%',}}></Pressable>
            <View style={styles.mainbody}>
                <View style={styles.headerWrapper}><Text style={styles.txtHeader}>식재료 담기</Text></View>
                <ScrollView ref={scrollViewRef} contentContainerStyle={{alignItems:'center'}} style={styles.contentOutterWrapper}>
                    <IngreGuideComp></IngreGuideComp>
                    <View style={{width:'100%', height:10,}}></View>
                    {/* <View style={styles.titleCountWrapper}>
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
                    </View> */}
                    <View style={styles.titleDivider}></View>
                    <IngreTitleComp title={'기초 요리'} img={require('../../image/ingreModal_base.png')} prop={basicVisible} setter={setBasicVisible}></IngreTitleComp>
                    {basicVisible?
                    <View style={styles.baseWrapper}>
                        {/* <View style={styles.baseRow}>
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
                        </View> */}
                        <Text>준비중 입니다</Text>
                    </View>
                    :<View style={styles.titleDivider}></View>}
                    <IngreTitleComp title={'조미료'} img={require('../../image/ingreModal_condiment.png')} prop={condimentVisible} setter={setCondimentVisible}></IngreTitleComp>
                    {condimentVisible?
                    <View style={styles.condimentWrapper}>
                        <View style={styles.condiTitleWrapper}><Text style={styles.txtCondiTitle}>양념 / 액젓 / 장류</Text></View>
                        <View style={styles.condiBtnWrapper}>
                            {SPICE_1.map(spice=><CondimentButton ref={el=>condimentBtnRef.current[spice.refNum]=el} condimentData={spice} clickFunc={handleCondiBtnClick} listProp={{condimentList, setCondimentList}} isInputting={isInputting}></CondimentButton>)}
                        </View>
                        <View style={styles.condiTitleWrapper}><Text style={styles.txtCondiTitle}>식용유 / 기름 / 깨</Text></View>
                        <View style={styles.condiBtnWrapper}>
                            {SPICE_2.map(spice=><CondimentButton ref={el=>condimentBtnRef.current[spice.refNum]=el} condimentData={spice} clickFunc={handleCondiBtnClick} listProp={{condimentList, setCondimentList}} isInputting={isInputting}></CondimentButton>)}
                        </View>
                        <View style={styles.condiTitleWrapper}><Text style={styles.txtCondiTitle}>소금 / 설탕 / 향신료</Text></View>
                        <View style={styles.condiBtnWrapper}>
                            {SPICE_3.map(spice=><CondimentButton ref={el=>condimentBtnRef.current[spice.refNum]=el} condimentData={spice} clickFunc={handleCondiBtnClick} listProp={{condimentList, setCondimentList}} isInputting={isInputting}></CondimentButton>)}
                        </View>
                        <View style={styles.condiTitleWrapper}><Text style={styles.txtCondiTitle}>식초 / 소스 / 드레싱</Text></View>
                        <View style={styles.condiBtnWrapper}>
                            {SPICE_4.map(spice=><CondimentButton ref={el=>condimentBtnRef.current[spice.refNum]=el} condimentData={spice} clickFunc={handleCondiBtnClick} listProp={{condimentList, setCondimentList}} isInputting={isInputting}></CondimentButton>)}
                        </View>
                        <View style={{flexDirection:'row',}}>
                            <View style={styles.condiTitleWrapper}><Text style={styles.txtCondiTitle}>밀가루 / 가루</Text></View>
                            <View style={styles.condiTitleWrapper}><Text style={styles.txtCondiTitle}>유제품</Text></View>
                        </View>
                        <View style={{flexDirection:'row',}}>
                            <View style={{...styles.condiBtnWrapper, flex:1}}>
                                {SPICE_5.map(spice=><CondimentButton ref={el=>condimentBtnRef.current[spice.refNum]=el} condimentData={spice} clickFunc={handleCondiBtnClick} listProp={{condimentList, setCondimentList}} isInputting={isInputting}></CondimentButton>)}
                            </View>
                            <View style={{...styles.condiBtnWrapper, flex:1}}>
                                {SPICE_6.map(spice=><CondimentButton ref={el=>condimentBtnRef.current[spice.refNum]=el} condimentData={spice} clickFunc={handleCondiBtnClick} listProp={{condimentList, setCondimentList}} isInputting={isInputting}></CondimentButton>)}
                            </View>
                        </View>
                        {condimentList.length>0
                        ?condimentList.map(condiment=>{    
                            return(<IngreInputResult data={condiment}></IngreInputResult>);
                        })
                        :<View></View>
                        }
                        {condimentList.length>0
                        ?<View style={styles.mainIngreDivider}></View>
                        :<View></View>}
                        {/* {condimentInputVisible
                        ?<IngreInput ref={condimentInputRef} prop={condimentList} setter={setCondimentList}></IngreInput>
                        :<View></View>} */}
                        <IngreInput visible={condimentInputVisible} setVisible={setCondimentVisible} ref={condimentInputRef} prop={condimentList} setter={setCondimentList}></IngreInput>
                    </View>
                    :<View style={styles.titleDivider}></View>}
                    <IngreTitleComp title={'주재료 / 재료 추가'} img={require('../../image/ingreModal_ingre.png')} prop={ingreVisible} setter={setIngreVisible}></IngreTitleComp>
                    {ingreVisible?
                    <View style={styles.mainIngreWrapper}>
                        {mainIngreList.length>0
                        ?mainIngreList.map(mainIngre=>{    
                            return(<IngreInputResult data={mainIngre}></IngreInputResult>);
                        })
                        :<View></View>
                        }
                        {mainIngreList.length>0
                        ?<View style={styles.mainIngreDivider}></View>
                        :<View></View>}
                        <IngreInput visible={true} setVisible={()=>{}} prop={mainIngreList} setter={setMainIngreList}></IngreInput>
                    </View>
                    :<View style={styles.titleDivider}></View>}
                </ScrollView>
            </View>
            <View style={styles.btnOutterWrapper}>
                <View style={styles.btnInnerWrapper}>
                    <Pressable onPress={handleApply} style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center',}}>
                        <Text style={styles.btnAppley}>식재료 추가하기</Text>
                    </Pressable>
                </View>
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
        backgroundColor:theme.inputBackground2,
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
        marginBottom:0,
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
    baseRowCompWrapper:{

    },
    condimentWrapper:{
        width:'95%',
        marginVertical:10,
    },
    condiTitleWrapper:{
        flex:1,
        height:24,
        marginVertical:8,
    },
    condiBtnWrapper:{
        width:'95%',
        flexDirection:'row',
        flexWrap:'wrap',
    },
    txtCondiTitle:{
        fontSize:17,
        color:theme.torangGrey,
    },
    mainIngreWrapper:{
        width:'100%',
    },
    mainIngreDivider:{
        width:'90%',
        height:2,
        backgroundColor:theme.torangGrey,
        alignSelf:'center',
        marginVertical:2,
        opacity:0.4,
    },
    btnOutterWrapper:{
        width:'100%',
        height:36,
        justifyContent:'center',
        alignItems:'center',
        marginTop:4,
        marginBottom:18,        
    },
    btnInnerWrapper:{
        width:'40%',
        height:'100%',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        backgroundColor:theme.btnExpenditureBlue,
        ...BASIC_SHADOW,
    },
    btnAppley:{
        color:'white',
        fontWeight:'bold',
        fontSize:16,
    }
});

