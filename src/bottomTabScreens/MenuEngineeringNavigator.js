import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import MenuEngineeringScreen from './MenuEngineeringScreen';
import MenuEngineeringInfoScreen from './MenuEngineeringInfoScreen';

const Stack = createStackNavigator();

const MenuEngineeringNavigator = (props) => {
    return(
        <Stack.Navigator initialRouteName="MenuEngineeringScreen">
            <Stack.Screen name="MenuEngineeringScreen" component={MenuEngineeringScreen} options={{headerShown:false}}/>
            <Stack.Screen name="MenuEngineeringInfoScreen" component={MenuEngineeringInfoScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}

export default MenuEngineeringNavigator;