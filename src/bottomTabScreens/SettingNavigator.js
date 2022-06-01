import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import SettingScreen from './SettingScreen';
import SettingUserInfo from './SettingUserInfo';

const Stack = createStackNavigator();

const SettingNavigator = (props) => {
    return(
        <Stack.Navigator initialRouteName="SettingScreen">
            <Stack.Screen name="SettingScreen" component={SettingScreen} options={{headerShown:false}}/>
            <Stack.Screen name="SettingUserInfo" component={SettingUserInfo} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}

export default SettingNavigator;