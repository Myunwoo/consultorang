import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

import { theme } from '../variables/color';

const PrimeCostRowComp = (arg) => {
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
        justifyContent:'center',
        flex:1,
        height:'100%',
        marginLeft:10,
    },
});