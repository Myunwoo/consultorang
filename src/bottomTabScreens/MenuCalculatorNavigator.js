import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import MenuCalculatorScreen from './MenuCalculatorScreen';
import MenuCalculatorCalcScreen from './MenuCalculatorCalcScreen';
import MenuCalculatorResultScreen from './MenuCalculatorResultScreen';
import MenuCalculatorHistory from './MenuCalculatorHistory';

const Stack = createStackNavigator();

const MenuCalculatorNavigator = (props) => {
    return(
        <Stack.Navigator initialRouteName="MenuCalculatorScreen">
            <Stack.Screen name="MenuCalculatorScreen" component={MenuCalculatorScreen} options={{headerShown:false}}/>
            <Stack.Screen name="MenuCalculatorCalcScreen" component={MenuCalculatorCalcScreen} options={{headerShown:false}}/>
            <Stack.Screen name="MenuCalculatorResultScreen" component={MenuCalculatorResultScreen} options={{headerShown:false}}/>
            <Stack.Screen name="MenuCalculatorHistory" component={MenuCalculatorHistory} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}

export default MenuCalculatorNavigator;