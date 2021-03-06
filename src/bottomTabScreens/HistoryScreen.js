import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { fetchServer,getItemAsyncStorage } from '../abstract/asyncTasks';

import { theme } from '../variables/color';
import {
    SCREEN_HEIGHT, 
} from '../variables/scales';
import {dateObject} from '../variables/scales';
import commonStyles from '../variables/commonStyles';
import ModalComponent from '../modals/ModalComponent';
import FilterModal from '../modals/FilterModal';
import IncomeAndSales from '../components/IncomeAndSales';
import WeatherHeader from '../components/WeatherHeader';

const getDefaultEndYmd=()=>{
    const d=new Date();
    const year=d.getFullYear();;
    const month=d.getMonth()+1;
    const yyyymmdd=`${year}${month >= 10 ? month : '0' + month}01`;
    return yyyymmdd;
};

const HistoryScreen = (({navigation}) => {
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
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={commonStyles.mainbody}>
            <ModalComponent key={i++} showModal={filterVisible} setShowModal={setFilterVisible}>
                <FilterModal setSendObj={setSendObj} showModal={filterVisible} setShowModal={setFilterVisible}></FilterModal>
            </ModalComponent>
            <WeatherHeader></WeatherHeader>
            <View style={commonStyles.contentSection}>
                <View style={commonStyles.titleWrapper}>
                    <Text style={commonStyles.txtTitle}>?????? ?????????</Text>
                </View>       
                <View style={{width:50, height:50, backgroundColor:theme.titleWrapperBlue, position:'absolute', top:30, left:0, zIndex:1}}></View>
                <View style={commonStyles.contentWrapper}>
                    <View style={styles.historyHeaderWrapper}>
                        <View style={styles.dateWrapper}>
                            <Text style={{fontSize:20,}}>{`${sendObj.startYmd}?? ~ ${sendObj.endYmd}`}</Text>
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
                    ? <View style={{flex:1, width:'100%', justifyContent:'center', alignItems:'center',}}><Text>??????????????? ????????????.</Text></View>
                    : <ScrollView style={styles.historyContentWrapper}>
                            {historyArr.map(history=>
                                <View style={styles.historyCompWrapper}>
                                    <IncomeAndSales source={history}></IncomeAndSales>
                                </View>
                            )}
                        </ScrollView>}
                </View>
            </View>
        </LinearGradient>
    );
});

export default HistoryScreen;

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
        flex:1,
        width:'100%',
    },
    historyCompWrapper:{
        width:'100%',
        height:55,
        marginVertical:4,
    },
});