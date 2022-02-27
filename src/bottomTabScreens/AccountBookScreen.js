import React, {useState} from 'react';
import { Platform, StyleSheet, Text, View, Pressable, Image, Modal } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { theme } from '../variables/color';
import {
    statusBarHeight,
    CONTENT_SECTION_BORDER_RADIUS,
    BASIC_SHADOW,
    SCREEN_HEIGHT, 
    BOTTOM_TAP_NAVIGATOR_HEIGHT_IOS,
    BOTTOM_TAP_NAVIGATOR_HEIGHT_ANDROID
} from '../variables/scales';
import {dateObject} from '../variables/scales';

import commonStyles from '../variables/commonStyles';
import WeatherComponent from '../components/WeatherComponent';
import HyeSun from '../components/HyeSun';

import ModalComponent from '../modals/ModalComponent';
import ExcelModal from '../modals/ExcelModal';

const AccountBookScreen = (({navigation}) => {
    const {month, date, dateString}=dateObject();
    const [inModalVisible, setInModalVisible]=useState(false);
    const [expModalVisible, setExpModalVisible]=useState(false);
    const [excelModalVisible, setExcelModalVisible]=useState(false);

    //1. 엑셀을 추가하였느냐 아니냐의 여부를 통해 이번 달 현황을 보여줄지 말지를 결정해야 한다.
    //2. 엑셀 모달 완성
    //3. 수익 모달 완성
    //4. 지출 모달 완성
    //5. 캘린더 컴포넌트 합쳐서 적용
    
    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={commonStyles.mainbody}>
            <ModalComponent showModal={excelModalVisible} setShowModal={setExcelModalVisible}>
                <ExcelModal></ExcelModal>
            </ModalComponent>
            <View style={commonStyles.headerSection}>
                <View style={commonStyles.dateSection}>
                    <View style={commonStyles.dateWrapper}>
                        <Text style={{fontSize:12,color:'white',}}>Today</Text>
                        <Text style={{fontSize:16,color:'white',}}>{`${month}/${date}`}</Text>
                    </View>
                    <View style={commonStyles.dayWrapper}>
                        <Text style={{fontWeight:'bold',fontSize:20,color:theme.engineeringYellow,}}>{dateString}</Text>
                    </View>
                </View>
                <View style={commonStyles.weatherImgWrapper}>
                    <WeatherComponent 
                        source={{size:(SCREEN_HEIGHT*0.06) > 60 ? 60 : (SCREEN_HEIGHT*0.06)}}>    
                    </WeatherComponent>
                </View>
            </View>
            <View style={commonStyles.contentSection}>
                <View style={commonStyles.titleWrapper}>
                    <Text style={commonStyles.txtTitle}>월간 가계부</Text>
                </View>       
                <View style={{width:50, height:50, backgroundColor:theme.titleWrapperBlue, position:'absolute', top:30, left:0, zIndex:1}}></View>
                <View style={commonStyles.contentWrapper}>
                    <View style={styles.calendarWrapper}>
                        <HyeSun source={{width:54, height:70, date:'일', day:10}}></HyeSun>
                    </View>
                    <View style={styles.accountTitleWrapper}>
                        <Text style={styles.txtAccountTitle}>이번 달 수입/지출 내역을 손쉽게 입력해보세요!</Text>
                    </View>
                    <View style={styles.accountWrapper}>
                        <View style={styles.btnIncomeWrapper}>
                            <Pressable style={styles.btnIncome} onPress={() => navigation.navigate('IncomeScreen')}>
                                <View style={styles.pmWrapper}><Text style={styles.txtPm}>+</Text></View>
                                <View style={styles.ieWrapper}><Text style={styles.txtIe}>수익</Text></View>
                                <Image
                                    resizeMode='contain'
                                    style={{width:'70%', height:'70%', position:'absolute', bottom:-20, right:-4,}}
                                    source={require('../../image/account_fork.png')}
                                >
                                </Image>
                            </Pressable>
                        </View>
                        <View style={{width:12, height:'100%',}}></View>
                        <View style={styles.btnExpenditureWrapper}>
                            <Pressable style={styles.btnExpenditure} onPress={() => navigation.navigate('ExpenditureScreen')}>
                                <View style={styles.pmWrapper}><Text style={styles.txtPm}>-</Text></View>
                                <View style={styles.ieWrapper}><Text style={styles.txtIe}>지출</Text></View>
                                <Image
                                    resizeMode='contain'
                                    style={{width:'70%', height:'70%', position:'absolute', bottom:-20, right:-4,}}
                                    source={require('../../image/account_cart.png')}
                                >
                                </Image>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.excelWrapper}>
                        <View style={styles.btnExcelWrapper}>
                            <Pressable style={styles.btnExcel} onPress={() => setExcelModalVisible(true)}>
                                <Text style={styles.txtExcel}>이번 달 엑셀 추가</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.memoWrapper}>
                        <View style={styles.memoInnerWrapper}>
                            <Text></Text>
                        </View>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
});

export default AccountBookScreen;

const styles=StyleSheet.create({
    calendarWrapper:{
        width:'90%',
        height:64,
    },
    accountTitleWrapper:{
        marginTop:4,
        width:'90%',
        height:34,
        justifyContent:'center',
        paddingLeft:12,
    },
    txtAccountTitle:{
        fontWeight:'bold',
    },
    accountWrapper:{
        width:'90%',
        flex:4,
        maxHeight:240,
        flexDirection:'row',
    },
    btnIncomeWrapper:{
        flex:1,
        backgroundColor:theme.btnIncomeRed,
        borderRadius:15,
    },
    btnIncome:{
        width:'100%',
        height:'100%',
    },
    btnExpenditureWrapper:{
        flex:1,
        backgroundColor:theme.btnExpenditureBlue,
        borderRadius:15,
    },
    btnExpenditure:{
        width:'100%',
        height:'100%',
    },
    pmWrapper:{
        position:'absolute',
        top:28,
        left:28,
    },
    ieWrapper:{
        position:'absolute',
        bottom:28,
        right:28,
    },
    txtPm:{
        color:'white',
        fontSize:24,
        fontWeight:'bold',
    },
    txtIe:{
        color:'white',
        fontSize:24,
        fontWeight:'bold',
    },
    excelWrapper:{
        width:'100%',
        flex:2,
        maxHeight:100,
        justifyContent:'center',
        alignItems:'center',
    },
    btnExcelWrapper:{
        width:'90%',
        height:'90%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:theme.torangYellow,
        borderRadius:15,
    },
    btnExcel:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    txtExcel:{
        color:'white',
        fontSize:24,
        fontWeight:'bold',
    },
    memoWrapper:{
        width:'90%',
        flex:7,
        justifyContent:'flex-start',
    },
    memoInnerWrapper:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        height:'80%',
        borderRadius:15,
        backgroundColor:'white',
        marginBottom:20,
    },
});