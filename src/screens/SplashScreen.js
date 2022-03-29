import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
``
import { theme } from '../variables/color';
import { getItemAsyncStorage,fetchServer,login } from '../abstract/asyncTasks';


const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);

  let isAutoLogin = '';
  let isEmailSave = '';

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      Promise.all([
        getItemAsyncStorage('autoLogin'), getItemAsyncStorage('emailSave')])
        .then((retVal) => {
          isAutoLogin=retVal[0];
          isEmailSave=retVal[1];
          //자동 로그인
          if(isAutoLogin==='true'){
            const dataToSend={
              email:'',
              pw:''
            };
            Promise.all([getItemAsyncStorage('email'),getItemAsyncStorage('pw')]).then(info => {
              dataToSend.email=info[0];
              dataToSend.pw=info[1];
              fetchServer('POST', '/login/signin', dataToSend).then((responseJson) => {
                if (responseJson.retCode === '0') {
                    navigation.replace('MainBottomNavigator');
                } else {
                  navigation.replace('Auth');
                }
              }).catch((error) => {
                console.log(error);
                navigation.replace('Auth');
              });
            })
            //로그인에 대한 실패, 성공 분기
          //아이디 저장
          }else if(isEmailSave==='true'){
            //로그인에 대한 실패, 성공 분기
            console.log('emailSave...');
            getItemAsyncStorage('email').then(email => {
              navigation.replace('Auth',{email:email});
            });
          }else{
            console.log('not autologin, not emailsave')
            navigation.replace('Auth');
          }
        })      
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../image/logo.png')}
        style={{width: '60%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.loginCyan,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});