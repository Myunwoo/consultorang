import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { theme } from '../variables/color';
import {statusBarHeight} from '../variables/scales';
import { CODE_LIST_ROW1, CODE_LIST_ROW2 } from '../variables/codelist';
import { SCREEN_WIDTH } from '../variables/scales';

import CodeImageCard from '../components/CodeImageCard';

const FoodInfoRegisterScreen = (({navigation}) => {
    const codeComponentClicked = () => {
        console.log('codeComponentClicked');
    }
    let i=0;

    return (
        <View style={styles.mainbody}>
            <View style={styles.headerSection}>
                <Text style={styles.title}>기초질문</Text>
            </View>
            <View style={styles.inputSection}>
                <ScrollView style={styles.scrollbody}>
                    <View style={styles.foodStyleSection}>
                        <View style={styles.foodStyleHeaderWrapper}>
                            <View style={styles.foodStyleHeaderSquare}></View><Text>어떤 스타일의 음식을 판매하시나요?</Text>
                        </View>
                        <View style={styles.foodStyleCircleRow}>
                            {CODE_LIST_ROW1.map((code) => <CodeImageCard key={i++} source={Object.assign(code,{setter:codeComponentClicked, diameter: (SCREEN_WIDTH*0.8*0.25)})}></CodeImageCard>)}
                        </View>
                        <View style={styles.foodStyleCircleRow}>
                            {CODE_LIST_ROW2.map((code) => <CodeImageCard key={i++} source={Object.assign(code,{setter:codeComponentClicked, diameter: (SCREEN_WIDTH*0.8*0.25)})}></CodeImageCard>)}
                        </View>
                        
                    </View>
                </ScrollView>
            </View>
        </View>
    );
});

export default FoodInfoRegisterScreen;

{/* <Text>FoodInfoRegisterScreen</Text>
            <View style={styles.kindWrapper}>
                <Text style={styles.txtKind}>■ 업종 선택</Text>
            </View>
            <View style={styles.kindImageCardWrapper}>
                <ScrollView style={styles.kindScrollView} horizontal={true}>
                </ScrollView>
            </View> */}

const styles = StyleSheet.create({
    mainbody:{
        backgroundColor:theme.registerBackground1,
        flex:1,
        alignItems:'center',
        marginBottom:20,
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
        paddingTop:8,
    },
    scrollbody:{
        marginVertical:8,
        width:'100%',
        paddingHorizontal:'5%',
    },
    foodStyleSection:{
        
    },
    foodStyleHeaderWrapper:{
        flexDirection:'row',
        alignItems:'center',
    },
    foodStyleHeaderSquare:{
        width:10,
        height:10,
        backgroundColor:'black',
        marginRight:8,
    },
    foodStyleCircleRow:{
        flexDirection:'row',
        backgroundColor:'teal',
    },
});