import React, {useState, useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Image,
    ScrollView,
  } from 'react-native';
  
import { theme } from '../variables/color';
import {statusBarHeight} from '../variables/scales';
import {serviceTerm, userInfoTerm, infoAgreeTerm} from '../variables/termsOfUse';
import { fetchServer } from '../abstract/asyncTasks';
import { isEmailRight, isPasswordRight } from '../abstract/commonTasks';
  
//import components
import RegisterInput from '../components/RegisterInput';

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

    const handleCheckEmailButton = () => {
        console.log('handleCheckEmailButton');
        console.log(userEmail);
        if(isEmailRight(userEmail)){
            alert('올바른 이메일을 입력해주세요');
            return;
        }
        fetchServer('POST','/login/checkEmail',{email:userEmail})
            .then((responseJson) => console.log(responseJson))
            .catch(error => console.log(error));
        //받은 결과에 대한 처리 분기를 제작해야함.
    };

    const handleGoNext=(arg)=>{
        //상위 네비게이터로 데이터를 올리는 동작이 필요함 세터를 불러와서 네비게이터의 데이터를 세팅해줘야 되지 않을까 보임
        navigation.navigate('FoodInfoRegisterScreen');
    }

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
                <View style={styles.termContentWrapper}>
                    <ScrollView style={styles.termContentScrollView}
                        invertStickyHeaders={true}
                        stickyHeaderIndices={[1]}>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                            <Text>ffz</Text>
                    </ScrollView>
                    <View style={styles.termContentShowWrapper}>
                        <Text style={styles.txtTermContentShow}>약관 전체보기 {'>'} </Text>
                    </View>
                </View>
                <Pressable style={styles.termAgreeSection}>
                    <View style={styles.btnTermAgree}></View><Text style={styles.txtTermAgree}>서비스 이용약관, 개인정보 취급방침, 개인정보제공에 모두 동의합니다</Text>
                </Pressable>
                <View style={styles.goNextOutterWrapper}>
                    <View style={styles.torangColumn}>
                    <Image
                        style={styles.imgTorang}
                        source={require('../../image/torang1.png')}
                        resizemode='contain'
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
});

export default AuthInfoRegisterScreen;

const styles = StyleSheet.create({
    mainbody:{
        backgroundColor:theme.registerBackground1,
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
        backgroundColor:'white',
        marginTop:4,
        width:'100%',
    },
    termContentShowWrapper:{
        marginTop:4,
        alignSelf:'flex-end',
        fontSize:14,
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