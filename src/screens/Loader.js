import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Modal, ActivityIndicator, Image} from 'react-native';

const imgList=[
  require('../../image/ing_meat.png'),
  require('../../image/ing_oatmeal.png'),
  require('../../image/ing_seafood.png'),
  require('../../image/ing_vegi.png'),
]

const Loader = (props) => {
  const {loading, ...attributes} = props;
  const [itv, setItv]=useState(0);


  useEffect(()=>{
    const count=setInterval(()=>{
      setItv(itv+1);
    },500);
  },[]);
  

  useEffect(()=>{
    
    console.log(itv);
  },[itv]);

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Image
              resizeMode='contain'
              style={{width:'70%', height:'70%', position:'absolute', bottom:-20, right:-4,}}
              source={require('../../image/account_fork.png')}
          >
          </Image>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});