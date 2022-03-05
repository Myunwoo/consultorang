import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AccountBookScreen from './AccountBookScreen';
import HistoryScreen from './HistoryScreen';

const Tab = createStackNavigator();

const AccountBookNavigator = (props) => {
    return (

        <Tab.Navigator initialRouteName='AccountBookScreen' screenOptions={{tabBarShowLabel:false,}}>
            <Tab.Screen name="AccountBookScreen" component={AccountBookScreen}  options={{headerShown:false}} />
            <Tab.Screen name="HistoryScreen" component={HistoryScreen}  options={{headerShown:false}} />
        </Tab.Navigator>
    );
};

export default AccountBookNavigator;