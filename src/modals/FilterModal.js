import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Keyboard, Image } from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS,
} from '../variables/scales';
  
import {dateObject} from '../variables/scales';
import { theme } from '../variables/color';
import {EXPEND_TYPE_LIST} from '../variables/codelist';
import ModalTitle from '../components/ModalTitle';
import FilterItem from '../components/FilterItem';

const getCurYmd=()=>{
    const d=new Date();
    const year=d.getFullYear();;
    const month=d.getMonth()+1;
    const yyyymmdd=`${year}${month >= 10 ? month : '0' + month}01`;
    return yyyymmdd;
};

const getOneYmd=()=>{
    const d=new Date();
    const year=d.getFullYear();
    const month=d.getMonth()===0?12:d.getMonth();
    const date=d.getDate();
    const yyyymmdd=`${year}${month >= 10 ? month : '0' + month}${date >= 10 ? date : '0' + date}`;
    return yyyymmdd;
};

const getThreeYmd=()=>{
    const c=new Date();
    const year=c.getFullYear();;
    const month=c.getMonth()-3;
    const date=c.getDate();

    const target=new Date(year, month, date);
    const y=target.getFullYear();;
    const m=target.getMonth()+1;
    const d=target.getDate();
    const yyyymmdd=`${y}${m >= 10 ? m : '0' + m}${d >= 10 ? d : '0' + d}`;
    return yyyymmdd;
};


const FilterModal = ({ showModal, setShowModal, setSendObj}) => {
    const {year, month, date, dateString, yyyymmdd}=dateObject();
    const [searchLen, setSearchLen]=useState('');
    const [searchType, setSearchType]=useState('');
    const [searchDetail, setSearchDetail]=useState('');

    const handleOutsideClick=()=>{
        setShowModal(false);
    };

    const getSearchLen=()=>{
        if(searchLen==='' || searchLen==='당월'){
            return getCurYmd();
        }else if(searchLen==='1개월'){
            return getOneYmd();
        }else if(searchLen==='3개월'){
            return getThreeYmd();
        }else if(searchLen==='직접입력'){
            //아직 미구현
            return getCurYmd();
        }
        return getCurYmd();
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
            'userId':27,
            'startYmd':getSearchLen(),
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
        <Pressable style={styles.outside} onPress={handleOutsideClick}>
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
                        <FilterItem source={{name:searchLen, setter:setSearchLen,title:'직접입력'}}></FilterItem>
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
        </Pressable>
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