import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const MultiSelectButtons = (arg) => {
    const {list, setter, prop} = arg.source;
    let i=0;
    
    return (
        <View style={styles.outterWrapper}>
            {list.map((item)=><MyButton key={i++} source={{...item, setter, prop}}></MyButton>)}
        </View>
    );
}

const MyButton = (arg) => {
    const {text, code, setter, prop} = arg.source;
    const [myName, setMyName] = useState(text);

    const clicked = () =>{
        const arr=prop.slice();
        const idx = arr.indexOf(code)
        if(idx > -1){
            arr.splice(idx, 1);
        }else{
            arr.push(code);
        }
        arr.sort();
        setter(arr);
    }

    let btnStyle={
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:15,
        paddingVertical:10,
        backgroundColor: prop.includes(code) ? 'blue':'white',
        borderRadius:20,
        marginHorizontal:5,
        marginVertical:2,
    };

    return(
        <View style={btnStyle}>
            <Pressable 
                hitSlop={ { top: 10, right: 15, bottom: 10, left: 15 } }
                onPress={clicked}>
                <Text style={styles.buttonText}>{myName}</Text>
            </Pressable>
        </View>
    )
}

export default MultiSelectButtons;

const styles = StyleSheet.create({
    outterWrapper:{
        flexWrap:'wrap',
        flexDirection:'row',
    },
    buttonText:{
        fontWeight:'bold',
    },
});