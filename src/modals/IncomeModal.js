import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS,
} from '../variables/scales';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
  
import { theme } from '../variables/color';
import {dateObject} from '../variables/scales';
import RegisterInput from '../components/RegisterInput';
import ModalTitle from '../components/ModalTitle';
import ModalDatePicker from '../components/ModalDatePicker';

const IncomeModal = ({ showModal, setShowModal,}) => {
    const {year, month, date, dateString}=dateObject();

    const [contentName, setContentName]=useState('');
    const [amout, setAmount]=useState('');
    const [dateToSend, setDateToSend]=useState(`${year}.${month}.${date}`);

    const handleOutsideClick=()=>{
        setShowModal(false);
    };

    //서버로의 데이터 전송, 데이터 전송 성공시 기존 입력 값을 삭제해 주어야 합니다.
    const handleApply=()=>{

    };

    const handleSend=()=>{
        const dataToSend={
            name:contentName,
            amount:amout,
            date:dateToSend,
        };
        console.log(dataToSend);
    };

    return (
        <Pressable style={styles.outside} onPress={handleOutsideClick}>
            <View style={styles.mainbody}>
                <View style={styles.headerWrapper}><Text style={styles.txtHeader}>+</Text></View>
                <View style={styles.contentOutterWrapper}>
                    <View style={styles.contentTopWrapper}>
                    <View style={styles.infoWrapper}>
                        <Text>엑셀을 업로드하면 수익은 자동으로 입력됩니다!</Text>
                        <Text>추가 사항을 하단에서 입력해주세요.</Text>
                    </View>
                    <ModalTitle text={'기타 수익'}></ModalTitle>
                    <View style={styles.calendarWrapper}>
                        <ModalDatePicker date={dateToSend} setter={setDateToSend}></ModalDatePicker>
                    </View>
                    <View style={styles.inputOutterWrapper}>
                        <View style={{flex:25 ,height:36, marginRight:4,}}>
                            <RegisterInput source={{setter:setContentName, placeHolder:'기타',}}></RegisterInput>
                        </View>
                        <View style={{flex:55, height:36, marginRight:4,}}>
                            <RegisterInput source={{setter:setAmount, placeHolder:'금액', keyType:'numeric'}}></RegisterInput>
                        </View>
                        <View style={styles.btnSendWrapper}>
                            <Pressable onPress={handleSend} style={styles.btnSend}>
                                <Text style={{color:'white',}}>입력</Text>
                            </Pressable>
                        </View>
                    </View>
                    </View>
                    <View style={styles.btnApplyWrapper}>
                        <Pressable style={styles.btnApply} onPress={handleApply}>
                            <Text style={{color:'white',}}>적용</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

export default IncomeModal;

const styles = StyleSheet.create({
    outside:{
        flex:1,
        width:'100%',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    mainbody:{
        width:'100%',
        height:'80%',
        alignItems:'center',
        backgroundColor:theme.inputBackground2,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    headerWrapper:{
        width:'100%',
        height:40,
        backgroundColor:theme.btnIncomeRed,
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
        justifyContent:'space-between',
    },
    contentTopWrapper:{
        width:'100%',
        alignItems:'center',
    },
    infoWrapper:{
        marginTop:20,
        padding:16,
        width:'90%',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        backgroundColor:theme.darkGrey,
    },
    inputOutterWrapper:{
        width:'90%',
        flexDirection:'row',
    },
    btnSendWrapper:{
        flex:20,
        maxWidth:80,
        height:'100%',
        borderRadius:15,
        backgroundColor:theme.btnIncomeRed,
    },
    btnSend:{
        width:'100%',
        height:40,
        justifyContent:'center',
        alignItems:'center',
    },
    btnApplyWrapper:{
        width:160,
        height:40,
        backgroundColor:theme.btnIncomeRed,
        marginBottom:40,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    btnApply:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    calendarWrapper:{
        width:'90%',
        height:40,
    },
});