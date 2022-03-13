import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "../variables/color";
import { BASIC_SHADOW } from "../variables/scales";

// 특이사항
// 1. handlePress —> 눌렀을때 저 까만 색이 되도록 한번 뷰를 만들어 보세요.
// 2. Today —> true이면 까맣도록

const WeeklyCalendar = (arg) => {
  const { width, height, date, day } = arg.source;
  const [checked, setChecked] = useState(false);
  let dateString;
  switch(date){
    case 0:
        dateString='일';
        break;
    case 1:
        dateString='월';
        break;
    case 2:
        dateString='화';
        break;
    case 3:
        dateString='수';
        break;
    case 4:
        dateString='목';
        break;
    case 5:
        dateString='금';
        break;
    case 6:
        dateString='토';
        break;
  };

  let OutWrapper = {
    width: width,
    height: height,
    borderRadius: 13,
    margin: 2,
    backgroundColor: checked ? theme.dateCheckedGrey : theme.inputBackground2,
  };

  let numChecked = {
    fontSize: 20,
    color: checked ? theme.dateUnCheckedWhite : theme.dateCheckedGrey,
  };

  let textChecked = {
    color: checked ? theme.dateUnCheckedWhite : theme.dateCheckedGrey,
  };

  const onClicked = () => {
    setChecked(!checked);
  };

  return (
    <View style={OutWrapper}>
      <Pressable style={styles.pressable} onPress={onClicked}>
        <View style={styles.dotWrapper}>
          <View style={styles.redDot}></View>
        </View>
        <View style={styles.numWrapper}>
          <Text style={numChecked}>{day}</Text>
        </View>
        <View style={styles.dateWrapper}>
          <Text style={textChecked}>{dateString}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default WeeklyCalendar;

const styles = StyleSheet.create({
  pressable: {
    width: "100%",
    height: "100%",
  },
  dotWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 12,
    width: "100%",
    marginTop: 2,
  },
  numWrapper: {
    alignItems: "center",
    flex: 4,
  },
  dateWrapper: {
    alignItems: "center",
    flex: 3,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "red",
  },
});
