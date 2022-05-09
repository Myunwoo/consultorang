import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

import { SCREEN_HEIGHT, } from '../variables/scales';
import { theme } from '../variables/color';
import {dateObject} from '../variables/scales';
import commonStyles from '../variables/commonStyles';

import WeatherComponent from './WeatherComponent';

const WeatherHeader = (arg) => {
    const {month, date, dateString}=dateObject();

    let i=0;
    return (
        <View style={styles.headerSection}>
            <View style={styles.dateSection}>
                <View style={styles.dateWrapper}>
                    <Text style={styles.txtToday}>Today</Text>
                </View>
                <View style={styles.dayWrapper}>
                    <Text style={styles.txtDay}>{`${month} / ${date}`}</Text>
                    <Text style={styles.txtDate}>{dateString}</Text>
                </View>
            </View>
            <View style={styles.weatherImgWrapper}>
                <WeatherComponent 
                    key={i++} source={{size:56}}>    
                </WeatherComponent>
            </View>
        </View>
    );
}

export default WeatherHeader;

const styles = StyleSheet.create({
    headerSection:{
        flexDirection:'row',
        height:80,
        marginHorizontal:'5%',
        alignItems:'center',
    },
    dateSection:{
        height:'100%',
        marginRight:8,
        ...Platform.select({
            ios:{
                width:160,
            },
            android:{
                width:140,
            }
        })
    },
    dateWrapper:{
        flex:1,
        justifyContent:'flex-end',
    },
    dayWrapper:{
        flex:1,
        flexDirection:'row',
    },
    txtToday:{
        color:'white',
        ...commonStyles.commonTextShadow,
        ...Platform.select({
            ios:{
                fontSize:22,
            },
            android:{
                fontSize:18,
            }
        })
    },
    txtDay:{
        marginRight:8,
        color:'white',
        letterSpacing:1,
        fontWeight:'bold',
        ...commonStyles.commonTextShadow,
        ...Platform.select({
            ios:{
                fontSize:24,
            },
            android:{
                fontSize:20,
            }
        })
    },
    txtDate:{
        fontWeight:'bold',
        color:theme.engineeringYellow,
        ...commonStyles.commonTextShadow,
        ...Platform.select({
            ios:{
                fontSize:28,
            },
            android:{
                fontSize:22,
            }
        })
    },
    weatherImgWrapper:{
        height:'100%',
        justifyContent:'center',
    }
});