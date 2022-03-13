import {StyleSheet, Keyboard, TextInput, View} from 'react-native';
import { theme } from '../variables/color';

const RegisterInput = (arg) => {
    const {prop='',setter, placeHolder, secure: isSecure=false, editable: isEditable=true, keyType='default'}=arg.source;
    return (
        <View style={styles.inputWrapper}>
            <TextInput
                style={styles.inputStyle}
                value={prop}
                onChangeText={(txt) => setter(txt)}
                placeholder={placeHolder}
                placeholderTextColor={theme.placeholderColor}
                keyboardType={keyType}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                secureTextEntry={isSecure}
                editable={isEditable}
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