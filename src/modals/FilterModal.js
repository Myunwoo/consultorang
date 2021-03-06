import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Keyboard, Image } from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS,
} from '../variables/scales';
  
import {dateObject} from '../variables/scales';
import { theme } from '../variables/color';
import {EXPEND_TYPE_LIST} from '../variables/codelist';
import ModalTitle from '../components/ModalTitle';
import FilterItem from '../components/FilterItem';
import {getItemAsyncStorage} from '../abstract/asyncTasks';

const getYmd=(type)=>{
    let d=new Date();
    let year=d.getFullYear();
    let month;
    let date;
    let yyyymmdd;
    if(type==='' || type==='당월'){
        month=d.getMonth()+1;
        yyyymmdd=`${year}${month >= 10 ? month : '0' + month}01`;
    }else if(type==='1개월'){
        month=d.getMonth()===0?12:d.getMonth();
        date=d.getDate();
        yyyymmdd=`${year}${month >= 10 ? month : '0' + month}${date >= 10 ? date : '0' + date}`;
    }else if(type==='3개월'){
        d=new Date();
        month=d.getMonth()-3;
        date=d.getDate();
        let target=new Date(year, month, date);
        let y=target.getFullYear();;
        let m=target.getMonth()+1;
        let d=target.getDate();
        yyyymmdd=`${y}${m >= 10 ? m : '0' + m}${d >= 10 ? d : '0' + d}`;
    }else if(type==='6개월'){
        d=new Date();
        month=d.getMonth()-6;
        date=d.getDate();
        let target=new Date(year, month, date);
        let y=target.getFullYear();;
        let m=target.getMonth()+1;
        let d=target.getDate();
        yyyymmdd=`${y}${m >= 10 ? m : '0' + m}${d >= 10 ? d : '0' + d}`;
    }
    return yyyymmdd;
}

const FilterModal = ({ showModal, setShowModal, setSendObj}) => {
    const {year, month, date, dateString, yyyymmdd}=dateObject();
    const [searchLen, setSearchLen]=useState('');
    const [searchType, setSearchType]=useState('');
    const [searchDetail, setSearchDetail]=useState('');
    const [userId, setUserId]=useState('');

    useEffect(()=>{
        getItemAsyncStorage('userId').then(res=>{
            setUserId(res);
        })
    },[])

    const handleOutsideClick=()=>{
        setShowModal(false);
    };

    const getHistoryType=()=>{
        if(searchType==='' || searchType==='전체') return '';
        else if(searchType==='수익') return 'SALE';
        else if(searchType==='지출') return 'EXPEND';
        return '';
    };

    const getSpecificType=()=>{
        if(searchType!=='지출') return '';
        if(searchDetail==='전체' || searchDetail==='') return EXPEND_TYPE_LIST.all;
        else if(searchDetail==='식재료비') return EXPEND_TYPE_LIST.food;
        else if(searchDetail==='인건비') return EXPEND_TYPE_LIST.human;
        else if(searchDetail==='고정비') return EXPEND_TYPE_LIST.fixed;
    };

    const handleApply=()=>{
        const sendObj={
            userId,
            'startYmd':getYmd(searchLen),
            'endYmd':yyyymmdd,
            'historyType':getHistoryType(),
            'specificType':getSpecificType(),
        };
        setSendObj(sendObj);
        setShowModal(false);
    };

    let detailWrapper= searchType==='지출'?{
        flexDirection:'row',
        height:72,
    }
    : {
        width:0,height:0,
    }

    return (
        <View style={styles.outside}>
            <Pressable onPress={handleOutsideClick} style={{flex:2, width:'100%',}}></Pressable>
            <View style={styles.mainbody}>
                <View style={styles.headerWrapper}>
                    <Image
                        resizeMode='contain'
                        style={{width:20, height:20, marginRight:8,}}
                        source={require('../../image/filter_white.png')}
                    >
                    </Image>
                    <Text style={styles.txtHeader}>필터</Text>
                </View>
                <View style={styles.contentOutterWrapper}>
                    <ModalTitle text={'열람 기간'}></ModalTitle>
                    <View style={styles.filterItemWrapper}>
                        <FilterItem source={{name:searchLen, setter:setSearchLen,title:'당월',}}></FilterItem>
                        <FilterItem source={{name:searchLen, setter:setSearchLen,title:'1개월'}}></FilterItem>
                        <FilterItem source={{name:searchLen, setter:setSearchLen,title:'3개월'}}></FilterItem>
                        <FilterItem source={{name:searchLen, setter:setSearchLen,title:'6개월'}}></FilterItem>
                    </View>
                    <ModalTitle text={'구분'}></ModalTitle>
                    <View style={styles.filterItemWrapper}>
                        <FilterItem source={{name:searchType, setter:setSearchType,title:'전체'}}></FilterItem>
                        <FilterItem source={{name:searchType, setter:setSearchType,title:'수익'}}></FilterItem>
                        <FilterItem source={{name:searchType, setter:setSearchType,title:'지출'}}></FilterItem>
                    </View>
                    <View style={detailWrapper}>
                        <FilterItem source={{name:searchDetail, setter:setSearchDetail,title:'전체'}}></FilterItem>
                        <FilterItem source={{name:searchDetail, setter:setSearchDetail,title:'식재료비'}}></FilterItem>
                        <FilterItem source={{name:searchDetail, setter:setSearchDetail,title:'인건비'}}></FilterItem>
                        <FilterItem source={{name:searchDetail, setter:setSearchDetail,title:'고정비'}}></FilterItem>
                    </View>
                </View>
                <View style={styles.btnApplyWrapper}>
                        <Pressable style={styles.btnApply} onPress={handleApply}>
                            <Text style={{color:'white',}}>적용</Text>
                        </Pressable>
                    </View>
            </View>
        </View>
    );
}

export default FilterModal;

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
        backgroundColor:theme.torangGrey,
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        alignItems:'center',
        paddingLeft:20,
        flexDirection:'row',
    },
    txtHeader:{
        fontWeight:'bold',
        color:'white',
    },
    contentOutterWrapper:{
        width:'100%',
        flex:1,
        alignItems:'center',
    },
    calendarWrapper:{
        width:'90%',
        height:40,
        flexDirection:'row',
        alignItems:'center',
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
    btnSendWrapper:{
        width:160,
        height:40,
        backgroundColor:theme.torangYellow,
        borderRadius:15,
        marginBottom:30,
    },
    btnApplyWrapper:{
        width:160,
        height:40,
        backgroundColor:theme.torangGrey,
        marginBottom:40,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    btnApply:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    filterItemWrapper:{
        flexDirection:'row',
        height:72,
    }
});