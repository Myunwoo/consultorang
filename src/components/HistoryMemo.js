import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "../variables/color";
import {parsingDate} from '../abstract/commonTasks';
import { CONTENT_SECTION_BORDER_RADIUS } from "../variables/scales";

const HistoryMemo = (arg) => {
  const { historyType, typeNm, ymd, val, specificType } = arg.source;

  let sign;
  historyType==='SALE' ? (sign = "+") : (sign = "-");

  let typeChecked = {
    fontSize: 17,
    color: historyType==='SALE' ? theme.incomeRed : theme.outgoingBlue,
  };

  return (
    <View style={styles.mainBody}>
        <View style={styles.innerBody}>
            <View style={styles.dateWrapper}>
                <Text style={styles.dateText}>{parsingDate(ymd)}</Text>
            </View>
            <View style={styles.memoWrapper}>
                <Text>{val}</Text>
            </View>
        </View>
    </View>
  );
};

export default HistoryMemo;

const styles = StyleSheet.create({
  mainBody: {
    width: "100%",
    alignItems:'center',
  },
  innerBody:{
    backgroundColor:theme.inputBackground2,
    width:'95%',
    borderRadius:CONTENT_SECTION_BORDER_RADIUS,
    paddingVertical:8,
    paddingHorizontal:10,
  },
  dateText: {
    color: theme.dateCheckedGrey,
  },
});