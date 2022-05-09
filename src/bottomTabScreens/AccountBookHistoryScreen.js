import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';

import { fetchServer,getItemAsyncStorage } from '../abstract/asyncTasks';
import {parsingDate} from '../abstract/commonTasks';

import { theme } from '../variables/color';
import {
    BASIC_SHADOW,
    CONTENT_SECTION_BORDER_RADIUS,
    SCREEN_HEIGHT, 
} from '../variables/scales';
import {dateObject} from '../variables/scales';
import commonStyles from '../variables/commonStyles';
import ModalComponent from '../modals/ModalComponent';
import FilterModal from '../modals/FilterModal';
import HistoryIncomeSale from '../components/HistoryIncomeSale';
import HistoryMemo from '../components/HistoryMemo';

const getDefaultEndYmd=()=>{
    const d=new Date();
    const year=d.getFullYear();;
    const month=d.getMonth()+1;
    const yyyymmdd=`${year}${month >= 10 ? month : '0' + month}01`;
    return yyyymmdd;
};

const AccountBookHistoryScreen = (({navigation}) => {
    const {year, month, date, dateString, yyyymmdd}=dateObject();
    const [filterVisible, setFilterVisible]=useState(false);
    const [historyArr, setHistoryArr]=useState([]);
    const [sendObj, setSendObj]=useState({
        userId:'',
        'startYmd':getDefaultEndYmd(),
        'endYmd':yyyymmdd,
        'historyType':'',
        'specificType':'',
    });

    useEffect(()=>{
        getItemAsyncStorage('userId').then(res=>{
            setSendObj((prevState)=>{
                return {...prevState, userId:res}
            });
        })
    },[]);

    useEffect(()=>{
        if(sendObj.userId==='') return;
        fetchServer('POST', '/account/getTotalHistoryList', sendObj).then((responseJson) => {
            if(responseJson.data!==null){
                setHistoryArr(responseJson.data);
            }else{
                setHistoryArr([]);
            }
        }).catch((error) => {
            console.log(error);
        });
    },[sendObj]);

    let i=0;
    return (
        <View style={commonStyles.contentWrapper}>
            <ModalComponent key={i++} showModal={filterVisible} setShowModal={setFilterVisible}>
                <FilterModal setSendObj={setSendObj} showModal={filterVisible} setShowModal={setFilterVisible}></FilterModal>
            </ModalComponent>
            <View style={styles.historyHeaderWrapper}>
                <View style={styles.dateWrapper}>
                    <Text style={{fontWeight:'bold', fontSize:24, marginRight:8,}}>{`${month}월`}</Text>
                    <Text style={{fontSize:18, color:theme.dateCheckedGrey, opacity:0.8, alignSelf:'flex-end'}}>{`(${parsingDate(sendObj.startYmd)} - ${parsingDate(sendObj.endYmd)})`}</Text>
                </View>
                <Pressable onPress={()=>setFilterVisible(true)} style={{width:52, height:52,justifyContent:'center', alignItems:'center'}}>
                    <Image
                        resizeMode='contain'
                        style={{width:'50%', height:'50%',}}
                        source={require('../../image/filter_black.png')}
                    >
                    </Image>
                </Pressable>
            </View>
            {historyArr.length===0 
            ? <View style={{flex:1, width:'100%', justifyContent:'center', alignItems:'center',}}><Text>히스토리가 없습니다.</Text></View>
            : <ScrollView style={styles.historyContentWrapper}>
                    {historyArr.map(history=>{
                            const {historyType}=history;
                            if(historyType==='MEMO') return <View style={styles.memoHistoryCompWrapper}><HistoryMemo source={history}></HistoryMemo></View>
                            else return (<View style={styles.historyCompWrapper}><HistoryIncomeSale source={history}></HistoryIncomeSale></View>);
                        }
                    )}
                </ScrollView>}
        </View>
    );
});

export default AccountBookHistoryScreen;

const styles=StyleSheet.create({
    historyHeaderWrapper:{
        width:'100%',
        height:52,
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:'5%',
        flexDirection:'row',
        marginTop:15,
    },
    historyContentWrapper:{
        backgroundColor:'white',
        flex:1,
        width:'95%',
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        ...Platform.select({
            ios: {
              shadowColor: "rgb(50, 50, 50)",
              shadowOpacity: 0.5,
              shadowRadius: 10,
              shadowOffset: {
                height: -10,
                width: 0,
              },
            },
            android: {
              elevation: 4,
            },
        })
    },
    historyCompWrapper:{
        width:'100%',
        height:55,
        marginVertical:4,
    },
    memoHistoryCompWrapper:{
        width:'100%',
        marginVertical:4,
    },
    dateWrapper:{
        flexDirection:'row',
        alignItems:'center',
    }
});