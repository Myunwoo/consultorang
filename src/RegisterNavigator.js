import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AuthInfoRegisterScreen from './registerNavigationScreen/AuthInfoRegisterScreen';
import FoodInfoRegisterScreen from './registerNavigationScreen/FoodInfoRegisterScreen';
import TermScreen from './registerNavigationScreen/TermScreen';

const Tab = createStackNavigator();

const RegisterNavigator = (props) => {
    //for Navigator
    const [errortext, setErrorText] = useState('');
    const [loading, setLoading] = useState(false);

    return (

        <Tab.Navigator initialRouteName='AuthInfoRegisterScreen' screenOptions={{tabBarShowLabel:false,}}>
            <Tab.Screen name="AuthInfoRegisterScreen" component={AuthInfoRegisterScreen}  options={{headerShown:false}} />
            <Tab.Screen name="TermScreen" component={TermScreen}  options={{headerShown:false}} />
            <Tab.Screen name="FoodInfoRegisterScreen" component={FoodInfoRegisterScreen}  options={{headerShown:false}} />
        </Tab.Navigator>
    );
};

export default RegisterNavigator;