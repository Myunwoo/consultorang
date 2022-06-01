import React from 'react';
import {Image} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AccountBookScreen from './bottomTabScreens/AccountBookScreen';
import MenuEngineeringNavigator from './bottomTabScreens/MenuEngineeringNavigator';
import IncomeStatementScreen from './bottomTabScreens/IncomeStatementScreen';
import MenuCalculatorNavigator from './bottomTabScreens/MenuCalculatorNavigator';
import SettingNavigator from './bottomTabScreens/SettingNavigator';

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
            <Tab.Screen name="AccountBook" component={AccountBookScreen} options={{headerShown:false, title:'가계부', 
                tabBarIcon:({focused})=>{
                    return (
                        <Image style={{width:24, height:24,}} source={focused?require('../image/bottomNav_pig_f.png'):require('../image/bottomNav_pig.png')}></Image>
                    );
                }
            }}/>
            <Tab.Screen name="IncomeStatement" component={IncomeStatementScreen} options={{headerShown:false, title:'손익분석', 
                tabBarIcon:({focused})=>{
                    return (
                        <Image style={{width:24, height:24,}} source={focused?require('../image/bottomNav_income_f.png'):require('../image/bottomNav_income.png')}></Image>
                    );
                }
            }}/>
            <Tab.Screen name="MenuCalculator" component={MenuCalculatorNavigator} options={{headerShown:false, title:'계산기', 
                tabBarIcon:({focused})=>{
                    return (
                        <Image style={{width:24, height:24,}} source={focused?require('../image/bottomNav_calc_f.png'):require('../image/bottomNav_calc.png')}></Image>
                    );
                }
            }}/>
            <Tab.Screen name="MenuEngineering" component={MenuEngineeringNavigator} options={{headerShown:false, title:'메뉴관리', 
                tabBarIcon:({focused})=>{
                    return (
                        <Image style={{width:24, height:24,}} source={focused?require('../image/bottomNav_menuEng_f.png'):require('../image/bottomNav_menuEng.png')}></Image>
                    );
                }
            }}/>
            <Tab.Screen name="Setting" component={SettingNavigator} options={{headerShown:false, title:'설정', 
                tabBarIcon:({focused})=>{
                    return (
                        <Image style={{width:24, height:24,}} source={focused?require('../image/bottomNav_setting_f.png'):require('../image/bottomNav_setting.png')}></Image>
                    );
                }
            }}/>
        </Tab.Navigator>
    );
}

export default MainBottomNavigator;