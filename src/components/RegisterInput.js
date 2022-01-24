import {StyleSheet, Keyboard, TextInput, View} from 'react-native';
import { theme } from '../variables/color';

const RegisterInput = (arg) => {
    return (
        <View style={styles.inputWrapper}>
            <TextInput
                style={styles.inputStyle}
                onChangeText={(txt) => arg.source.setter(txt)}
                placeholder={arg.source.placeHolder}
                placeholderTextColor={theme.placeholderColor}
                keyboardType="default"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                underlineColorAndroid="#f000"
                returnKeyType="next"
            />
        </View>
    );
};

export default RegisterInput;

const styles=StyleSheet.create({
    inputWrapper:{
        flex:100,
        height:36,
        backgroundColor:'white',
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
    },
    inputStyle:{
        width:'95%',
    },
});