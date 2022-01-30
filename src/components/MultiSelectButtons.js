import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { theme } from '../variables/color';

const MultiSelectButtons = (arg) => {
    const {list} = arg.source;
    let i=0;
    
    return (
        <View style={styles.outterWrapper}>
            {list.map((item)=><MyButton key={i++} source={item}></MyButton>)}
        </View>
    );
}

const MyButton = (arg) => {
    const {text, code} = arg.source;

    const [checked, setChecked] = useState(false);
    const [myName, setMyName] = useState(text);

    return(
        <View style={styles.buttonWrapper}>
            <Text style={styles.buttonText}>{myName}</Text>
        </View>
    )
}

export default MultiSelectButtons;

const styles = StyleSheet.create({
    outterWrapper:{
        flexWrap:'wrap',
        flexDirection:'row',
    },
    buttonWrapper:{
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:15,
        paddingVertical:10,
        backgroundColor:'tomato',
        borderRadius:20,
        marginHorizontal:5,
        marginVertical:2,
    },
    buttonText:{
        fontWeight:'bold',
    },
});