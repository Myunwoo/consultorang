import { theme } from '../variables/color';
import { StyleSheet, Text, View, Image} from 'react-native';

const IngreInputResult=({data})=>{
    const {name, price, amount, usage, unit}=data;
    return(
        <View style={resultStyles.mainbody}>
            <View style={resultStyles.leftBody}>
                <Text style={resultStyles.txtNormal}>{`${name} ${amount} (${price}원)`}</Text>
                <Text style={resultStyles.txtHighlight}>구매</Text>
            </View>
            <Text>/</Text>
            <View style={resultStyles.rightBody}>
                <Text style={resultStyles.txtNormal}>{`${usage} ${unit}`}</Text>
                <Text style={resultStyles.txtHighlight}>사용</Text>
                <Image
                    source={require('../../image/register_check.png')}
                    style={{width:14, height:14, marginLeft:8,}}
                ></Image>
            </View>
        </View>
    );
};

export default IngreInputResult;

const resultStyles=StyleSheet.create({
    mainbody:{
        backgroundColor:theme.ingreBackDarkGrey,
        width:'100%',
        height:40,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:18,
    },
    leftBody:{
        alignItems:'center',
        flexDirection:'row',
    },
    rightBody:{
        alignItems:'center',
        flexDirection:'row',
    },
    txtNormal:{
        fontSize:16,
    },
    txtHighlight:{
        fontSize:16,
        fontWeight:'bold',
        color:theme.btnExpenditureBlue,
        marginLeft:4,
    }
});