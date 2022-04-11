import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '../variables/color';
import { checkEmailFormat, checkPwdFormat } from '../abstract/commonTasks';
import { getItemAsyncStorage,fetchServer, saveUserData, AsyncStorageClear } from '../abstract/asyncTasks';

const LoginScreen = (({route,navigation}) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [autoLogin, setAutoLogin] = useState(false);
    const [emailSave, setEmailSave] = useState(false);
    const [errorText, setErrorText] = useState('');

    useEffect(()=>{
        if('email' in route.params && route.params.email !== ''){
            setUserEmail(route.params.email);
            setEmailSave(true);
        }
    },[]);
    
    let autoLoginProps = {
        onPress:() => autoLoginClicked(),
        style: [styles.txtMemorialLogin, {color: autoLogin?theme.textGreen:theme.loginBlue}],
    };

    let emailSaveProps = {
        onPress: () => emailSaveClicked(),
        style: [styles.txtMemorialLogin, {color: emailSave?theme.textGreen:theme.loginBlue}],
    };

    const autoLoginClicked = () => {
        if(emailSave){
            setEmailSave(false);
        }
        setAutoLogin(!autoLogin);
    }

    const emailSaveClicked = () => {
        if(autoLogin){
            setAutoLogin(false);
        }
        setEmailSave(!emailSave);
    }

    const handleSubmitPress = () => {
        setErrorText('');
        if(!checkEmailFormat(userEmail)){
            alert("올바른 이메일을 입력해주세요.");
            return
        }
        if(!checkPwdFormat(userPassword)){
            alert("올바른 비밀번호를 입력해주세요.");
            return
        }
        setLoading(true);
        const dataToSend={
            email:userEmail,
            pw:userPassword
        };
        
        fetchServer('POST', '/login/signin', dataToSend).then((responseJson) => {
            setLoading(false);
            //로그인 성공
            if (responseJson.retCode === '0') {
                try{
                    saveUserData(responseJson.data);
                    //로그인 성공 시, 자동로그인 혹은 아이디저장 여부를 함께 저장해 주도록.
                    AsyncStorage.setItem('autoLogin', String(autoLogin));
                    AsyncStorage.setItem('emailSave', String(emailSave));
                }catch(e){
                    console.log(e);
                }finally{
                    //홈 화면 네비게이션으로 전환
                    navigation.replace('MainBottomNavigator');
                }
            } else {
                setErrorText(responseJson.errMsg);
                alert(errorText);
            }
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });

        //getItemAsyncStorage('userEmail').then(res=>console.log(res));
    };

    return (
        <View style={styles.mainbody}>
            <View style={styles.loginSection}>
                <Image style={styles.topLogo} source={require('../../image/logo.png')} resizeMode='contain'/>
                <Pressable style={styles.registerOuterWrapper} onPress={() => navigation.navigate('RegisterNavigator')}>
                    <View style={styles.registerInnerWrapper}>
                        <Text
                            style={styles.txtRegister}>
                            컨설토랑 무료 회원가입
                        </Text>  
                    </View>
                </Pressable>
                <View style={styles.loginInputSection}>
                    <View style={styles.loginInputSectionColumn1}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                                placeholder="ID"
                                placeholderTextColor={theme.placeholderColor}
                                keyboardType="default"
                                //ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                                defaultValue={userEmail}
                            />
                        </View>    
                        <View style={styles.inputWrapper}>
                            <TextInput
                               style={styles.inputStyle}
                                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                                placeholder="PASSWORD"
                                placeholderTextColor={theme.placeholderColor}
                                keyboardType="default"
                                //ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                            />
                        </View>                 
                        <Pressable style={styles.memorialLoginRow}>
                            <Text {...autoLoginProps}>자동 로그인</Text>
                            <Text {...emailSaveProps}>아이디 저장</Text>
                        </Pressable>
                    </View>
                    <View style={styles.loginInputSectionColumn2}>
                        <Pressable style={({pressed}) => [
                            {backgroundColor:pressed? theme.checkedBlue : theme.registerBtnCyan},styles.btnLogin]}
                            onPress={handleSubmitPress}>
                            <Text style={styles.txtLogin}>로그인</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.findSection}>
                <Pressable style={styles.btnFind} onPress={() => navigation.navigate('EmailFindScreen')}>
                    <Text style={styles.txtFind}>아이디를 잊으셨나요?</Text>
                </Pressable>
                <Pressable style={styles.btnFind} onPress={() => navigation.navigate('PasswordFindScreen')}>
                    <Text style={styles.txtFind}>비밀번호를 잊으셨나요?</Text>
                </Pressable>
            </View>
        </View>
    );
});

export default LoginScreen;

const styles = StyleSheet.create({
    mainbody:{
        flex:1,
        backgroundColor: theme.loginBlue,
    },
    topLogo:{
        marginTop:'auto',
        width:'50%',
        height:'15%',
    },
    registerOuterWrapper:{
        width:'90%',
        height:'12%',
        marginTop:40,
        backgroundColor:theme.registerBtnBlue,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
    },
    registerInnerWrapper:{
        width:'65%',
        height:'40%',
        borderRadius:20,
        backgroundColor:theme.registerBtnCyan,
        justifyContent:'center',
        alignItems:'center',
    },
    txtRegister:{
        fontWeight:'bold',
        letterSpacing:1,
    },
    loginSection:{
        flex:3,
        backgroundColor: theme.loginCyan,
        borderBottomStartRadius: 60,
        borderBottomEndRadius: 60,
        alignItems:'center',
    },
    loginInputSection:{
        width:'100%',
        height:'40%',
        flexDirection:'row',
        marginTop:35,
    },
    loginInputSectionColumn1:{
        flex:7,
        justifyContent:'center',
        alignItems:'center',
    },
    loginInputSectionColumn2:{
        flex:3,
        justifyContent:'center',
        alignItems:'center',
    },
    memorialLoginRow:{
        width:'80%',
        flexDirection:'row',
        justifyContent:'space-around',
    },
    inputWrapper:{
        width:'80%',
        height:23,
        marginBottom:5,
        backgroundColor:theme.inputBackground1,
        borderRadius:8,
        paddingLeft:10,
        justifyContent:'center',
    },
    inputStyle:{
        
    },
    btnLogin:{
        //backgroundColor:theme.btnBackground1,
        maxWidth:100,
        minWidth:80,
        maxHeight:100,
        minHeight:80,
        borderRadius:10000,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    txtLogin:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:17,
    },
    txtMemorialLogin:{
        fontWeight:'bold',
    },
    findSection:{
        flex:1,
        alignItems: 'center',   
    },
    btnFind:{
        marginTop:10,
    },
    txtFind:{
        color:theme.textWhite,
        textDecorationLine:'underline',
        textDecorationColor:theme.textWhite,
    },
});