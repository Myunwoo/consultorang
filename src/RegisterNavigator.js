import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AuthInfoRegisterScreen from './registerNavigationScreen/AuthInfoRegisterScreen';
import FoodInfoRegisterScreen from './registerNavigationScreen/FoodInfoRegisterScreen';

const Tab = createStackNavigator();

const RegisterTopNavigator = (props) => {
    ////여기서 useState를 감싸는 함수들 만들어서 각 페이지로 전달, 값들은 모든 페이지의 값입력이 종료된 후 한 번에 보내기
    const [businessName, setBusinessName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [authorNum, setAuthorNum] = useState('');
    const [businessNum, setBusinessNum] = useState('');
    const [businessCode, setBusinessCode] = useState('1');
    const [userAgree, setUserAgree] = useState(false);
    const [errortext, setErrorText] = useState('');
    const [loading, setLoading] = useState(false);
    const [term, setTerm] = useState('');
    const [isRegisterSuccess, setIsRegistraionSuccess] = useState(false);

    return (
        <Tab.Navigator
            initialRouteName='AuthInfoRegisterScreen'
            screenOptions={{
                tabBarShowLabel:false,
            }}
            //swipeEnabled={false}
        >
            <Tab.Screen name="AuthInfoRegisterScreen" component={AuthInfoRegisterScreen}  options={{headerShown:false}}/>
            <Tab.Screen name="FoodInfoRegisterScreen" component={FoodInfoRegisterScreen}  options={{headerShown:false}}/>
        </Tab.Navigator>
    );
};

export default RegisterTopNavigator;