import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { theme } from '../variables/color';

const TermScreen = ({route,navigation}) => {

    return (
        <View style={styles.mainbody}>
            <Text>term</Text>
        </View>
    );
}

export default TermScreen;

const styles = StyleSheet.create({
    mainbody:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
});