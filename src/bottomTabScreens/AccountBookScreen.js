import React, {useState} from 'react';
import { Platform, StyleSheet, Text, View, Pressable, Image, Modal } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { theme } from '../variables/color';
import { SCREEN_WIDTH, } from '../variables/scales';

import { getItemAsyncStorage } from '../abstract/asyncTasks';

import commonStyles from '../variables/commonStyles';
import WeatherHeader from '../components/WeatherHeader';
import WeeklyCalendar from '../components/WeeklyCalendar';

import ModalComponent from '../modals/ModalComponent';
import ExcelModal from '../modals/ExcelModal';
import IncomeModal from '../modals/IncomeModal';
import ExpenditureModal from '../modals/ExpeditureModal';
import MemoModal from '../modals/MemoModal';
import { useEffect } from 'react/cjs/react.development';

const getCalArr=()=>{
    const calendarCount=parseInt(SCREEN_WIDTH*0.9/52)-2;
    let d=new Date();
    let year;
    let month;
    let day;
    const calendarArr=[];
    for(let i=0;i<calendarCount; i++){
        year = d.getFullYear(); // 년
        month = d.getMonth();   // 월
        day = d.getDate();      // 일
        let tempDay=new Date(year, month, day - i)
        calendarArr.push({ width: 52, height: '100%', date: tempDay.getDay(), day: tempDay.getDate() })
    }
    calendarArr.reverse();
    return calendarArr;
};

const AccountBookScreen = (({navigation}) => {
    const [inModalVisible, setInModalVisible]=useState(false);
    const [expModalVisible, setExpModalVisible]=useState(false);
    const [excelModalVisible, setExcelModalVisible]=useState(false);
    const [memoModalVisible, setMemoModalVisible]=useState(false);
    const [percentVisible, setPercentVisible]=useState(false);

    //1. 수익, 지출 퍼센트는 서버로부터의 데이터에 맞게 색과 화살표 방향을 변화해 주어야 함
    //지금은 asyncstorage에서 엑셀의 존재 여부를 판단하지만, 서버로부터 현재 월의 엑셀이 존재하는지 아닌지를 받아야 할 것으로 보입니다.
    //더불어, 비교에 의한 퍼센트 데이터 또한 서버로부터 받아 와야 합니다.
    useEffect(()=>{
        getItemAsyncStorage('excelSended').then(res=>{
            if(res==='true'){
                setPercentVisible(true);
            }else{

            }
        })
    });

    const calArr=getCalArr();

    let i=0;
    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={commonStyles.mainbody}>
            <ModalComponent key={i++} showModal={inModalVisible} setShowModal={setInModalVisible}>
                <IncomeModal showModal={inModalVisible} setShowModal={setInModalVisible}></IncomeModal>
            </ModalComponent>
            <ModalComponent key={i++} showModal={expModalVisible} setShowModal={setExpModalVisible}>
                <ExpenditureModal showModal={expModalVisible} setShowModal={setExpModalVisible}></ExpenditureModal>
            </ModalComponent>
            <ModalComponent key={i++} showModal={excelModalVisible} setShowModal={setExcelModalVisible}>
                <ExcelModal showModal={excelModalVisible} setShowModal={setExcelModalVisible}></ExcelModal>
            </ModalComponent>
            <ModalComponent key={i++} showModal={memoModalVisible} setShowModal={setMemoModalVisible}>
                <MemoModal showModal={memoModalVisible} setShowModal={setMemoModalVisible}></MemoModal>
            </ModalComponent>
            <WeatherHeader></WeatherHeader>
            <View style={commonStyles.contentSection}>
                <View style={commonStyles.titleWrapper}>
                    <Text style={commonStyles.txtTitle}>월간 가계부</Text>
                </View>       
                <View style={{width:50, height:50, backgroundColor:theme.titleWrapperBlue, position:'absolute', top:30, left:0, zIndex:1}}></View>
                <View style={commonStyles.contentWrapper}>
                  <View style={styles.calendarWrapper}>
                      {calArr.map(cal=><WeeklyCalendar key={i++} source={cal}></WeeklyCalendar>)}
                      <View style={styles.dotWrapper}>
                          <Pressable onPress={()=>navigation.navigate('HistoryScreen')} style={{width:'100%', height:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
                              <View style={{width:6, height:6, borderRadius:6, backgroundColor:theme.torangGrey}}></View>
                              <View style={{width:6, height:6, borderRadius:6, backgroundColor:theme.torangGrey}}></View>
                              <View style={{width:6, height:6, borderRadius:6, backgroundColor:theme.torangGrey}}></View>
                          </Pressable>
                      </View>
                  </View>
                    <View style={styles.commonTitleWrapper}>
                        <Text style={styles.txtCommonTitle}>이번 달 수입/지출 내역을 손쉽게 입력해보세요!</Text>
                    </View>
                    <View style={styles.accountWrapper}>
                        <View style={styles.btnIncomeWrapper}>
                            <Pressable style={styles.btnIncome} onPress={() => setInModalVisible(true)}>
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
                            <Pressable style={styles.btnExpenditure} onPress={() => setExpModalVisible(true)}>
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
                    <View style={styles.excelMemoWrapper}>
                        <View style={styles.btnExcelWrapper}>
                            <Pressable style={styles.btnExcel} onPress={() => setExcelModalVisible(true)}>
                                <Text style={styles.txtExcel}>이번 달 엑셀 추가</Text>
                            </Pressable>
                        </View>
                        <View style={{width:12, height:'100%',}}></View>
                        <View style={styles.btnMemoWrapper}>
                            <Pressable style={styles.btnExcel} onPress={() => setMemoModalVisible(true)}>
                                <Text style={styles.txtExcel}>메모 추가</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.commonTitleWrapper}>
                        <Text style={styles.txtCommonTitle}>엑셀을 업로드 할 경우 수입은 자동으로 입력됩니다</Text>
                    </View>
                    <View style={styles.memoWrapper}>
                        <View style={styles.memoInnerWrapper}>
                            {
                                percentVisible ? 
                                <View style={{flex:1, width:'100%', flexDirection:'row',}}>
                                    <View style={styles.percentWrapper}>
                                        <View style={styles.percentTitlerWrapper}><Text style={styles.txtPercentTitle}>수익</Text></View>
                                        <View style={styles.percentContentWrapper}><Text style={styles.txtPercentContent}>3.6%</Text></View>
                                    </View>
                                    <View style={{width:2, height:'100%', backgroundColor:theme.placeholderColor, opacity:0.2}}></View>
                                    <View style={styles.percentWrapper}>
                                        <View style={styles.percentTitlerWrapper}><Text style={styles.txtPercentTitle}>지출</Text></View>
                                        <View style={styles.percentContentWrapper}><Text style={styles.txtPercentContent}>2.2%</Text></View>
                                    </View>
                                </View> :
                                <View><Text style={{color:theme.placeholderColor}}>엑셀을 추가해 주세요</Text></View> 
                            }
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
        flexDirection: "row",
        justifyContent:'space-between',
    },
    dotWrapper:{
        width:52,
        height:'100%',
    },
    commonTitleWrapper:{
        marginTop:4,
        width:'90%',
        height:34,
        justifyContent:'center',
        paddingLeft:12,
    },
    txtCommonTitle:{
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
    excelMemoWrapper:{
        width:'100%',
        flex:2,
        maxHeight:100,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    btnExcelWrapper:{
        flex:1,
        height:'90%',
        marginLeft:'5%',
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
        fontSize:20,
        fontWeight:'bold',
    },
    btnMemoWrapper:{
        flex:1,
        height:'90%',
        marginRight:'5%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:theme.torangGrey,
        borderRadius:15,
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
        borderRadius:15,
        backgroundColor:'white',
        marginBottom:20,
        padding:15,
    },
    percentWrapper:{
        flex:1,
        height:'100%',
        alignItems:'center',
    },
    percentTitlerWrapper:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
    },
    txtPercentTitle:{
        fontSize:20,
    },
    percentContentWrapper:{
        flex:1,
        marginTop:'5%',
        justifyContent:'flex-start',
    },
    txtPercentContent:{
        fontSize:28,
        fontWeight:'bold',
    },
});
