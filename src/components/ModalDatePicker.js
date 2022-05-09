import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Pressable, Image, Platform } from 'react-native';
import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { theme } from '../variables/color';

const ModalDatePicker = (arg) => {
    const {setter, date,}=arg;
    
    const [pickerDate, setPickerDate]=useState(new Date());
    const [pickerOpen, setPickerOpen]=useState(false);

    const handleOpenPicker=()=>{
        setPickerOpen(true);
    };

    const hideDatePicker=()=>{
        setPickerOpen(false);
    };

    const handleConfirm=(date)=>{
        setPickerDate(date);
        hideDatePicker();
    };

    useEffect(()=>{
        const year=pickerDate.getFullYear();
        const month=pickerDate.getMonth()+1;
        const date=pickerDate.getDate();
        setter(`${year}.${month<10?'0'+month:month}.${date<10?'0'+date:date}`);
    },[pickerDate]);

    //date picker 문제는 배포 후 시험해 보아야 하겠네요...
    return (
        <View style={styles.calendarWrapper}>
            {Platform.OS==='android'
            ?<DateTimePickerModal
                isVisible={pickerOpen}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            :<DatePicker
                modal
                open={pickerOpen}
                date={pickerDate}
                onConfirm={(pickerDate) => {
                    console.log(pickerDate);
                    setPickerOpen(false)
                    setPickerDate(pickerDate)
                }}
                onCancel={() => {
                    setPickerOpen(false)
                }}
                mode={'date'}
            />}
            <Text>날짜 : </Text>
            <Pressable style={styles.btnDate} onPress={handleOpenPicker}>
                <Text>{date}</Text>
                <Image
                    resizeMode='contain'
                    style={{width:20, height:20, marginLeft:8,}}
                    source={require('../../image/calendar_select.png')}
                >
                </Image>
            </Pressable>
        </View>
    );
}

export default ModalDatePicker;

const styles = StyleSheet.create({
    calendarWrapper:{
        width:'100%',
        height:'100%',
        flexDirection:'row',
        alignItems:'center',
    },
    btnDate:{
        height:'100%',
        alignItems:'center',
        marginLeft:4,
        flexDirection:'row',
    },
});