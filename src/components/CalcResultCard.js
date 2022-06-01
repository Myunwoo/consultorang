import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { BASIC_SHADOW} from '../variables/scales';
import { theme } from '../variables/color';
import commonStyles from '../variables/commonStyles';

const CalcResultCard = (arg) => {
    const {menuImg, menuName, date, costOfOne, ingreArr, navigation}=arg.source;
    console.log('arg.source');
    console.log(arg.source);

    const handleShowHistory=()=>{
        //히스토리를 볼 수 있는 화면으로 넘어가야 합니다.
        //const {menuImg, menuName, costOfOne, ingreArr}=route.params
        navigation.navigate('MenuCalculatorResultScreen', { menuImg, menuName, costOfOne, ingreArr});
    };

    return (
        <View style={styles.mainbody}>
            <View style={styles.imgWrapper}>
                <Image
                    resizeMode='contain'
                    style={{width:'90%', height:'90%',}}
                    source={menuImg}
                >
                </Image>
            </View>
            <Pressable style={styles.contentWrapper} onPress={handleShowHistory}>
                <Text style={styles.title}>{menuName}</Text>
                <View style={{flexDirection:'row',}}>
                    <Text style={styles.date}>{`측정일 : ${date}`}</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default CalcResultCard;

const styles = StyleSheet.create({
    mainbody:{
        width:'100%',
        height:'100%',
        flexDirection:'row',
        backgroundColor:'white',
        borderRadius:15,
        ...BASIC_SHADOW,
    },
    imgWrapper:{
        flex:3,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    contentWrapper:{
        flex:7,
        height:'100%',
        padding:12,
        justifyContent:'space-between'
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        ...commonStyles.commonTextShadow,
    },
    date:{
        fontSize:16,
        ...commonStyles.commonTextShadow,
    }
});