import React, {useState, useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    ScrollView,
  } from 'react-native';
  
import { theme } from '../variables/color';
import {CODE_LIST} from '../variables/codelist';
import {statusBarHeight} from '../variables/scales';
import {serviceTerm, userInfoTerm, infoAgreeTerm} from '../variables/termsOfUse';
import { fetchServer } from '../abstract/asyncTasks';
import { isEmailRight, isPasswordRight } from '../abstract/commonTasks';
  
//import components
import CodeImageCard from '../components/CodeImageCard';
import RegisterInput from '../components/RegisterInput';

const handleCheckEmailButton = () => {
    console.log('handleCheckEmailButton');
    fetchServer('POST','/login/checkEmail',{email:userEmail})
        .then((responseJson) => console.log(responseJson))
        .catch(error => console.log(error));
};

const handleSubmitButton = () => {
    // setErrorText('');
    // setLoading(true);
    // if(!isEmailRight(userEmail)){
    //     alert('email error');
    //     return;
    // }
    // if(!isPasswordRight(userPassword)){
    //     alert('password error');
    //     return;
    // }
    // setLoading(true);
    // const dataToSend={
    //     businessName:businessName,
    //     email:userEmail,
    //     pw:userPassword,
    //     phone:userPhoneNumber,
    //     businessNum:businessNum,
    //     businessCd:businessCode,
    //     serviceYn:userAgree
    // };
    // console.log('handleSubmitButton');
    // console.log(dataToSend);
    // //전송 기능
    // fetchServer('POST', '/login/signup',dataToSend).then((responseJson) =>{
    //     setLoading(false);
    //     console.log('responseJson');
    //     console.log(responseJson);
    //     if (responseJson.retCode === '0') {
    //         setIsRegistraionSuccess(true);
    //     } else {
    //         setIsRegistraionSuccess(false);
    //         setErrorText(responseJson.errMsg);
    //         alert(errorText);
    //     }
    // }).catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    // });
    console.log('handle submit clicked');
};

const termTitleClicked = (arg) => {
    console.log('termTitleClicked');
    console.log(arg);
};

const codeComponentClicked = (code) => {
    setBusinessCode(code);
    console.log(businessCode);
};

const AuthInfoRegisterScreen = (({navigation}) => {
    const [businessName, setBusinessName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [authorNum, setAuthorNum] = useState('');
    const [businessNum, setBusinessNum] = useState('');
    const [businessCode, setBusinessCode] = useState('1');
    const [userAgree, setUserAgree] = useState(false);
    const [errortext, setErrorText] = useState('');
    const [loading, setLoading] = useState(false);
    const [term, setTerm] = useState(serviceTerm);
    const [isRegisterSuccess, setIsRegistraionSuccess] = useState(false);

    return (
        <View style={styles.mainbody}>
            <View style={styles.headerSection}>
                <Text style={styles.title}>회원가입</Text>
            </View>
            <View style={styles.inputSection}>
                <View style={styles.inputCompOuterWrapper}>
                    <RegisterInput source={{setter:setBusinessName, placeHolder:'상호명 입력'}}></RegisterInput>
                </View>
                <View style={styles.inputCompOuterWrapper}>
                    <RegisterInput source={{setter:setUserEmail, placeHolder:'이메일 입력'}}></RegisterInput>
                    <Pressable style={styles.inputCompButton} onPress={handleCheckEmailButton}>
                        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.inputCompText}>중복 확인</Text>
                    </Pressable>
                </View>
                <View style={styles.inputCompOuterWrapper}>
                    <RegisterInput source={{setter:setUserPassword, placeHolder:'비밀번호 입력'}}></RegisterInput>
                </View>
                <View style={styles.inputCompOuterWrapper}>
                    <RegisterInput source={{setter:setConfirmPassword, placeHolder:'비밀번호 확인'}}></RegisterInput>
                </View>
                <View style={styles.inputCompOuterWrapper}>
                    <RegisterInput source={{setter:setUserPhoneNumber, placeHolder:'핸드폰 번호 입력'}}></RegisterInput>
                </View>
                <View style={styles.inputCompOuterWrapper}>
                    <RegisterInput source={{setter:setAuthorNum, placeHolder:'인증번호 입력'}}></RegisterInput>
                    <Pressable style={styles.inputCompButton}>
                        <Text numberOfLines={1} adjustsFontSizeToFit>인증번호 확인</Text>
                    </Pressable>
                </View>
                <View style={styles.inputCompOuterWrapper}>
                    <RegisterInput source={{setter:setBusinessNum, placeHolder:'사업자 번호 입력'}}></RegisterInput>
                    <Pressable style={styles.inputCompButton}>
                        <Text numberOfLines={1} adjustsFontSizeToFit>사업자 번호 확인</Text>
                    </Pressable>
                </View>
                
                
                <View style={styles.termTitleOuterWrapper}>
                    <View style={styles.termTitleInnerWrapper} key={0} onPress={termTitleClicked}>
                        <Text style={styles.termTitle}>{serviceTerm.title}</Text>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={styles.termTitleInnerWrapper} key={1} onPress={termTitleClicked}>
                        <Text style={styles.termTitle}>{userInfoTerm.title}</Text>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={styles.termTitleInnerWrapper} key={2} onPress={termTitleClicked}>
                        <Text style={styles.termTitle}>{infoAgreeTerm.title}</Text>
                    </View>
                </View>
                <ScrollView style={styles.termContentScrollView}>

                </ScrollView>
                <Pressable style={styles.termAgreeSection}>
                    <View style={styles.btnTermAgree}></View><Text style={styles.txtTermAgree}>서비스 이용약관, 개인정보 취급방침, 개인정보제공에 모두 동의합니다</Text>
                </Pressable>
                <View style={styles.registerBtnSection}>
                    <Pressable style={styles.btnRegister} onPress={handleSubmitButton}>
                        <Text>회원가입</Text>
                    </Pressable>
                    <Pressable style={styles.btnCancel} onPress={navigation.goBack}>
                        <Text>취소</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
});

export default AuthInfoRegisterScreen;

const styles = StyleSheet.create({
    mainbody:{
        backgroundColor:theme.registerBackground1,
        flex:1,
        alignItems:'center',
    },
    inputCompOuterWrapper:{
        marginVertical:8,
        width:'90%',
        flexDirection:'row',
        alignItems:'center',
    },
    inputCompButton:{
        marginLeft:15,
        flex:30,
        height:32,
        backgroundColor:theme.btnBackground2,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
    },
    headerSection:{
        flex:11,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    title:{
        marginTop:statusBarHeight,
        color:theme.textWhite,
        fontWeight:'bold',
        fontSize:25,
    },
    inputSection:{
        flex:89,
        backgroundColor:theme.inputBackground2,
        width:'100%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        alignItems:'center',
        paddingTop:8,
    },
    emailInfoWrapper:{
        width:'88%',
        marginTop:8,
        marginBottom:-12,
    },
    txtEmailInfo:{
        color:theme.placeholderColor,
    },
    kindWrapper:{
        marginTop:20,
        alignSelf:'flex-start',
        marginLeft:'7%',
    },
    kindImageCardWrapper:{
        width:'90%',
    },
    kindScrollView:{
        height:140,
    },
    termTitleOuterWrapper:{
        width:'90%',
        height:30,
        flexDirection:'row',
    },
    termTitleInnerWrapper:{
        flex:1,
        height:'100%',
        backgroundColor:theme.backgroundGrey,
        justifyContent:'center',
        alignItems:'center',
    },
    termTitle:{
        color:'black',
    },
    divider:{
        height:'100%',
        width:4,
    },
    termContentScrollView:{
        backgroundColor:'white',
        marginTop:4,
        width:'90%',
    },
    termAgreeSection:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop:12,
    },
    btnTermAgree:{
        width: 15,
        height: 15,
        backgroundColor:'white',
    },
    txtTermAgree:{
        fontSize:12,
    },  
    registerBtnSection:{
        width:'90%',
        justifyContent:'space-around',
        flexDirection:'row',
        marginTop:15,
        marginBottom:20,
    },
    btnRegister:{
        width:100,
        height:28,
        backgroundColor:theme.btnBackground2,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
    },
    btnCancel:{
        width:100,
        height:28,
        backgroundColor:theme.backgroundGrey,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
    },
});