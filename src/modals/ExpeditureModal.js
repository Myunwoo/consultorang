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
import FixedContentComponent from '../components/FixedContentComponent';
import ModalTitle from '../components/ModalTitle';
import ModalDatePicker from '../components/ModalDatePicker';

const ExpeditureModal = ({ showModal, setShowModal,}) => {
    const {year, month, date, dateString}=dateObject();

    const [fixedDate, setFixedDate]=useState(`${year}.${month}.${date}`);
    const [fixedContentName, setFixedContentName]=useState('');
    const [fixedAmount, setFixedAmount]=useState('');
    const [etcDate, setEtcDate]=useState(`${year}.${month}.${date}`);
    const [etcContentName, setEtcContentName]=useState('');
    const [etcAmount, setEtcAmount]=useState('');
    
    const handleOutsideClick=()=>{
        //setShowModal(false);
        console.log('handleOutsideClick')
    };


    const handleDateSelect=(type)=>{
        console.log(type);
    };

    const handleFixedSend=()=>{
        const dataToSend={
            name:fixedContentName,
            amount:fixedAmount,
            date:fixedDate,
        };
        console.log(dataToSend);
    };

    const handleEtcSend=()=>{
        const dataToSend={
            name:etcContentName,
            amount:etcAmount,
            date:etcDate,
        };
        console.log(dataToSend);
    }

    return (
        <Pressable style={styles.outside} onPress={handleOutsideClick}>
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
                            <RegisterInput source={{setter:setFixedAmount, placeHolder:'금액',keyType:'numeric'}}></RegisterInput>
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
                            <RegisterInput source={{setter:setEtcContentName, placeHolder:'기타',}}></RegisterInput>
                        </View>
                        <View style={{flex:55, height:36, marginRight:4,}}>
                            <RegisterInput source={{setter:setEtcAmount, placeHolder:'금액', keyType:'numeric'}}></RegisterInput>
                        </View>
                        <View style={styles.btnSendWrapper}>
                            <Pressable onPress={handleEtcSend} style={styles.btnSend}>
                                <Text style={{color:'white',}}>입력</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
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
        height:'80%',
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
        maxHeight:200,
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
});