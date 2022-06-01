import React, {useEffect, useState, useRef,useImperativeHandle, forwardRef} from 'react';
import { Text, View, Pressable, Platform} from 'react-native';
import { theme } from '../variables/color';

export const STATE_UN_TARGET=0;
export const STATE_ON_TARGET=1;
export const STATE_DONE=2;

//1. 클릭에 대한 처리는 외부, 내부는 디자인 변경만
//2. handleClick에서 setCondimentVisible을 조작해서 뷰를 띄워줄 수 있을 듯.
const CondimentButton=(prop, ref)=>{
    const {condimentData, clickFunc, listProp, isInputting}=prop;
    const {name, code}=condimentData;
    const {condimentList, setCondimentList}=listProp;

    const UN_TARGET_STYLE={
        mainbody:{
            borderRadius:20,
            borderWidth:1,
            borderColor:'black',
            paddingHorizontal:12,
            paddingVertical:8,
            width:50+name.length*8,
            height:40,
            marginHorizontal:2,
            marginVertical:2,
        },
        txt:{
            color:'black',
            ...Platform.select({
                ios:{
                    fontSize:16,
                },
                android:{
                    fontSize:14,
                }
            })
        }  
    };

    const ON_TARGET_STYLE={
        mainbody:{
            borderRadius:20,
            borderWidth:1,
            borderColor:theme.btnExpenditureBlue,
            paddingHorizontal:12,
            paddingVertical:8,
            width:50+name.length*8,
            height:40,
            marginHorizontal:2,
            marginVertical:2,
        },
        txt:{
            color:theme.btnExpenditureBlue,
            ...Platform.select({
                ios:{
                    fontSize:16,
                },
                android:{
                    fontSize:14,
                }
            })
        } 
    };

    const DONE_STYLE={
        mainbody:{
            borderRadius:20,
            borderWidth:1,
            backgroundColor:theme.btnExpenditureBlue,
            borderColor:theme.btnExpenditureBlue,
            paddingHorizontal:12,
            paddingVertical:8,
            width:50+name.length*8,
            height:40,
            marginHorizontal:2,
            marginVertical:2,
        },
        txt:{
            color:'white',
            ...Platform.select({
                ios:{
                    fontSize:16,
                },
                android:{
                    fontSize:14,
                }
            })
        }
    };

    const [style, setStyle]=useState(UN_TARGET_STYLE);
    const [state, setState]=useState(STATE_UN_TARGET);

    useEffect(()=>{
        if(condimentList.find(condi=>condi.name===name)) setState(STATE_DONE);
    },[]);

    useEffect(()=>{
        if(state===STATE_UN_TARGET) setStyle(UN_TARGET_STYLE);
        else if(state===STATE_ON_TARGET) setStyle(ON_TARGET_STYLE);
        else if(state===STATE_DONE) setStyle(DONE_STYLE);
    },[state]);

    const myCheckState=(arg)=>{
        if(state===STATE_ON_TARGET && isInputting!==name){
            setState(STATE_UN_TARGET);
        }
    };

    const mySetState=(arg)=>{
        setState(arg);
    }

    //ref가 마지막 요소인 생크림만을 지정하고 있기 때문에 ref를 할당하는 부분, ref에 접근하는 부분에 수정이 필요
    const myFindAndDisable=(arg)=>{
        if(arg===name){
            setState(STATE_UN_TARGET);
        }
    }

    useImperativeHandle(ref,()=>({
        checkState: (arg) => {myCheckState(arg)},
        setState: (arg) => {mySetState(arg)},
        findAndDisabled: (arg) =>{myFindAndDisable(arg)}
    }))

    const clickCallback=(arg)=>{
        if(arg===STATE_UN_TARGET){
            setState(STATE_ON_TARGET);
        }else if(arg===STATE_ON_TARGET){
            setState(STATE_UN_TARGET);
        }else if(arg===STATE_DONE){
            setState(STATE_UN_TARGET);
        }
    }

    const handleClick=()=>{
        clickFunc(name, state, clickCallback);
    };

    return(
        <View style={style.mainbody}>
            <Pressable onPress={handleClick} style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center',}}>
                <Text style={style.txt}>{name}</Text>
            </Pressable>
        </View>
    );
};

export default forwardRef(CondimentButton);