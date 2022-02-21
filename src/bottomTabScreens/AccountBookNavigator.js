import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import AccountBookScreen from './AccountBookScreen';
import IncomeScreen from './IncomeScreen';
import ExpenditureScreen from './ExpenditureScreen';
import ExcelSendScreen from '../registerNavigationScreen/ExcelSendScreen';

const Stack = createStackNavigator();

const AccountBookNavigator = (props) => {
    return(
        <Stack.Navigator initialRouteName="AccountBookScreen">
            <Stack.Screen name="AccountBookScreen" component={AccountBookScreen} options={{headerShown:false}}/>
            <Stack.Screen name="ExcelSendScreen" component={ExcelSendScreen} options={{headerShown:false}}/>
            <Stack.Screen name="IncomeScreen" component={IncomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name="ExpenditureScreen" component={ExpenditureScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}

export default AccountBookNavigator;