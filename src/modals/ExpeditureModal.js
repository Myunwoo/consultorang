import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS,
} from '../variables/scales';

import {fetchServer,getItemAsyncStorage} from '../abstract/asyncTasks';
import { theme } from '../variables/color';
import {dateObject} from '../variables/scales';
import RegisterInput from '../components/RegisterInput';
import FixedContentComponent from '../components/FixedContentComponent';
import ModalTitle from '../components/ModalTitle';
import ModalDatePicker from '../components/ModalDatePicker';
import ModalItem from '../components/ModalItem';

let i=0;

const ExpeditureModal = ({ showModal, setShowModal,}) => {
    const {year, month, date, dateString}=dateObject();

    const [fixedDate, setFixedDate]=useState(`${year}.${month<10?'0'+month:month}.${date<10?'0'+date:date}`);
    const [fixedContentName, setFixedContentName]=useState('');
    const [fixedAmount, setFixedAmount]=useState('');
    const [etcDate, setEtcDate]=useState(`${year}.${month<10?'0'+month:month}.${date<10?'0'+date:date}`);
    const [etcContentName, setEtcContentName]=useState('');
    const [etcAmount, setEtcAmount]=useState('');
    const [commands, setCommands]=useState([]);
    const [userId, setUserId]=useState('');

    useEffect(()=>{
        getItemAsyncStorage('userId').then(res=>{
            setUserId(res);
        });
    },[]);
    
    const handleOutsideClick=()=>{
        setShowModal(false);
    };

    const handleFixedSend=()=>{
        const dataToSend={
            userId,
            expendType:fixedContentName,
            expendCost:fixedAmount,
            expendYmd:fixedDate.replace(/\./g,''),
        };
        if(fixedContentName==='' || fixedAmount===''){
            alert('지출 타입과 액수를 입력해 주세요');
            return;
        }
        if(isNaN(fixedAmount)){
            alert('지출 액수에는 숫자를 입력해주세요.');
            return;
        }
        setFixedContentName('');
        setFixedAmount('');
        setFixedDate(`${year}.${month<10?'0'+month:month}.${date<10?'0'+date:date}`);
        let t=commands.slice();
        t.push(dataToSend);
        setCommands(t);
    };

    const handleEtcSend=()=>{
        const dataToSend={
            userId,
            expendType:etcContentName,
            expendCost:etcAmount,
            expendYmd:etcDate.replace(/\./g,''),
        };
        if(etcContentName==='' || etcAmount===''){
            alert('지출 내용과 액수를 입력해 주세요');
            return;
        }
        if(isNaN(etcAmount)){
            alert('지출 액수에는 숫자를 입력해 주세요');
            return;
        }
        setEtcContentName('');
        setEtcAmount('');
        setEtcDate(`${year}.${month<10?'0'+month:month}.${date<10?'0'+date:date}`);
        let t=commands.slice();
        t.push(dataToSend);
        setCommands(t);
    };

    const handleApply=()=>{
        console.log(commands);
        fetchServer('POST', '/account/insertExpend', commands).then((responseJson) => {
            console.log(responseJson);
            if(responseJson.retCode){
                if(responseJson.retCode==='0'){
                    alert('지출을 추가하였습니다');
                    setShowModal(false);
                }
                else{
                    alert('지출 추가를 실패하였습니다');
                }
            }else{
                alert('지출 추가를 실패하였습니다');
                setShowModal(false);
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <View style={styles.outside}>
            <Pressable onPress={handleOutsideClick} style={{flex:2, width:'100%',}}></Pressable>
            <View style={styles.mainbody}>
                <View style={styles.headerWrapper}><Text style={styles.txtHeader}>-</Text></View>
                <View style={styles.contentOutterWrapper}>
                    <View style={styles.infoWrapper}>
                        <Text>지출 항목을 선택한 후 금액을 입력해 주세요.</Text>
                    </View>
                    <ModalTitle text={'지출 항목'}></ModalTitle>
                    <View style={styles.calendarWrapper}>
                        <ModalDatePicker date={fixedDate} setter={setFixedDate}></ModalDatePicker>
                    </View>
                    <View style={styles.fixedContentWrapper}>
                        <FixedContentComponent source={{name:fixedContentName, setter:setFixedContentName,title:'식재료비'}}></FixedContentComponent>
                        <FixedContentComponent source={{name:fixedContentName, setter:setFixedContentName,title:'인건비'}}></FixedContentComponent>
                        <FixedContentComponent source={{name:fixedContentName, setter:setFixedContentName,title:'고정비'}}></FixedContentComponent>
                    </View>
                    <View style={styles.inputOutterWrapper}>
                        <View style={{flex:25 ,height:36, marginRight:4,}}>
                            <RegisterInput source={{prop:fixedAmount, setter:setFixedAmount, placeHolder:'금액',keyType:'numeric'}}></RegisterInput>
                        </View>
                        <View style={styles.btnSendWrapper}>
                            <Pressable onPress={handleFixedSend} style={styles.btnSend}>
                                <Text style={{color:'white',}}>입력</Text>
                            </Pressable>
                        </View>
                    </View>
                    <ModalTitle text={'기타 지출'}></ModalTitle>
                    <View style={styles.calendarWrapper}>
                        <ModalDatePicker date={etcDate} setter={setEtcDate}></ModalDatePicker>
                    </View>
                    <View style={styles.inputOutterWrapper}>
                        <View style={{flex:25 ,height:36, marginRight:4,}}>
                            <RegisterInput source={{prop: etcContentName, setter:setEtcContentName, placeHolder:'기타',}}></RegisterInput>
                        </View>
                        <View style={{flex:55, height:36, marginRight:4,}}>
                            <RegisterInput source={{prop: etcAmount, setter:setEtcAmount, placeHolder:'금액', keyType:'numeric'}}></RegisterInput>
                        </View>
                        <View style={styles.btnSendWrapper}>
                            <Pressable onPress={handleEtcSend} style={styles.btnSend}>
                                <Text style={{color:'white',}}>입력</Text>
                            </Pressable>
                        </View>
                    </View>
                    <ScrollView style={styles.scrollView}>
                        {commands.map(command=>
                            <View key={i++} style={styles.modalItemWrapper}>
                                <ModalItem name={command.expendType} date={command.expendYmd} amount={command.expendCost} setter={setCommands} prop={commands} key={i++}></ModalItem>
                            </View>)}
                    </ScrollView>
                    <View style={styles.btnApplyWrapper}>
                        <Pressable style={styles.btnApply} onPress={handleApply}>
                            <Text style={{color:'white',}}>적용</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default ExpeditureModal;

const styles = StyleSheet.create({
    outside:{
        flex:1,
        width:'100%',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    mainbody:{
        width:'100%',
        flex:8,
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
        color:'white',
    },
    contentOutterWrapper:{
        width:'100%',
        flex:9,
        alignItems:'center',
    },
    infoWrapper:{
        marginTop:20,
        padding:16,
        width:'90%',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        backgroundColor:theme.darkGrey,
    },
    calendarWrapper:{
        width:'90%',
        height:40,
    },
    fixedContentWrapper:{
        width:'100%',
        flex:1,
        maxHeight:120,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    btnDate:{
        height:'100%',
        alignItems:'center',
        marginLeft:4,
        flexDirection:'row',
    },
    inputOutterWrapper:{
        width:'90%',
        flexDirection:'row',
    },
    btnSendWrapper:{
        width:80,
        height:'100%',
        borderRadius:15,
        backgroundColor:theme.btnExpenditureBlue,
    },
    btnSend:{
        width:'100%',
        height:40,
        justifyContent:'center',
        alignItems:'center',
    },
    scrollView:{
        width:'90%',
        flex:1,
        marginBottom:20,
        marginTop:8,
    },
    modalItemWrapper:{
        marginVertical:2,
        width:'100%',
        height:44,
    },
    btnApplyWrapper:{
        width:160,
        height:40,
        backgroundColor:theme.btnExpenditureBlue,
        marginBottom:40,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    btnApply:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
});