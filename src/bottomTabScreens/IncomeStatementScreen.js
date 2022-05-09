import React, {useState, useEffect} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { fetchServer,getItemAsyncStorage } from '../abstract/asyncTasks';
import { theme } from '../variables/color';
import commonStyles from '../variables/commonStyles';
import {dateObject} from '../variables/scales';
import WeatherHeader from '../components/WeatherHeader';
import GraphType from '../components/GraphType';
import {LineChart} from 'react-native-chart-kit';

import {GT_LIST, EMPLOYEE_LIST, HOW_LIST} from '../variables/codelist';


//1. 첫 로드 시 데이터가 존재하지 않는 상황 개선
//2. 그래프 구현

const calcDiff=(mine, target)=>{
    return (Math.abs(target-mine)/target*100).toFixed(1);
}

const getTriangle=(mine, target)=>{
    let triangle= {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 10,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: theme.selectedOrange,
        marginBottom:-1,
        alignSelf:'center',
    };

    if(mine>target){
        return <View style={triangle}></View>
    }else if(mine<target){
        triangle={...triangle, transform: [{ rotate: "180deg" }], borderBottomColor: 'white',};
        return <View style={triangle}></View>
    }else{
        return <View></View>
    }
}

const getSale=(sale)=>{
    let result='';
    if(sale<50000000) result='5천만원 미만';
    else if(sale>=50000000 && sale<100000000) result='5천만원 ~ 1억원 미만';
    else if(sale>=100000000 && sale<500000000) result='1억원 ~ 5억원 미만';
    else if(sale>=500000000) result='5억원 이상';
    return result;
}

const getSize=(staff)=>{
    let result='';
    switch(staff){
        case 'BS001': result='9석 이하'; break;
        case 'BS002': result='10-19석'; break;
        case 'BS003': result='20-29석'; break;
        case 'BS004': result='30-39석'; break;
        case 'BS005': result='40-49석'; break;
        case 'BS006': result='50-59석'; break;
    }
    return result;
}

const getIngre=(ingre)=>{
    let result='';
    switch(ingre){
        case 'IG001': result='일반'; break;
        case 'IG002': result='면'; break;
        case 'IG003': result='육류'; break;
        case 'IG004': result='수산물'; break;
    }
    return result;
}

const getType=(type)=>{
    let result='';
    switch(type){
        case 'ST001': result='한식'; break;
        case 'ST002': result='중식'; break;
        case 'ST003': result='일식'; break;
        case 'ST004': result='양식'; break;
        case 'ST005': result='에스닉'; break;
        case 'ST006': result='피자, 햄버거, 샌드위치'; break;
        case 'ST007': result='치킨'; break;
        case 'ST008': result='분식'; break;
        case 'ST009': result='카페'; break;
        case 'ST010': result='음료'; break;
        case 'ST011': result='제과'; break;
        case 'ST012': result='주점'; break;
    }
    return result;
}

const IncomeStatementScreen = (({navigation}) => {
    const {year, month, date, dateString, yyyymmdd}=dateObject();
    const [graphType, setGraphType]=useState(GT_LIST[0].text);
    const [userId, setUserId]=useState('');
    const [graphSize, setGraphSize]=useState({width:0, height:0});
    const [data, setData]=useState({
        sameBusiness: {
            foodCost: 0,
            humanCost: 0,
            totalSale: 0,
        },
        sameSale: {
            foodCost: 0,
            humanCost: 0,
            totalSale: 0,
        },
        sameSize: {
            foodCost: 0,
            humanCost: 0,
            totalSale: 0,
        },
        updateDate: "",
        userModel: {
            foodCost: 0,
            humanCost: 0,
            totalSale: 0,
        },
    });
    const [userType,setUserType]=useState({
        businessType:'',
        businessIngre:'',
        businessCookway:'',
        businessSize:'',
    });
    const [dataForShow, setDataForShow]=useState({
        target:'',
        foodCost: 0,
        humanCost: 0,
        totalSale: 0,
    });

    let per='';

    useEffect(()=>{
        getItemAsyncStorage('userId').then(res=>{
            setUserId(res);
        }).catch(error=>{
            console.log(error);
        })
    },[]);

    useEffect(()=>{
        if(userId=='') return;
        const dataToSend={
            userId,
            ym:`${year}${month<10?'0'+month:month}`,
        };
        fetchServer('POST', '/state/getComparison', dataToSend).then((responseJson) => {
            if(responseJson.retCode==='0'){
                if(responseJson.data!==null){
                    // console.log('responseJson.data');
                    // console.log(responseJson.data);
                    setData(responseJson.data);
                }
            }else{
                alert('데이터를 불러오기를 실패하였습니다');
            }
        }).catch((error) => {
            console.log(error);
        });
        
        Promise.all([getItemAsyncStorage('businessType'), getItemAsyncStorage('businessIngre'),
            getItemAsyncStorage('businessCookway'), getItemAsyncStorage('businessSize')]).then(res=>{
                setUserType({
                    businessType:res[0],
                    businessIngre:res[1],
                    businessCookway:res[2],
                    businessSize:res[3],
                })
        });
    },[userId]);

    useEffect(()=>{
        switch(graphType){
            case GT_LIST[0].text:
                let t=getType(userType.businessType);
                if(t==='한식') t+='_'+getIngre(userType.businessIngre);
                setDataForShow({...data.sameBusiness, target:t});
                break;
            case GT_LIST[1].text:
                setDataForShow({...data.sameSale, target:getSale(Number(data.userModel.totalSale))});
                break;
            case GT_LIST[2].text:
                setDataForShow({...data.sameSize, target:getSize(userType.businessSize)});
                break;
        }
    },[graphType,userType, data]);

    let i=0;
    //
    //1. 차트의 기준값을 어떻게 해야 할지 감이 잘 안잡힘.
    //

    return (
        <LinearGradient colors={[theme.GRAD1, theme.GRAD2, theme.GRAD3]} style={commonStyles.mainbody}>
            <WeatherHeader></WeatherHeader>
            <View style={styles.contentSection}>
                <View style={styles.dateSelectWrapper}>
                    <Text style={styles.txtDate}>{`${year}년 ${month}월`}</Text>
                </View>
                <View style={styles.selectButtonsWrapper}>
                    {GT_LIST.map(g=><GraphType key={i++} source={{prop:graphType, setter:setGraphType, ...g}}></GraphType>)}
                </View>
                <View style={{width:'90%', height:1, backgroundColor:'white', marginTop:8,}}></View>
                <View style={styles.graphSection} onLayout={event=>{
                    const {width, height} = event.nativeEvent.layout;
                    setGraphSize({width,height});
                }}>
                    <LineChart
                        data={{
                            //labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                            datasets: [
                                { 
                                    data: [data.userModel.totalSale, data.userModel.foodCost, data.userModel.humanCost],
                                    color: () => 'white',
                                    strokeWidth: 2,
                                },
                                { 
                                    data: [dataForShow.totalSale, dataForShow.foodCost, dataForShow.humanCost], 
                                    color: () => '#ED7C33',
                                    strokeWidth: 2,
                                }, 
                            ]
                        }}
                        withHorizontalLines={false}
                        withVerticalLabels={true}
                        withHorizontalLabels={true}
                        //withShadow={false}
                        //withOuterLines={false}
                        //withInnerLines={false}
                        //segments={4}
                        //verticalLabelRotation={10}
                        //xLabelsOffset={0}
                        //yLabelsOffset={0}
                        //verticalLabelRotation={45}
                        //horizontalLabelRotation={45}
                        //xAxisInterval={2}
                        //yAxisInterval={1}
                        fromZero={true}
                        //width={graphSize.width}
                        width={graphSize.width + graphSize.width / 3}
                        //width={widthW + widthW / (data.length - 1)}
                        height={graphSize.height}
                        chartConfig={{
                            propsForBackgroundLines: {
                                //strokeDasharray: '', // solid background lines with no dashes
                                strokeDashoffset: 15,
                            },
                            //backgroundGradientFrom:
                            //backgroundGradientTo:
                            //barPercentage:1,
                            //barRadius:30,
                            //propsForBackgroundLines:
                            // propsForLabels:{
                            //     //wi
                            //     width:0,
                            //     height:0,
                            //     fontSize:10,
                            //     fontWeight:'bold',
                            //     //x:'10',
                            // },
                            //verticalLabelsHeightPercentage:50,
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientToOpacity: 0,
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            // propsForDots: {
                            //     r: "6",
                            //     strokeWidth: "2",
                            //     stroke: "#ffa726",
                            // }
                        }}
                        style={{
                            
                        }}
                    />
                </View>
                <View style={styles.percentSection}>
                    <View style={styles.percentOutterWrapper}>
                        <View style={styles.percentInnerWrapper}>
                            <Text style={styles.txtPercent}>매출(수익)</Text>
                            <View style={styles.percentContentWrapper}>
                                <Text style={styles.txtPercent}>{`${calcDiff(data.userModel.totalSale,dataForShow.totalSale)}%`}</Text>
                                {getTriangle(data.userModel.totalSale,dataForShow.totalSale)}
                            </View>
                        </View>
                        <View style={styles.percentInnerWrapper}>
                            <Text style={styles.txtPercent}>식재료비</Text>
                            <View style={styles.percentContentWrapper}>
                                <Text style={styles.txtPercent}>{`${calcDiff(data.userModel.foodCost,dataForShow.foodCost)}%`}</Text>
                                {getTriangle(data.userModel.foodCost,dataForShow.foodCost)} 
                            </View>
                        </View>
                        <View style={styles.percentInnerWrapper}>
                            <Text style={styles.txtPercent}>인건비</Text>
                            <View style={styles.percentContentWrapper}>
                                <Text style={styles.txtPercent}>{`${calcDiff(data.userModel.humanCost,dataForShow.humanCost)}%`}</Text>
                                {getTriangle(data.userModel.humanCost,dataForShow.humanCost)}
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.chartSection}>
                    <View style={styles.chartHeader}>
                        <Text style={{color:'white',}}>{`${graphType} (${dataForShow.target})대비`}</Text>
                    </View>
                    <View style={styles.chartContentWrapper}>
                        <View style={styles.chartTitleWrapper}>
                            <View style={{width:8,height:8,borderRadius:8, backgroundColor:theme.checkedBlue, marginRight:4,}}></View>
                            <Text style={{fontSize:12,}}><Text style={{backgroundColor:'#FCF579'}}>식재료비</Text> 지출이 <Text style={{backgroundColor:'#FCF579'}}>{`${per}%`}</Text>높게 나타나고 있습니다.</Text>
                        </View>
                        <View style={styles.chartContent}>
                            <View style={styles.rowDivider}></View>
                            <View style={styles.chartRow}>
                                <View style={styles.chartColumn}></View>
                                <View style={styles.columnDivider}></View>
                                <View style={styles.chartColumn}>
                                    <Text style={styles.txtChart}>매출(수익)</Text>
                                </View>
                                <View style={styles.columnDivider}></View>
                                <View style={styles.chartColumn}>
                                    <Text style={styles.txtChart}>식재료비</Text>
                                </View>
                                <View style={styles.columnDivider}></View>
                                <View style={styles.chartColumn}>
                                    <Text style={styles.txtChart}>인건비</Text>
                                </View>
                            </View>
                            <View style={styles.rowDivider}></View>
                            <View style={styles.chartRow}>
                                <View style={styles.chartColumn}>
                                    <Text style={styles.txtChart}>{` 평균`}</Text>
                                </View>
                                <View style={styles.columnDivider}></View>
                                <View style={styles.chartColumn}>
                                    <Text style={styles.txtChart}>{dataForShow.totalSale}</Text>
                                </View>
                                <View style={styles.columnDivider}></View>
                                <View style={styles.chartColumn}>
                                    <Text style={styles.txtChart}>{dataForShow.foodCost}</Text>
                                </View>
                                <View style={styles.columnDivider}></View>
                                <View style={styles.chartColumn}>
                                    <Text style={styles.txtChart}>{dataForShow.humanCost}</Text>
                                </View>
                            </View>
                            <View style={styles.rowDivider}></View>
                            <View style={styles.chartRow}>
                                <View style={styles.chartColumn}>
                                    <Text style={styles.txtChart}>우리 가게</Text>
                                </View>
                                <View style={styles.columnDivider}></View>
                                <View style={styles.chartColumn}>
                                <Text style={styles.txtChart}>{data.userModel.totalSale}</Text>
                                </View>
                                <View style={styles.columnDivider}></View>
                                <View style={styles.chartColumn}>
                                    <Text style={styles.txtChart}>{data.userModel.foodCost}</Text>
                                </View>
                                <View style={styles.columnDivider}></View>
                                <View style={styles.chartColumn}>
                                    <Text style={styles.txtChart}>{data.userModel.humanCost}</Text>
                                </View>
                            </View>
                            <View style={styles.rowDivider}></View>
                        </View>
                        <View style={styles.chartFooter}>
                            <Text style={{fontSize:10,opacity:0.5, marginRight:8,}}>{`${data.updateDate}와 비교, (단위 : 만원)`}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.infoSection}>
                    <Text style={{color:theme.selectedOrange, fontWeight:'bold', fontSize:16,}}>※ 주의사항 ※</Text>
                    <Text style={styles.txtInfo}>· 제시되는 기준값은 정부기관의 연 평균 자료를 12개월로 나눈 값으로, <Text style={styles.txtHighlight}>개별 매장의 상황</Text>
                        <Text style={styles.txtUnHighlight}>(상권, 성수기 등)</Text>에 따라 다소 차이가 있을 수 있습니다. <Text style={styles.txtHighlight}>단순 참고 수준</Text>으로 사용해주세요!
                        <Text style={styles.txtUnHighlight}>(농촌경제연구원 [외식사업 실태조사])</Text>     
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
});

export default IncomeStatementScreen;

const styles=StyleSheet.create({
    contentSection:{
        flex:1,
        alignItems:'center',
    },
    dateSelectWrapper:{
        marginTop:4,
    },
    selectButtonsWrapper:{
        flexDirection:'row',
        width:'90%',
    },
    txtDate:{
        color:'white',
        fontSize:18,
        ...commonStyles.commonTextShadow,
    },
    graphSection:{
        flex:1,
        width:'90%',
        marginTop:8,
        // borderBottomWidth:1,
        // borderLeftWidth:1,
        // borderColor:'white',
    },
    percentSection:{
        marginTop:8,
        width:'90%',
        height:64,
    },
    percentContentWrapper:{
        marginTop:2,
        flexDirection:'row',
    },
    percentOutterWrapper:{
        flexDirection:'row',
        flex:1,
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.1)',
        borderRadius:40,
        paddingHorizontal:'5%',
    },
    percentInnerWrapper:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    txtPercent:{
        color:'white',
        marginRight:2,
    },
    chartSection:{
        marginTop:8,
        width:'90%',
        height:164,
        borderRadius:15,
    },
    chartHeader:{
        width:'100%',
        height:40,
        backgroundColor:'#2C456D',
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        justifyContent:'center',
        alignItems:'center',
    },
    chartContentWrapper:{
        backgroundColor:'white',
        flex:1,
        width:'100%',
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15,
    },
    chartTitleWrapper:{
        width:'100%',
        height:32,
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:8,
    },
    chartContent:{
        width:'100%',
        flex:1,
        paddingHorizontal:8,
    },
    txtChart:{
        fontSize:12,
    },
    chartRow:{
        flex:1,
        flexDirection:'row',
    },
    chartColumn:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    rowDivider:{
        width:'100%',
        height:1,
        backgroundColor:'#557EBC',
    },
    columnDivider:{
        width:1,
        height:'100%',
        backgroundColor:'#557EBC',
    },
    chartFooter:{
        width:'100%',
        height:24,
        justifyContent:'center',
        alignItems:'flex-end'
    },
    infoSection:{
        marginTop:12,
        width:'90%',
        backgroundColor:'rgba(0,0,0,0.1)',
        borderRadius:15,
        marginBottom:8,
        justifyContent:'center',
        paddingHorizontal:10,
        paddingVertical:10,
    },
    txtInfo:{
        color:'white',
        ...Platform.select({
            ios:{
                fontSize:13,
            },
            android:{
                fontSize:12,
            }
        })
    },
    txtHighlight:{
        backgroundColor:theme.selectedOrange,
    },
    txtUnHighlight:{
        color:'#95A9BA',
    }
});