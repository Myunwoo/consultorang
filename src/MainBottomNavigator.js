import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AccountBookScreen from './bottomTabScreens/AccountBookScreen';
import IncomeStatementScreen from './bottomTabScreens/IncomeStatementScreen';
import MenuCalculatorScreen from './bottomTabScreens/MenuCalculatorScreen';
import MenuEngineeringScreen from './bottomTabScreens/MenuEngineeringScreen';
import ExcelSendScreen from './registerNavigationScreen/ExcelSendScreen';

const Tab = createBottomTabNavigator();

const MainBottomNavigator = (props) => {
    return(
        <Tab.Navigator initialRouteName="AccountBookScreen" >
            <Tab.Screen name="AccountBookScreen" component={AccountBookScreen} options={{headerShown:false}}/>
            <Tab.Screen name="IncomeStatementScreen" component={IncomeStatementScreen} options={{headerShown:false}}/>
            <Tab.Screen name="MenuCalculatorScreen" component={MenuCalculatorScreen} options={{headerShown:false}}/>
            <Tab.Screen name="ExcelSendScreen" component={ExcelSendScreen} options={{headerShown:false}}/>
            <Tab.Screen name="MenuEngineeringScreen" component={MenuEngineeringScreen} options={{headerShown:false}}/>
        </Tab.Navigator>
    );
}

export default MainBottomNavigator;