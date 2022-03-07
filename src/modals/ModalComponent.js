import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Platform } from "react-native";
import {
  statusBarHeight,
  CONTENT_SECTION_BORDER_RADIUS,
  BASIC_SHADOW,
  SCREEN_HEIGHT, 
  BOTTOM_TAP_NAVIGATOR_HEIGHT_IOS,
  BOTTOM_TAP_NAVIGATOR_HEIGHT_ANDROID
} from '../variables/scales';

const ModalComponent = ({ showModal, setShowModal, children}) => {
  return (
    <>
      {showModal ? (
        <View style={styles.mainbody}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={showModal}
              onRequestClose={() => {
                setShowModal(!showModal);
              }}>
              <View style={styles.centeredView}>{children}</View>
            </Modal>
        </View>
      ) : null}
    </>
  );
};

export default ModalComponent;

const styles=StyleSheet.create({
  mainbody:{
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    backgroundColor:'black',
    opacity:0.7,
    zIndex:9998,
    height:SCREEN_HEIGHT,
  },
  centeredView:{
    flex:1,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    zIndex:9999,
  },
});