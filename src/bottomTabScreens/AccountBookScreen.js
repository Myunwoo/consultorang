import React, {useState,useEffect} from 'react';
import { Platform, StyleSheet, Text, View, Pressable, Image, } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { theme } from '../variables/color';
import { SCREEN_WIDTH, CONTENT_SECTION_BORDER_RADIUS, BASIC_SHADOW} from '../variables/scales';

import { fetchServer, getItemAsyncStorage,AsyncStorageClear } from '../abstract/asyncTasks';

import commonStyles from '../variables/commonStyles';
import WeatherHeader from '../components/WeatherHeader';
import WeeklyCalendar from '../components/WeeklyCalendar';
import Loader from '../screens/Loader';

import ModalComponent from '../modals/ModalComponent';
import ExcelModal from '../modals/ExcelModal';
import IncomeModal from '../modals/IncomeModal';
import ExpenditureModal from '../modals/ExpeditureModal';
import MemoModal from '../modals/MemoModal';
import AccountBookHistoryScreen from '../bottomTabScreens/AccountBookHistoryScreen';

const TYPE=[
    {text:'가계부 입력'},
    {text:'내역 보기'}
]

const AccountBookScreen = (({navigation}) => {
    const [USER_ID, setUSER_ID]=useState('');
    const [type, setType]=useState(TYPE[0].text);
    const [inModalVisible, setInModalVisible]=useState(false);
    const [expModalVisible, setExpModalVisible]=useState(false);
    const [excelModalVisible, setExcelModalVisible]=useState(false);
    const [memoModalVisible, setMemoModalVisible]=useState(false);
    const [percentVisible, setPercentVisible]=useState(false);
    const [saleExpend, setSaleExpend]=useState({
        curSale:0,
        curExpend:0,
        prevSale:0,
        prevExpend:0,
    });
    const [calArr, setCalArr]=useState([]);
    const [loading, setLoading]=useState(false);


    const SaleAndExpend=()=>{
        const {curSale, curExpend, prevSale, prevExpend}=saleExpend;
        if(percentVisible){
            if(curSale===0 && curExpend===0){
                return (<View><Text style={{color:theme.placeholderColor}}>이번 달의 데이터를 불러오지 못했습니다. 데이터를 추가해주세요.</Text></View>);
            }
            if(prevSale===0 && prevExpend===0){
                return (<View><Text style={{color:theme.placeholderColor}}>지난 달의 데이터를 불러오지 못했습니다. 데이터를 추가해주세요.</Text></View>);
            }

            let saleTriangle={
                width: 0,
                height: 0,
                backgroundColor: "transparent",
                borderStyle: "solid",
                borderLeftWidth: 8,
                borderRightWidth: 8,
                borderBottomWidth: 16,
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                marginBottom:-1,
                alignSelf:'center',
            };
            let expendTriangle={
                width: 0,
                height: 0,
                backgroundColor: "transparent",
                borderStyle: "solid",
                borderLeftWidth: 8,
                borderRightWidth: 8,
                borderBottomWidth: 16,
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                marginBottom:-1,
                alignSelf:'center',
            };

            let saleColor='black';
            let expendColor='black';
            
            if(prevSale>curSale){
                saleTriangle={...saleTriangle, borderBottomColor: theme.btnExpenditureBlue, transform: [{ rotate: "180deg" }],};
                saleColor=theme.btnExpenditureBlue;
            } else if(prevSale<curSale){
                saleTriangle={...saleTriangle, borderBottomColor: theme.btnIncomeRed,};
                saleColor=theme.btnIncomeRed;
            }
            if(prevExpend>curExpend){
                expendTriangle={...expendTriangle, borderBottomColor: theme.btnExpenditureBlue, transform: [{ rotate: "180deg" }],}
                expendColor=theme.btnExpenditureBlue;
            } else if(prevExpend<curSale){
                saleTriangle={...saleTriangle, borderBottomColor: theme.btnIncomeRed,};
                expendColor=theme.btnIncomeRed;
            }

            const saleDiff=(Math.abs(prevSale-curSale)/prevSale*100).toFixed(1);
            const expendDiff=(Math.abs(prevExpend-curExpend)/prevExpend*100).toFixed(1);

            return(
                <View style={{flex:1, width:'100%', backgroundColor:'white',}}>
                    <View style={{width:'100%', height:40, justifyContent:'center'}}>
                        <Text style={{...commonStyles.commonTextShadow, fontSize:15,}}>전 월 대비 수익/지출 한눈에 보기</Text>
                    </View>
                    <View style={{flex:1, width:'100%', flexDirection:'row',}}>
                        <View style={styles.percentWrapper}>
                            <View style={styles.percentTitlerWrapper}><Text style={styles.txtPercentTitle}>수익</Text></View>
                            <View style={styles.percentContentWrapper}>
                                <Text style={{...styles.txtPercentContent, color:saleColor}}>{`${saleDiff}%`}</Text>
                                <View style={saleTriangle}></View>
                            </View>
                        </View>
                        <View style={{width:2, height:'100%', backgroundColor:theme.torangGrey, opacity:0.2}}></View>
                        <View style={styles.percentWrapper}>
                            <View style={styles.percentTitlerWrapper}><Text style={styles.txtPercentTitle}>지출</Text></View>
                            <View style={styles.percentContentWrapper}>
                                <Text style={{...styles.txtPercentContent, color:expendColor }}>{`${expendDiff}%`}</Text>
                                <View style={expendTriangle}></View>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }else{
            return(<View><Text style={{color:theme.placeholderColor}}>이번 달과 지난 달의 데이터를 불러오지 못했습니다.</Text></View>);
        }
    };

    const initCalArr=async()=>{
        const calendarCount=parseInt(SCREEN_WIDTH*0.9/52)-2;
        let d=new Date();
        let year;
        let month;
        let day;
        let endD, startD;
        const calendarArr=[];
        for(let i=0;i<calendarCount; i++){
            year = d.getFullYear(); // 년
            month = d.getMonth();   // 월
            day = d.getDate();      // 일
            let tempDay=new Date(year, month, day - i);
            if(i===0) endD=new Date(tempDay.getFullYear(), tempDay.getMonth(), tempDay.getDate()+1);
            if(i===calendarCount-1) startD=tempDay;
            calendarArr.push({ width: 52, height: '100%', date: tempDay.getDay(), day: tempDay.getDate() })
        }
        calendarArr.reverse();
        
        const startYear=startD.getFullYear();
        const startMonth=startD.getMonth()+1;
        const startDate=startD.getDate();
        const startYmd=`${startYear}${startMonth >= 10 ? startMonth : '0' + startMonth}${startDate >= 10 ? startDate : '0' + startDate}`;
        const endYear=endD.getFullYear();
        const endMonth=endD.getMonth()+1;
        const endDate=endD.getDate();
        const endYmd=`${endYear}${endMonth >= 10 ? endMonth : '0' + endMonth}${endDate >= 10 ? endDate : '0' + endDate}`;
        const dataToSend={
            userId:USER_ID,
            startYmd:startYmd,
            endYmd:endYmd,
        };
        fetchServer('POST', '/account/getSaleExpendYmd', dataToSend).then((responseJson) => {
            if(responseJson.data!==null){
                const res=responseJson.data;
                for(let i=0;i<res.length;i++){
                    calendarArr[i]={...res[i], ...calendarArr[i]};
                }
                setCalArr(calendarArr);
            }
        }).catch((error) => {
            setCalArr(calendarArr);
            console.log(error);
        });

    };

    useEffect(()=>{
        getItemAsyncStorage('userId').then(res=>{
            setUSER_ID(res);
        }).catch(error=>{

        });
    },[]);

    useEffect(()=>{
        if(USER_ID==='' || isNaN(USER_ID)) return;
        const dataToSend={
            'userId':USER_ID,
            'ym':'202201',
        };
        fetchServer('POST', '/account/getCurPrevSaleExpend', dataToSend).then((responseJson) => {
            if(responseJson.data!==null){
                setPercentVisible(true);
                setSaleExpend({
                    curSale:responseJson.data.cur.totalSale,
                    curExpend:responseJson.data.cur.totalExpend,
                    prevSale:responseJson.data.prev.totalSale,
                    prevExpend:responseJson.data.prev.totalExpend,
                });
            }else{
                setPercentVisible(false);
            }
        }).catch((error) => {
            console.log(error);
        });
        initCalArr();
    },[USER_ID]);

    useEffect(()=>{
        initCalArr();
    },[inModalVisible, expModalVisible, excelModalVisible, memoModalVisible]);

    let i=0;
    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={commonStyles.mainbody}>
            <Loader loading={loading}></Loader>
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
            <View style={commonStyles.nonHeaderWrapper}>
                <View style={commonStyles.realHeaderWrapper}>
                    <View style={type===TYPE[0].text?{...commonStyles.navigateWrapper,zIndex:1,}:{...commonStyles.navigateWrapper, backgroundColor:theme.titleWrapperBlue}}>
                        <View style={commonStyles.navigateInnerWrapper}>
                            <Pressable onPress={()=>setType(TYPE[0].text)} style={commonStyles.navigatePressable}><Text style={type===TYPE[0].text? {color:theme.checkedBlue} : {color:'white'} }>가계부 입력</Text></Pressable>
                        </View>
                        <View style={commonStyles.navigateInnerWrapper}></View>
                    </View>
                    <View style={type===TYPE[0].text?{...commonStyles.navigateWrapper, position:'absolute', left:110,backgroundColor:theme.titleWrapperBlue}:{...commonStyles.navigateWrapper,zIndex:1, position:'absolute', left:110,backgroundColor:theme.inputBackground2}}>
                        <View style={commonStyles.navigateInnerWrapper}>
                            <Pressable onPress={()=>setType(TYPE[1].text)} style={commonStyles.navigatePressable}><Text style={type===TYPE[0].text? {color:'white'} : {color:theme.checkedBlue} }>내역 보기</Text></Pressable>
                        </View>
                        <View style={commonStyles.navigateInnerWrapper}></View>
                    </View>
                </View> 
            </View>
            <View style={commonStyles.contentSection}>   
                {type===TYPE[0].text?
                <View style={commonStyles.contentWrapper}>
                <View style={styles.calendarWrapper}>
                    <View style={styles.calendarHeaderWrapper}>
                        <Text style={styles.txtCalendarHeader}>{`주간\n입출금`}</Text>
                    </View>
                    <View style={{width:1, height:'80%', backgroundColor:theme.torangGrey, opacity:0.2}}></View>
                   {calArr.map(cal=><WeeklyCalendar key={i++} source={cal}></WeeklyCalendar>)} 
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
                        { SaleAndExpend() }
                    </View>
                </View>
            </View>
            : <AccountBookHistoryScreen></AccountBookHistoryScreen>}
            </View>
        </LinearGradient>
    );
});

export default AccountBookScreen;

const accountHighlightBtn=Platform.select({
    ios: {
      shadowColor: "rgb(50, 50, 50)",
      shadowOpacity: 0.4,
      shadowRadius: 5,
      shadowOffset: {
        height: -1,
        width: 0,
      },
    },
    android: {
      elevation: 4,
    },
});

const styles=StyleSheet.create({
    calendarWrapper:{
        width:'90%',
        height:60,
        flexDirection: "row",
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:15,
    },
    calendarHeaderWrapper:{
        width:52,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    txtCalendarHeader:{
        color:theme.dateCheckedGrey,
        textAlign:'center',
        ...commonStyles.commonTextShadow,
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
        ...commonStyles.commonTextShadow,
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
        ...accountHighlightBtn,
    },
    btnIncome:{
        width:'100%',
        height:'100%',
    },
    btnExpenditureWrapper:{
        flex:1,
        backgroundColor:theme.btnExpenditureBlue,
        borderRadius:15,
        ...accountHighlightBtn,
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
        ...accountHighlightBtn,
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
        ...accountHighlightBtn,
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
        ...BASIC_SHADOW,
    },
    percentWrapper:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    percentTitlerWrapper:{
        height:40,
        width:'80%',
        justifyContent:'center',
        alignItems:'flex-start',
    },
    txtPercentTitle:{
        fontSize:20,
        ...commonStyles.commonTextShadow,
    },
    percentContentWrapper:{
        width:'80%',
        height:40,
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
    },
    txtPercentContent:{
        fontSize:24,
        fontWeight:'bold',
        marginRight:8,
        ...commonStyles.commonTextShadow,
    },
});
