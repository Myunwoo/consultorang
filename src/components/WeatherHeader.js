import React from 'react';
import { StyleSheet, Text, View,  } from 'react-native';

import { SCREEN_HEIGHT, } from '../variables/scales';

import commonStyles from '../variables/commonStyles';
import { theme } from '../variables/color';
import {dateObject} from '../variables/scales';

import WeatherComponent from './WeatherComponent';

const WeatherHeader = (arg) => {
    const {month, date, dateString}=dateObject();

    let i=0;
    return (
        <View style={styles.headerSection}>
                <View style={styles.dateSection}>
                    <View style={styles.dateWrapper}>
                        <Text style={{fontSize:12,color:'white',}}>Today</Text>
                        <Text style={{fontSize:16,color:'white',}}>{`${month}/${date}`}</Text>
                    </View>
                    <View style={styles.dayWrapper}>
                        <Text style={{fontWeight:'bold',fontSize:20,color:theme.engineeringYellow,}}>{dateString}</Text>
                    </View>
                </View>
                <View style={styles.weatherImgWrapper}>
                    <WeatherComponent 
                        key={i++} source={{size:(SCREEN_HEIGHT*0.06) > 60 ? 60 : (SCREEN_HEIGHT*0.06)}}>    
                    </WeatherComponent>
                </View>
            </View>
    );
}

export default WeatherHeader;

const styles = StyleSheet.create({
    headerSection:{
        flexDirection:'row',
        height:'7%',
        maxHeight:64,
        marginHorizontal:'5%',
        alignItems:'center',
    },
    dateSection:{
        flexDirection:'row',
        marginRight:8,
    },
    dateWrapper:{
        alignItems:'center',
        marginRight:8,
    },
    dayWrapper:{
        justifyContent:'center',
        marginRight:8,
    },
});