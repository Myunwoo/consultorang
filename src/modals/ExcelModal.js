import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS,
} from '../variables/scales';
  
import { theme } from '../variables/color';

const ExcelModal = (arg) => {
    let txtFilename={
        color:theme.placeholderColor,
        fontSize:16,
    };
    let fileName='파일명';

    return (
        <View style={styles.mainbody}>
            <View style={styles.headerWrapper}><Text style={styles.txtHeader}>UPLOAD</Text></View>
            <View style={styles.contentOutterWrapper}>
                <View style={styles.contentInnerWrapper}>
                    <View style={styles.selectWrapper}>
                        <Pressable style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center',}}>
                            <Text style={{fontWeight:'bold', fontSize:20,}}>파일 선택</Text>
                        </Pressable>
                    </View>
                    <View style={styles.fileWrapper}>
                        <Text style={txtFilename}>{fileName}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.sendWrapper}>

            </View>
        </View>
    );
}

export default ExcelModal;

const styles = StyleSheet.create({
    mainbody:{
        width:'80%',
        maxWidth:300,
        height:'60%',
        maxHeight:400,
        alignItems:'center',
        backgroundColor:theme.inputBackground2,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    headerWrapper:{
        width:'100%',
        height:40,
        backgroundColor:theme.torangYellow,
        borderTopLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderTopRightRadius:CONTENT_SECTION_BORDER_RADIUS,
        justifyContent:'center',
        paddingLeft:20,
    },
    txtHeader:{
        fontWeight:'bold',
        color:'white',
    },
    contentOutterWrapper:{
        width:'100%',
        flex:9,
        alignItems:'center',
        justifyContent:'center',
    },
    contentInnerWrapper:{
        width:'100%',
        height:'80%',
        alignItems:'center',
    },
    selectWrapper:{
        width:'80%',
        flex:4,
        backgroundColor:theme.torangYellow,
        marginTop:12,
        marginBottom:8,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    fileWrapper:{
        width:'80%',
        flex:5,
        backgroundColor:'white',
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
        justifyContent:'center',
        alignItems:'center',
    },
    sendWrapper:{
        backgroundColor:'black',
        flex:3,
        width:'100%',
        borderBottomLeftRadius:CONTENT_SECTION_BORDER_RADIUS,
        borderBottomRightRadius:CONTENT_SECTION_BORDER_RADIUS,
    }
});