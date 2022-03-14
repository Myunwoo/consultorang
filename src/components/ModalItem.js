import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const ModalItem = (arg) => {
    const {name, amount, date, setter, prop}=arg;

    const handleDel=()=>{
        let t=prop.slice();
        const itemToFind = t.find(function(item) {
            if(item.menuNm){
                if(item.menuNm===name && item.menuSale===amount && item.saleYmd===date) return true;
                else return false;
            }else if(item.expendType){
                if(item.expendType===name && item.expendCost===amount && item.expendYmd===date) return true;
                else return false;
            }
        });
        const idx = t.indexOf(itemToFind)
        if (idx > -1) t.splice(idx, 1);
        setter(t);
    };

    return (
        <View style={styles.mainbody}>
            <View style={styles.header}>
                <Text>{name}</Text>
                <Text>{date}</Text>
            </View>
            <View style={styles.content}>
                <Text>{amount}원</Text>
                <View style={styles.btnWrapper}>
                    <Pressable onPress={handleDel} style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'flex-end'}}>
                        <Text style={{marginRight:8,}}>X</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default ModalItem;

const styles = StyleSheet.create({
    mainbody:{
        width:'100%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'rgba(255,255,255,0.4)',
        borderRadius:8,
    },
    header:{
        justifyContent:'center',
    },
    content:{
        flexDirection:'row',
        alignItems:'center',
    },
    btnWrapper:{
        width:30,
        height:'100%',
    }
});