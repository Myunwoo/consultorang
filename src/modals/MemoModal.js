import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Keyboard, Image } from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS,
} from '../variables/scales';
  
import { theme } from '../variables/color';
import {dateObject} from '../variables/scales';
import ModalTitle from '../components/ModalTitle';
import ModalDatePicker from '../components/ModalDatePicker';

import { fetchServer,getItemAsyncStorage } from '../abstract/asyncTasks';

const MemoModal = ({ showModal, setShowModal,}) => {
    const {year, month, date, dateString}=dateObject();
    const [memo, setMemo]=useState('');
    const [memoLen, setMemoLen]=useState(0);
    const [dateToSend, setDateToSend]=useState(`${year}.${month<10?'0'+month:month}.${date<10?'0'+date:date}`);
    const [userId, setUserId]=useState('');
    useEffect(()=>{
        getItemAsyncStorage('userId').then(res=>{
            setUserId(res);
        })
    },[]);

    useEffect(()=>{
        setMemoLen(memo.length);
    },[memo])

    const handleOutsideClick=()=>{
        setShowModal(false);
    };

    const handleSend=()=>{
        const dataToSend={
            userId,
            memoYmd:dateToSend.replace(/\./g,''),
            memoStr:memo,
        };
        if(memo===''){
            alert('메모를 입력하세요');
            return;
        }

        fetchServer('POST', '/account/insertMemo', dataToSend).then((responseJson) => {
            if(responseJson.retCode==='0'){
                alert('메모가 추가되었습니다');
                setMemo('');
                setShowModal(false);
            }else{
                alert('memo insertion error');
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <View style={styles.outside}>
            <Pressable onPress={handleOutsideClick} style={{flex:1, width:'100%',}}></Pressable>
            <View style={styles.mainbody}>
                <View style={styles.headerWrapper}><Text style={styles.txtHeader}>+</Text></View>
                <View style={styles.contentOutterWrapper}>
                    <ModalTitle text={'메모 입력'}></ModalTitle>
                    <View style={styles.calendarWrapper}>
                        <ModalDatePicker date={dateToSend} setter={setDateToSend}></ModalDatePicker>
                    </View>
                    <View style={styles.memoInputWrapper}>
                        <TextInput
                            style={styles.inputStyle}
                            value={memo}
                            onChangeText={(txt) => setMemo(txt)}
                            placeholder={'내용 입력'}
                            placeholderTextColor={theme.placeholderColor}
                            keyboardType="default"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            underlineColorAndroid="#f000"
                            returnKeyType="next"
                            secureTextEntry={false}
                            editable={true}
                            maxLength={300}
                            multiline={true}
                            textAlignVertical={'top'}
                        />
                    </View>
                    <View style={styles.lengthWrapper}>
                        <Text style={{marginRight:12,}}>{`${memoLen}/300`}</Text>
                    </View>
                    <View style={styles.btnSendWrapper}>
                        <Pressable onPress={handleSend} style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center', }}>
                            <Text>입력</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default MemoModal;

const styles = StyleSheet.create({
    inputStyle:{
        backgroundColor:'white',
        flex:1,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        paddingTop:16,
        paddingBottom:16,
        paddingLeft:10,
        paddingRight:10,
    },
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
        backgroundColor:theme.torangGrey,
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        justifyContent:'center',
        paddingLeft:20,
    },
    txtHeader:{
        fontWeight:'bold',
        color:'white',
    },
    contentOutterWrapper:{
        width:'100%',
        flex:9,
        alignItems:'center',
    },
    calendarWrapper:{
        width:'90%',
        height:40,
    },
    btnDate:{
        height:'100%',
        alignItems:'center',
        marginLeft:4,
        flexDirection:'row',
    },
    memoInputWrapper:{
        flex:1,
        width:'100%',
        paddingHorizontal:'5%',
    },
    lengthWrapper:{
        width:'100%',
        height:40,
        marginBottom:30,
        justifyContent:'center',
        alignItems:'flex-end',
    },
    btnSendWrapper:{
        width:160,
        height:40,
        backgroundColor:theme.torangYellow,
        borderRadius:15,
        marginBottom:30,
    }
});