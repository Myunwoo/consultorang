import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AccountBookNavigator from './bottomTabScreens/AccountBookNavigator';
import IncomeStatementScreen from './bottomTabScreens/IncomeStatementScreen';
import MenuCalculatorScreen from './bottomTabScreens/MenuCalculatorScreen';
import MenuEngineeringScreen from './bottomTabScreens/MenuEngineeringScreen';

import {BOTTOM_TAP_NAVIGATOR_HEIGHT_IOS, BOTTOM_TAP_NAVIGATOR_HEIGHT_ANDROID} from './variables/scales';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

const MainBottomNavigator = (props) => {
    return(
    <Tab.Navigator initialRouteName="AccountBook" screenOptions={{
        tabBarStyle: { 
            ...Platform.select({
                ios:{
                    height:BOTTOM_TAP_NAVIGATOR_HEIGHT_IOS,
                },
                android:{
                    height:BOTTOM_TAP_NAVIGATOR_HEIGHT_ANDROID,
                }
            })
        },
    }}>
            <Tab.Screen name="AccountBook" component={AccountBookNavigator} options={{headerShown:false}}/>
            <Tab.Screen name="IncomeStatement" component={IncomeStatementScreen} options={{headerShown:false}}/>
            <Tab.Screen name="MenuCalculator" component={MenuCalculatorScreen} options={{headerShown:false}}/>
            <Tab.Screen name="MenuEngineering" component={MenuEngineeringScreen} options={{headerShown:false}}/>
        </Tab.Navigator>
    );
}

export default MainBottomNavigator;