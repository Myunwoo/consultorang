import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { uploadFile } from '../abstract/asyncTasks';

import * as DocumentPicker from 'expo-document-picker';

const ExcelSendScreen = ({navigation}) => {
  const [excel, setExcel] = useState(null);

  const handleFind = async() => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        //엑셀만 뜨게 타입 지정해 줄 것.
        //type: [DocumentPicker.types.allFiles],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
        // type: "vnd.ms-excel" // .xls
        // type: "vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
        // type: "text/csv" // .csv
      });
      
      uploadFile('POST','/engine/insertExcel',res).then(responseJson=>{
        if(responseJson.retCode==='1'){
          alert(responseJson.errMsg);
        }else if(responseJson.retCode==='0'){
          console.log('categories saved');
          AsyncStorage.setItem('categories', JSON.stringify(responseJson.data.menuList));
        }        
      });

    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handleFind}>
        <Text>찾기</Text>
      </Pressable>
    </View>
  );
}

export default ExcelSendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
