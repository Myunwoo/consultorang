import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AuthInfoRegisterScreen from './registerNavigationScreen/AuthInfoRegisterScreen';
import FoodInfoRegisterScreen from './registerNavigationScreen/FoodInfoRegisterScreen';

import {fetchServer} from './abstract/asyncTasks';

const Tab = createStackNavigator();

const RegisterTopNavigator = (props) => {
    //for AuthInfoRegisterScreen
    let businessName;
    let email;
    let pw;
    let phone;
    let serviceYn;
    let businessNum;
    const setAuthInfo = (_businessName, _email, _pw, _phone, _serviceYn, _businessNum) => {
        businessName=_businessName;
        email=_email;
        pw=_pw;
        phone=_phone;
        serviceYn=_serviceYn;
        businessNum=_businessNum;
    }

    //for FoodInfoRegisterScreen
    let businessType;
    let businessIngre;
    let businessCookway;
    let businessAlcohol;
    let businessAlready;
    let businessStaff;
    let businessHours;
    const setFoodInfo = (_businessType, _businessIngre, _businessCookway, _businessAlcohol, _businessAlready, _businessStaff, _businessHours) => {
        businessType=_businessType;
        businessIngre=_businessIngre;
        businessCookway=_businessCookway;
        businessAlcohol=_businessAlcohol;
        businessAlready=_businessAlready;
        businessStaff=_businessStaff;
        businessHours=_businessHours;
        check();
    }

    const check=()=>{
        const dataToSend={
            "email": email,
            "pw": pw,
            "phone": phone,
            "serviceYn": serviceYn,
            "businessNum": businessNum,
            "businessName": businessName,
            "businessType": businessType,
            "businessIngre": businessIngre,
            "businessCookway": businessCookway,
            "businessAlcohol": businessAlcohol,
            "businessAlready": businessAlready,
            "businessStaff": businessStaff,
            "businessHours": businessHours
        }

        fetchServer('POST', '/login/signup', dataToSend).then((responseJson) => {
            setLoading(false);
            //로그인 성공
            if (responseJson.retCode === '0') {
                console.log(responseJson);
            } else {
                console.log(responseJson);
            }
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }

    //for Navigator
    const [errortext, setErrorText] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRegisterSuccess, setIsRegistraionSuccess] = useState(false);

    return (
        <Tab.Navigator
            initialRouteName='AuthInfoRegisterScreen'
            screenOptions={{
                tabBarShowLabel:false,
            }}
        >
            <Tab.Screen name="AuthInfoRegisterScreen" component={AuthInfoRegisterScreen}  options={{headerShown:false}} initialParams={{setAuthInfo}}/>
            <Tab.Screen name="FoodInfoRegisterScreen" component={FoodInfoRegisterScreen}  options={{headerShown:false}} initialParams={{setFoodInfo}}/>
        </Tab.Navigator>
    );
};

export default RegisterTopNavigator;