import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Pressable, Image, ScrollView, } from 'react-native';
  
import { theme } from '../variables/color';
import {statusBarHeight, CONTENT_SECTION_BORDER_RADIUS} from '../variables/scales';
import {serviceTerm, userInfoTerm, infoAgreeTerm} from '../variables/termsOfUse';
import { fetchServer } from '../abstract/asyncTasks';
import { checkEmailFormat, checkPwdFormat, checkBsnFormat, checkPhoneFormat } from '../abstract/commonTasks';
import { circleBtnProp } from '../variables/commonStyles';
  
//import components
import RegisterInput from '../components/RegisterInput';

////////
/* 
6. 핸드폰 번호 인증 기능 구현
*/

const AuthInfoRegisterScreen = ({route,navigation}) => {
    const [businessName, setBusinessName]=useState('');
    const [userEmail, setUserEmail]=useState('');
    const [emailRight, setEmailRight]=useState(false);
    const [userPassword, setUserPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const [userPhoneNumber, setUserPhoneNumber]=useState('');
    const [authorNum, setAuthorNum]=useState('');
    const [businessNum, setBusinessNum]=useState('');
    const [userAgree, setUserAgree]=useState(false);


    //인증번호 인증 여부
    const [isAuthorized, setIsAuthorized]=useState(false);

    const [errortext, setErrorText]=useState('');
    const [loading, setLoading]=useState(false);
    const [isRegisterSuccess, setIsRegistraionSuccess]=useState(false);

    //Buttons
    const [isEmailCheckPress, setIsEmailChekcPress]=useState(false);
    const [isAuthornumCheckPress, setIsAuthornumCheckPress]=useState(false);
    const [isBsnumCheckPress, setIsBsnumCheckPress]=useState(false);
    const [isAuthorSendPress, setIsAuthorSendPress]=useState(false);
    //////////

    //이용약관 선택
    const [whichTerm, setWhichTerm]=useState(0);
    const [term, setTerm]=useState(serviceTerm.content);

    useEffect(()=>{
        switch(whichTerm){
            case 0:
                setTerm(serviceTerm.content);
                break;
            case 1:
                setTerm(userInfoTerm.content);
                break;
            case 2:
                setTerm(infoAgreeTerm.content);
                break;
        }
    },[whichTerm]);

    //email 중복확인 여부
    const [isRightEmail, setIsRightEmail]=useState(false);
    useEffect(()=>{
        setIsRightEmail(false);
    },[userEmail]);

    //사업자 번호 중복확인 여부
    const [isRightBusinessNum, setIsRightBusinessNum]=useState(false);
    useEffect(()=>{
        setIsRightBusinessNum(false);
    },[businessNum]);

    //button handlers
    const handleCheckEmailButton = () => {
        if(!checkEmailFormat(userEmail)){
            alert('올바른 이메일을 입력해주세요');
            return;
        }
        fetchServer('POST','/login/checkEmail',{email:userEmail})
            .then((responseJson) => {
                const {isEnableEmail}=responseJson.data;
                if(isEnableEmail){
                    setIsRightEmail(true);
                    alert('사용 가능한 이메일입니다.');
                }else{
                    setIsRightEmail(false);
                    alert('중복된 이메일입니다.');
                }
            })
            .catch(error => console.log(error));
    };

    const handleAuthorSend=()=>{
        console.log('인증번호 전송');
    };

    const handleCheckAuthButton=()=>{
        if(!checkPhoneFormat){
            alert('올바른 핸드폰 번호를 입력해주세요.');
            return;
        }
        //SMS인증에 대해 생각해 보아야 함.
        setIsAuthorized(true);
    };

    //사업자 번호 생기면 그때 활용
    const handleCheckBsnumButton=()=>{
        if(!checkBsnFormat(businessNum)){
            alert('올바른 사업자번호를 입력해주세요');
            return;
        }
        fetchServer('POST','/login/checkBusinessNum',{businessNum:businessNum})
            .then((responseJson) => {
                const {data}=responseJson;
                if(data){
                    setIsRightBusinessNum(true);
                    alert('사용 가능한 사업자번호입니다.');
                }else{
                    setIsRightBusinessNum(false);
                    alert('중복된 사업자번호입니다.');
                }
            })
            .catch(error => console.log(error));
        setIsRightBusinessNum(true);
    };

    const handleTermAgree=()=>{
        setUserAgree(!userAgree);
    };
    //////////////

    //Button Props
    const emailCheckProps = circleBtnProp(styles.inputCompButton, isEmailCheckPress, setIsEmailChekcPress, handleCheckEmailButton);
    const authorNumProps = circleBtnProp(styles.inputCompButton, isAuthornumCheckPress, setIsAuthornumCheckPress, handleCheckAuthButton);
    const businessNumProp = circleBtnProp(styles.inputCompButton, isBsnumCheckPress, setIsBsnumCheckPress, handleCheckBsnumButton);
    const authorSendProp = circleBtnProp(styles.inputCompButton, isAuthorSendPress, setIsAuthorSendPress, handleAuthorSend);
    //////////////
    

    //AuthInfo를 navigate를 통해 FoodInfoRegisterScreen으로 넘기고, FoodInfoRegisterScreen에서 데이터를 서버로 전송하도록 수정합시다.
    //Navigator로부터 세터를 전달 받는 등의 동작은 삭제하도록 하겠습니다.
    const handleGoNext=(arg)=>{
        if(!isRightEmail){
            alert('이메일 중복확인을 먼저 해주세요');
            return;
        }
        if(!checkPwdFormat(userPassword)){
            alert('올바른 비밀번호를 입력해 주세요');
            return;
        }
        if(userPassword!==confirmPassword){
            alert('비밀번호 확인을 비밀번호와 동일하게 입력해주세요');
            return;
        }
        if(!isAuthorized){
            alert('핸드폰 인증을 먼저 진행해 주세요');
            return;
        }
        if(!isRightBusinessNum){
            alert('사업자 번호 확인을 먼저 해주세요');
            return;
        }
        if(!userAgree){
            alert('이용약관에 동의해 주세요');
            return;
        }

        navigation.navigate('FoodInfoRegisterScreen',{
            businessName, userEmail, userPassword, userPhoneNumber, businessNum, userAgree
        });
    }

    return (
        <View style={styles.mainbody}>
            <View style={styles.headerSection}>
                <Text style={styles.title}>회원가입</Text>
            </View>
            <View style={styles.inputSection}>
                <View style={styles.inputCompOuterWrapper}>
                    <RegisterInput source={{prop:businessName , setter:setBusinessName, placeHolder:'상호명 입력'}}></RegisterInput>
                </View>
                <View style={styles.inputCompOuterWrapper}>
                    <RegisterInput source={{prop:userEmail ,setter:setUserEmail, placeHolder:'이메일 입력'}}></RegisterInput>
                    <Pressable {...emailCheckProps}>
                        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.inputCompText}>중복 확인</Text>
                    </Pressable>
                </View>
                <View style={styles.inputCompOuterWrapper}>
                    <RegisterInput source={{prop: userPassword, setter:setUserPassword, placeHolder:'비밀번호 입력', secure:true}}></RegisterInput>
                </View>
                <View style={styles.inputCompOuterWrapper}>
                    <RegisterInput source={{prop:confirmPassword ,setter:setConfirmPassword, placeHolder:'비밀번호 확인', secure:true}}></RegisterInput>
                </View>
                <View style={styles.inputCompOuterWrapper}>
                    <RegisterInput source={{prop:userPhoneNumber ,setter:setUserPhoneNumber, placeHolder:'핸드폰 번호 입력'}}></RegisterInput>
                    <Pressable {...authorSendProp}>
                        <Text numberOfLines={1} adjustsFontSizeToFit>인증번호 전송</Text>
                    </Pressable>
                </View>
                <View style={styles.inputCompOuterWrapper}>
                    <RegisterInput source={{prop:authorNum , setter:setAuthorNum, placeHolder:'인증번호 입력', editable:true}}></RegisterInput>
                    <Pressable {...authorNumProps}>
                        <Text numberOfLines={1} adjustsFontSizeToFit>인증번호 확인</Text>
                    </Pressable>
                </View>
                <View style={styles.inputCompOuterWrapper}>
                    <RegisterInput source={{prop:businessNum ,setter:setBusinessNum, placeHolder:'사업자 번호 입력'}}></RegisterInput>
                    <Pressable {...businessNumProp}>
                        <Text numberOfLines={1} adjustsFontSizeToFit>사업자 번호 확인</Text>
                    </Pressable>
                </View>
                <View style={styles.termTitleOuterWrapper}>
                    <Pressable style={{...styles.termTitleInnerWrapper, backgroundColor: (whichTerm==0)?theme.registerBtnBlue:theme.backgroundGrey}} key={0} onPress={()=>setWhichTerm(0)}>
                        <Text style={styles.termTitle}>{serviceTerm.title}</Text>
                    </Pressable>
                    <View style={styles.divider}></View>
                    <Pressable style={{...styles.termTitleInnerWrapper, backgroundColor: (whichTerm==1)?theme.registerBtnBlue:theme.backgroundGrey}} key={1} onPress={()=>setWhichTerm(1)}>
                        <Text style={styles.termTitle}>{userInfoTerm.title}</Text>
                    </Pressable>
                    <View style={styles.divider}></View>
                    <Pressable style={{...styles.termTitleInnerWrapper, backgroundColor: (whichTerm==2)?theme.registerBtnBlue:theme.backgroundGrey}} key={2} onPress={()=>setWhichTerm(2)}>
                        <Text style={styles.termTitle}>{infoAgreeTerm.title}</Text>
                    </Pressable>
                </View>
                <View style={styles.termContentWrapper}>
                    <ScrollView style={styles.termContentScrollView}
                        invertStickyHeaders={true}
                        stickyHeaderIndices={[1]}>
                        <Text>{term}</Text>
                    </ScrollView>
                    <View style={styles.termContentShowWrapper}>
                        <Pressable style={{width:'100%', height:'100%'}} onPress={() => navigation.navigate('TermScreen')}>
                            <Text style={styles.txtTermContentShow}>약관 전체보기 {'>'} </Text>
                        </Pressable>
                    </View>
                </View>
                <Pressable style={styles.termAgreeSection} onPress={handleTermAgree}>
                    <View style={styles.btnTermAgree}>
                        <Image
                            resizeMode='contain'
                            style={{width:'100%', height:'100%', opacity:userAgree?1:0}}
                            source={require('../../image/register_check.png')}
                        >
                        </Image>
                    </View>
                    <Text style={styles.txtTermAgree}>서비스 이용약관, 개인정보 취급방침, 개인정보제공에 모두 동의합니다</Text>
                </Pressable>
                <View style={styles.goNextOutterWrapper}>
                    <View style={styles.torangColumn}>
                    <Image
                        style={styles.imgTorang}
                        source={require('../../image/torang1.png')}
                        resizeMode='contain'
                    />
                    </View>
                    <View style={styles.goNextColumn}>
                        <View style={styles.torangWordOutterWrapper}>
                            <View style={styles.torangWordInnerWrapper}>
                                <Text style={styles.txtTorangWord}>안녕하세요! 저 '토랑이'에게 사장님의 가게에 대해 알려주세요!</Text>
                            </View>
                        </View>
                        <View style={styles.goNextWrapper}>
                            <Pressable style={styles.btnGoNext} onPress={handleGoNext}>
                                <Text style={styles.txtGoNext}>Go {'>'}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default AuthInfoRegisterScreen;

const styles = StyleSheet.create({
    mainbody:{
        backgroundColor:theme.registerEmerald,
        flex:1,
        alignItems:'center',
        marginBottom:20,
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
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
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
        marginTop:8,
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
    termContentWrapper:{
        width:'90%',
        flex:1,
    },
    termContentScrollView:{
        flex:1,
        backgroundColor:'white',
        marginTop:4,
        width:'100%',
    },
    termContentShowWrapper:{
        marginTop:4,
        alignSelf:'flex-end',
        height:20,
    },
    termAgreeSection:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop:6,
    },
    btnTermAgree:{
        width: 15,
        height: 15,
        backgroundColor:'white',
    },
    txtTermAgree:{
        fontSize:12,
        marginLeft:8,
    },  
    goNextOutterWrapper:{
        width:'90%',
        height:160,
        marginTop:12,
        flexDirection:'row',
    },
    torangColumn:{
        justifyContent:'center',
        alignItems:'center',
    },
    imgTorang:{
        width:140,
        height:170,
    },
    goNextColumn:{
        flex:1,
        marginLeft:4,
        justifyContent:'center',
        alignItems:'center',
    },
    torangWordOutterWrapper:{
        width:'100%',
        flex:65,
        justifyContent:'center',
        alignItems:'center',
    },
    torangWordInnerWrapper:{
        width:'100%',
        height:80,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:8,
    },
    txtTorangWord:{

    },
    goNextWrapper:{
        width:'100%',
        flex:35,
    },
    btnGoNext:{
        width:80,
        height:55,
        backgroundColor:theme.torangYellow,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'flex-end',
        marginTop:2,
        marginRight:12,
        borderRadius:24,
    },
    txtGoNext:{
        color:theme.torangBrown,
        fontWeight:'bold',
        fontSize:20,
    }
});