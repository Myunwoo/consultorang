import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { theme } from '../variables/color';
import {statusBarHeight} from '../variables/scales';

const FoodInfoRegisterScreen = (({navigation}) => {
    return (
        <View style={styles.mainbody}>
            <View style={styles.headerSection}>
                <Text style={styles.title}>기초질문</Text>
            </View>
            <ScrollView style={styles.inputSection}>
                
            </ScrollView>
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
                    {CODE_LIST.map((code) => <CodeImageCard key={imageCardKey++} source={Object.assign(code,{setter:codeComponentClicked})}></CodeImageCard>)}
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
});