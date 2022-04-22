import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "../variables/color";
import {parsingDate} from '../abstract/commonTasks';

const HistoryIncomeSale = (arg) => {
  const { historyType, typeNm, ymd, val, specificType } = arg.source;

  let sign;
  historyType==='SALE' ? (sign = "+") : (sign = "-");

  let typeChecked = {
    fontSize: 17,
    color: historyType==='SALE' ? theme.incomeRed : theme.outgoingBlue,
  };

  return (
    <View style={styles.mainBody}>
      <View style={styles.rangeLeft}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>{typeNm}</Text>
        </View>
        <View style={styles.dateWrapper}>
          <Text style={styles.dateText}>{parsingDate(ymd)}</Text>
        </View>
      </View>
      <View style={styles.rangeRight}>
        <View>
          <Text
            style={typeChecked}
            numberOfLine={1}
          >{`${sign}${val}원`}</Text>
        </View>
      </View>
    </View>
  );
};

export default HistoryIncomeSale;

const styles = StyleSheet.create({
  mainBody: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    paddingHorizontal:'5%',
  },
  pressable: {
    width: "100%",
    height: "100%",
  },
  rangeLeft: {
    justifyContent:'center',
    flexDirection: "column",
    flex: 1,
  },
  rangeRight: {
    justifyContent:'center',
    alignItems: "flex-end",
    flex: 1,
  },
  titleText: {
    fontSize: 16,
  },
  dateText: {
    color: theme.dateCheckedGrey,
  },
  moneyWrapper: {},
  titleWrapper: {},
});