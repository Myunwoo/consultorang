import React, {useEffect,useState} from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '../variables/color';
import { fetchServer, getItemAsyncStorage } from '../abstract/asyncTasks';

const SettingUserInfo = ({navigation}) => {
    const [userId, setUserId]=useState(0);
    const [userData, setUserData]=useState({});

    useEffect(() => {
        getItemAsyncStorage('userId').then(res=>{
            setUserId(res);
        }).catch(error=>{
            console.log(error);
        })
    },[]);

    // businessAlready": 50,
    // "businessCookway": "HC002,HC003",
    // "businessEnd": 19,
    // "businessHoliday": Array [
    //   "목",
    //   "일",
    //   "공휴일",
    // ],
    // "businessIngre": "IG001",
    // "businessName": "테스트가게1",
    // "businessNum": "123123231",
    // "businessSize": "BS001",
    // "businessStaff": 11,
    // "businessStart": 6,
    // "businessType": "ST001",
    // "email": "test@naver.com",
    // "phone": "01030559428",
    // "pw": "abc12345!",
    // "serviceYn": "Y",
    // "token": "",
    // "userId": 49,

    useEffect(()=>{
        const dataToSend={userId,};

        fetchServer("POST", "/login/getUserInfo", dataToSend)
            .then((responseJson) => {
                console.log(responseJson.data);
                setUserData(responseJson.data);
              if (responseJson.data !== null) {
                console.log(responseJson.data);
              }
            })
            .catch((error) => {
              //console.log(error);
            });
    },[userId])

    return (
        <View style={styles.mainbody}>
            <Text>{JSON.stringify(userData)}</Text>
        </View>
    );
}

export default SettingUserInfo;

const styles = StyleSheet.create({
    mainbody:{
        width:'100%',
        flex:1,
    },
});