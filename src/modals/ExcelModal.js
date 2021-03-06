import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS,
} from '../variables/scales';
import * as DocumentPicker from 'expo-document-picker';
  
import { theme } from '../variables/color';
import {dateObject} from '../variables/scales';
import {getItemAsyncStorage, uploadFile} from '../abstract/asyncTasks';

const findExcel=async()=>{
    let res=null;
    try{
        res = await DocumentPicker.getDocumentAsync({
            //엑셀만 뜨게 타입 지정해 줄 것.
            //type: [DocumentPicker.types.allFiles],
            //There can me more options as well
            // DocumentPicker.types.allFiles
            // DocumentPicker.types.images
            // DocumentPicker.types.plainText
            // DocumentPicker.types.audio
            // DocumentPicker.types.pdf
            // type: "vnd.ms-excel" // .xls
            // type: "vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
            // type: "text/csv" // .csv
          });
    }catch(err){
        //Handling any exception (If any)
        if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
            alert('Canceled from single doc picker');
        } else {
            //For Unknown Error
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
        }
    }finally{
        return res;
    }
};

const ExcelModal = ({ showModal, setShowModal,}) => {
    const [excel, setExcel]=useState(null);
    const {year, month, date, dateString, yyyymmdd}=dateObject();
    const [userId, setUserId]=useState('');

    let txtFilename={
        color:theme.placeholderColor,
        fontSize:16,
    };

    //USER_ID를 Excel Modal로 정홛ㄱ히! 보내주기
    useEffect(()=>{
        getItemAsyncStorage('userId').then(res=>{
            if(!isNaN(res)){
                setUserId(res);    
            }
        })
    },[]);

    const handleSelect=()=>{
        findExcel().then(res=>{
            if(res.type==='success'){
                setExcel(res);
            }
            else if(res.type==='cancel'){

            }
            else{
                console.log('excel err');
            }
        });
    };

    const handleSend=()=>{
        uploadFile('POST','/account/insertExcel',excel, userId, `${year}${month<10 ? '0'+month : month}`).then(responseJson=>{
            // console.log('responseJson');
            // console.log(responseJson);
            if(responseJson.retCode==='0'){
                alert('엑셀 전송을 성곡하였습니다.');
                setShowModal(false);
            }else{
                alert(responseJson.errMsg);
            }
        });
    };

    const handleOutsideClick=()=>{
        setShowModal(false);
    };

    return (
        <Pressable style={styles.outside} onPress={handleOutsideClick}>
            <View style={styles.mainbody}>
                <View style={styles.headerWrapper}><Text style={styles.txtHeader}>UPLOAD</Text></View>
                <View style={styles.contentOutterWrapper}>
                    <View style={styles.contentInnerWrapper}>
                        <View style={styles.selectWrapper}>
                            <Pressable onPress={handleSelect} style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center',}}>
                                <Text style={{fontWeight:'bold', fontSize:20,}}>파일 선택</Text>
                            </Pressable>
                        </View>
                        <View style={styles.fileWrapper}>
                            <Text style={txtFilename}>{excel ? excel.name : '파일명'}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.sendWrapper}>
                    <View style={styles.btnSendWrapper}>
                        <Pressable style={styles.btnSend} onPress={handleSend}>
                            <Text style={{color:'white',}}>전송</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

export default ExcelModal;

const styles = StyleSheet.create({
    outside:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    mainbody:{
        width:'80%',
        maxWidth:300,
        height:'60%',
        maxHeight:400,
        alignItems:'center',
        backgroundColor:theme.inputBackground2,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    headerWrapper:{
        width:'100%',
        height:40,
        backgroundColor:theme.torangYellow,
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
        justifyContent:'center',
    },
    contentInnerWrapper:{
        width:'100%',
        height:'80%',
        alignItems:'center',
    },
    selectWrapper:{
        width:'80%',
        flex:4,
        backgroundColor:theme.torangYellow,
        marginTop:12,
        marginBottom:8,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    fileWrapper:{
        width:'80%',
        flex:5,
        backgroundColor:'white',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        justifyContent:'center',
        alignItems:'center',
    },
    sendWrapper:{
        flex:3,
        width:'100%',
        borderBottomLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderBottomRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        justifyContent:'center',
        alignItems:'center',
    },
    btnSendWrapper:{
        width:'80%',
        height:40,
        backgroundColor:'black',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    btnSend:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    }
});