<<<<<<< HEAD
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { fetchServer } from '../abstract/asyncTasks';

import { theme } from '../variables/color';
import {
=======
import React,{useState} from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LinearGradient} from 'expo-linear-gradient';

import { theme } from '../variables/color';
import {
    CONTENT_SECTION_BORDER_RADIUS,
    BASIC_SHADOW,
    SCREEN_WIDTH,
>>>>>>> master
    SCREEN_HEIGHT, 
} from '../variables/scales';
import {dateObject} from '../variables/scales';

import commonStyles from '../variables/commonStyles';
<<<<<<< HEAD

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
    const {year, month, date, dateString, yyyymmdd}=dateObject();
    const [filterVisible, setFilterVisible]=useState(false);
    const [historyArr, setHistoryArr]=useState([]);
    // const [sendObj, setSendObj]=useState({
    //     'userId':27,
    //     'startYmd':getDefaultEndYmd(),
    //     'endYmd':yyyymmdd,
    //     'historyType':'',
    //     'specificType':'',
    // });
    const [sendObj, setSendObj]=useState({
        'userId':27,
        'startYmd':'20211201',
        'endYmd':'20211231',
        'historyType':'',
        'specificType':'',
    });

    useEffect(()=>{
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
=======
import WeatherComponent from '../components/WeatherComponent';

import ModalComponent from '../modals/ModalComponent';
import FilterModal from '../modals/FilterModal';

const HistoryScreen = (({navigation}) => {
    const {month, date, dateString}=dateObject();
    const [filterVisible, setFilterVisible]=useState(false);
    let i=0;

    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={commonStyles.mainbody}>
            <ModalComponent key={i++} showModal={filterVisible} setShowModal={setFilterVisible}>
                <FilterModal showModal={filterVisible} setShowModal={setFilterVisible}></FilterModal>
            </ModalComponent>
            <View style={commonStyles.headerSection}>
                <View style={commonStyles.dateSection}>
                    <View style={commonStyles.dateWrapper}>
                        <Text style={{fontSize:12,color:'white',}}>Today</Text>
                        <Text style={{fontSize:16,color:'white',}}>{`${month}/${date}`}</Text>
                    </View>
                    <View style={commonStyles.dayWrapper}>
                        <Text style={{fontWeight:'bold',fontSize:20,color:theme.engineeringYellow,}}>{dateString}</Text>
                    </View>
                </View>
                <View style={commonStyles.weatherImgWrapper}>
                    <WeatherComponent 
                        key={i++} source={{size:(SCREEN_HEIGHT*0.06) > 60 ? 60 : (SCREEN_HEIGHT*0.06)}}>    
                    </WeatherComponent>
                </View>
            </View>
>>>>>>> master
            <View style={commonStyles.contentSection}>
                <View style={commonStyles.titleWrapper}>
                    <Text style={commonStyles.txtTitle}>월간 가계부</Text>
                </View>       
                <View style={{width:50, height:50, backgroundColor:theme.titleWrapperBlue, position:'absolute', top:30, left:0, zIndex:1}}></View>
                <View style={commonStyles.contentWrapper}>
                    <View style={styles.historyHeaderWrapper}>
                        <View style={styles.dateWrapper}>
                            <Text style={{fontSize:20,}}>{`${month}월`}</Text>
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
                    <ScrollView style={styles.historyContentWrapper}>
<<<<<<< HEAD
                        {historyArr.map(history=>
                            <View style={styles.historyCompWrapper}>
                                <IncomeAndSales source={history}></IncomeAndSales>
                            </View>
                        )}
=======

>>>>>>> master
                    </ScrollView>
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
    },
    historyContentWrapper:{
        flex:1,
        width:'100%',
<<<<<<< HEAD
    },
    historyCompWrapper:{
        width:'100%',
        height:55,
        marginVertical:4,
    },
=======
    }
>>>>>>> master
});