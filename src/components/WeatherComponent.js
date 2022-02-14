import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { WEATHER_LIST } from '../variables/codelist';

const WeatherComponent = (arg) => {
    const {size}=arg.source;

    const image =require('../../image/weather_cloud.png')
    return (
        <View style={{
            width:size,
            height:size,
        }}>
            <Image style={styles.img} source={image} resizeMode='contain'/>
        </View>
    );
}

export default WeatherComponent;

const styles = StyleSheet.create({
    img:{
        width:'95%',
        height:'95%',
    }
});