import {StyleSheet, Image, Text, View, Pressable} from 'react-native';

const CodeImageCard = (arg) => {
    const image=arg.source.image;
    const name=arg.source.name;
    const type=arg.source.type;
    const setter=arg.source.setter;
    
    const onClicked = () => {
        console.log(name);
        setter(type);
    }

    return(
        <View style={styles.mainBody} onPress={onClicked}>
            <Pressable style={styles.pressable} onPress={onClicked}>
                <Image
                    style={styles.img}
                    source={require('../../image/reacticon.png')}
                    resizemode='contain'
                    />
                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>{name}</Text>
            </Pressable>
        </View>
    );
};

export default CodeImageCard;

const styles=StyleSheet.create({
    mainBody:{
        width:100,
        height:100,
        marginTop:15,
        backgroundColor:'white',
        borderRadius:50,
        marginHorizontal:5,
    },
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