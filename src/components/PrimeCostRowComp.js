import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

import { theme } from '../variables/color';

const PrimeCostRowComp = (arg) => {
    //img를 Image의 source로 사용해주세요.
    //title ex) 저가 전략 (가격 경쟁력)
    //content ex) 경쟁자보다 낮은 가격으로 경쟁력을 확보하는 경우
    //type을 0,1로 구분해서 title의 색을 구분하도록 하겠습니다.
    //0일 경우 theme.primeCostRed, 1일 경우 theme.primeCostBlue

    //content는 두줄을 넘어가지 않게 크기를 조정해 주세요.
    //React Native Text 요소의 옵션을 사용.

    const {img, title, content, type}=arg.source;

    let titleWrapper = {
        fontSize: 15,
        fontWeight:'bold',
        color: type==='0' ? theme.primeCostRed : theme.primeCostBlue,
      };
    


    return (
        <View style={styles.caseRowWrapper}>
            <View style={styles.caseImgWrapper}>
                <Image style={{position:'absolute', width:50, height:50, borderRadius:50,}} source={img}></Image>
            </View>
            <View style={styles.caseRightWrapper}>
                <Text style={titleWrapper}>{title}</Text>
                <Text minimumFontScale={0.8} numberOfLines={2} adjustsFontSizeToFit>{content}</Text>
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
        alignItems:'center',
    },
    caseImgWrapper:{
        width:50,
        height:50,
    },
    caseRightWrapper:{
        marginTop:4,
        flex:1,
        height:'100%',
        marginLeft:10,
    },
});