import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { theme } from '../variables/color';

const PrimeCostRowComp = (arg) => {
    //img를 Image의 source로 사용해주세요.
    //title ex) 저가 전략 (가격 경쟁력)
    //content ex) 경쟁자보다 낮은 가격으로 경쟁력을 확보하는 경우
    //type을 0,1로 구분해서 title의 색을 구분하도록 하겠습니다.
    //0일 경우 theme.primeCostRed, 1일 경우 theme.primeCostBlue

    //content는 두줄을 넘어가지 않게 크기를 조정해 주세요.
    //React Native Text 요소의 옵션을 사용.

    const {img, title, content, type}=arg;

    return (
        <View style={styles.caseRowWrapper}>
            <View style={styles.caseImgWrapper}>

            </View>
        </View>
    );
}

export default PrimeCostRowComp;

const styles = StyleSheet.create({
    caseRowWrapper:{
        flexDirection:'row',
        width:'100%',
        height:'100%',
        marginVertical:12,
    },
    caseImgWrapper:{
        width:50,
        height:50,
        borderRadius:50,
        backgroundColor:'white',
    },
});