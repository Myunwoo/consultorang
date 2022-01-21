import { StyleSheet } from 'react-native';

import 'react-native-gesture-handler';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//import Screens
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import EmailFindScreen from './src/screens/EmailFindScreen';
import PasswordFindScreen from './src/screens/PasswordFindScreen';
import KindSelectPage from './src/screens/KindSelectPage';
import TermsShowPage from './src/screens/TermsShowPage';

import MainBottomNavigator from './src/MainBottomNavigator';

const Stack = createStackNavigator();

const Auth = ({route,navigation}) => {
  let initialEmail='';
  if(route.params){
    if('email' in route.params){
      initialEmail=route.params.email;
    }
  }
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen}
        options={{headerShown:false}}
        initialParams={{email:initialEmail}}
      />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen}
        options={{
          title:'회원가입',
          headerShown:false,
        }}
      />
      <Stack.Screen name="EmailFindScreen" component={EmailFindScreen}
        options={{
          headerShown:true,
        }}
      />
      <Stack.Screen name="PasswordFindScreen" component={PasswordFindScreen}
        option={{
          headerShown:true,
        }}
      />
      <Stack.Screen name="KindSelectPage" component={KindSelectPage}
        option={{
          headerShown:true,
        }}
      />
      <Stack.Screen name="TermsShowPage" component={TermsShowPage}
        option={{
          headerShown:true,
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainBottomNavigator"
          component={MainBottomNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}