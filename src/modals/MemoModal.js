import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Keyboard, Image } from 'react-native';
import {
    CONTENT_SECTION_BORDER_RADIUS,
} from '../variables/scales';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
  
import { theme } from '../variables/color';
import ModalTitle from '../components/ModalTitle';

//메모의 양을 제한하는 과정이 필요할 것 같음. 메모가 늘어남에 따라 뷰는 어떻게 되는지 확인해야 함.

const MemoModal = ({ showModal, setShowModal,}) => {
    const [memo, setMemo]=useState('');
    const handleOutsideClick=()=>{
        setShowModal(false);
    };

    const handleDateSelect=()=>{

    };

    const handleSend=()=>{

    };

    return (
        <Pressable style={styles.outside} onPress={handleOutsideClick}>
            <View style={styles.mainbody}>
                <View style={styles.headerWrapper}><Text style={styles.txtHeader}>+</Text></View>
                <View style={styles.contentOutterWrapper}>
                    <ModalTitle text={'메모 입력'}></ModalTitle>
                    <View style={styles.calendarWrapper}>
                        <Text>날짜 : </Text>
                        <Pressable style={styles.btnDate} onPress={handleDateSelect}>
                            <Text>21.03.21</Text>
                            <Image
                                resizeMode='contain'
                                style={{width:20, height:20, marginLeft:8,}}
                                source={require('../../image/calendar_select.png')}
                            >
                            </Image>
                        </Pressable>
                    </View>
                    <View style={styles.memoInputWrapper}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(txt) => setMemo(txt)}
                            placeholder={'내용 입력'}
                            placeholderTextColor={theme.placeholderColor}
                            keyboardType="default"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            underlineColorAndroid="#f000"
                            returnKeyType="next"
                            secureTextEntry={false}
                            editable={true}
                        />
                    </View>
                    <View style={styles.btnSendWrapper}>
                        <Pressable onPress={handleSend} style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center', }}>
                            <Text>입력</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

export default MemoModal;

const styles = StyleSheet.create({
    outside:{
        flex:1,
        width:'100%',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    mainbody:{
        width:'100%',
        height:'80%',
        alignItems:'center',
        backgroundColor:theme.inputBackground2,
        borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    },
    headerWrapper:{
        width:'100%',
        height:40,
        backgroundColor:theme.torangGrey,
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
    },
    calendarWrapper:{
        width:'90%',
        height:40,
        flexDirection:'row',
        alignItems:'center',
    },
    btnDate:{
        height:'100%',
        alignItems:'center',
        marginLeft:4,
        flexDirection:'row',
    },
    memoInputWrapper:{
        flex:1,
        width:'100%',
        paddingHorizontal:'5%',
    },
    btnSendWrapper:{
        width:160,
        height:40,
        backgroundColor:theme.torangYellow,
        borderRadius:15,
        marginBottom:30,
    }
});