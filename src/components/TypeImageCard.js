import {StyleSheet, Image, Text, View, Pressable} from 'react-native';
import React,{ useState } from 'react';

const TypeImageCard = (arg) => {
    const {businessType, image, image_f, name, code, setter, diameter}=arg.source;
    const [checked, setChecked]=useState(false);

    let textWrapper={
        alignItems:'center',
        justifyContent:'flex-start',
    }

    let exception=-1;
    let tempText;
    if(name==='피자,햄버거,샌드위치'){
        exception=0;
        tempText=<View style={textWrapper}><Text style={{fontSize:12}}>피자,햄버거</Text><Text style={{fontSize:12}}>샌드위치</Text></View>
    }else if(name==='제과(디저트)'){
        exception=1;
        tempText=<View style={textWrapper}><Text>제과</Text><Text style={{fontSize:10,}}>(디저트)</Text></View>
    }
    
    const onClicked = () => {
        setChecked(!checked);
        setter(code);
    }
    
    return(
        <View style={{margin:5,}}>
            <View style={{width:diameter, height:diameter, borderRadius:diameter, overflow:'hidden',}}>
                <Pressable style={styles.pressable} onPress={onClicked}>
                    <Image style={styles.img} source={businessType===code?image_f:image} resizemode='contain'/>
                </Pressable>
            </View>
            <View style={{width:'100%', height:30, marginTop:8, alignItems:'center',}}>
                {exception===-1?<Text>{name}</Text>:tempText}
            </View>
        </View>
    );
};

export default TypeImageCard;

const styles=StyleSheet.create({
    pressable:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    img:{
        width:'100%',
        height:'100%',
    },
    text:{
        color:'white',
        fontWeight:'bold',
    }
});