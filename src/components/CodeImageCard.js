import {StyleSheet, Image, Text, View, Pressable} from 'react-native';

const CodeImageCard = (arg) => {
    const {image, name, type, setter, diameter}=arg.source;
    
    const onClicked = () => {
        console.log(name);
        setter(type);
    }

    return(
        <View style={
            {width:diameter, height:diameter, backgroundColor:'tomato',marginTop:15,
            borderRadius:50, marginHorizontal:5,}} onPress={onClicked}>
            <Pressable style={styles.pressable} onPress={onClicked}>
                <Image
                    style={styles.img}
                    source={require('../../image/torang1.png')}
                    resizemode='contain'
                />
                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>{name}</Text>
            </Pressable>
        </View>
    );
};

export default CodeImageCard;

const styles=StyleSheet.create({
    pressable:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    img:{
        width:50,
        height:50,
    },
    title:{
        marginTop:4,
        fontSize:12,
        color:'black',
    }
});