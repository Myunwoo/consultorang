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

  let OutWrapper = {
    width: "15%",
    height: "120%",
    borderRadius: 13,
    margin: 2,
    backgroundColor: checked ? theme.dateCheckedGrey : theme.dateUnCheckedWhite,
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
          <Text style={textChecked}>{date}</Text>
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
    height: 16,
    width: "100%",
    marginTop: 2,
  },
  numWrapper: {
    alignItems: "center",
    flex: 4,
  },
  dateWrapper: {
    alignItems: "center",
    flex: 4,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "red",
  },
});
