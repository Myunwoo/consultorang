import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Keyboard, Image } from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS,
} from '../variables/scales';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
  
import { theme } from '../variables/color';
import ModalTitle from '../components/ModalTitle';
import FilterItem from '../components/FilterItem';

//메모의 양을 제한하는 과정이 필요할 것 같음. 메모가 늘어남에 따라 뷰는 어떻게 되는지 확인해야 함.

const FilterModal = ({ showModal, setShowModal,}) => {
    const [memo, setMemo]=useState('');
    const [searchLen, setSearchLen]=useState(0);
    const [searchType, setSearchType]=useState(0);
    const [searchDetail, setSearchDetail]=useState(0);

    const handleOutsideClick=()=>{
        setShowModal(false);
    };

    const handleApply=()=>{

    };

    //type이 지출일경우, 스타일 면에서는 detail이 사라졌지만 서버에 데이터를 요청하는 경우엔 detail에 대한 조건이 필요합니다
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
                        <FilterItem source={{name:searchLen, setter:setSearchLen,title:'당월'}}></FilterItem>
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