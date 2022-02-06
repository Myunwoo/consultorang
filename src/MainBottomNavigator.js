import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AccountBookScreen from './bottomTabScreens/AccountBookScreen';
import IncomeStatementScreen from './bottomTabScreens/IncomeStatementScreen';
import MenuCalculatorScreen from './bottomTabScreens/MenuCalculatorScreen';
import MenuEngineeringScreen from './bottomTabScreens/MenuEngineeringScreen';

const Tab = createBottomTabNavigator();

const MainBottomNavigator = (props) => {
    return(
        <Tab.Navigator initialRouteName="AccountBookScreen">
            <Tab.Screen name="AccountBookScreen" component={AccountBookScreen} />
            <Tab.Screen name="IncomeStatementScreen" component={IncomeStatementScreen} />
            <Tab.Screen name="MenuCalculatorScreen" component={MenuCalculatorScreen} />
            <Tab.Screen name="MenuEngineeringScreen" component={MenuEngineeringScreen} options={{headerShown:false}}/>
        </Tab.Navigator>
    );
}

export default MainBottomNavigator;