import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { theme } from '../variables/color';

const QuestionHeader = (arg) => {
    const {text}=arg;

    return (
        <View style={styles.headerWrapper}>
            <View style={styles.headerSquare}></View><Text>{text}</Text>
        </View>
    );
}

export default QuestionHeader;

const styles = StyleSheet.create({
    headerWrapper:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:5,
    },
    headerSquare:{
        width:10,
        height:10,
        backgroundColor:'black',
        marginRight:8,
    },
});