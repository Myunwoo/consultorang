import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
//import * as Location from 'expo-location';

import { WEATHER_LIST } from '../variables/codelist';

const WeatherComponent = (arg) => {
    const {size}=arg.source;
    const [location, setLocation]=useState();
    const [ok, setOk]=useState(true);


    // const ask=async()=>{
    //     const {granted} = await Location.requestForegroundPermissionsAsync();
    //     if(!granted){
    //         setOk(false);
    //     }
    //     const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    //     const location= await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
    //     console.log(location);
    // };

    useEffect(()=>{
        //ask();
    },[]);


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