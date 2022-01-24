import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const FoodInfoRegisterScreen = (({navigation}) => {
    return (
        <View>
            <Text>FoodInfoRegisterScreen</Text>
            <View style={styles.kindWrapper}>
                    <Text style={styles.txtKind}>■ 업종 선택</Text>
                </View>
                <View style={styles.kindImageCardWrapper}>
                    <ScrollView style={styles.kindScrollView} horizontal={true}>
                        {CODE_LIST.map((code) => <CodeImageCard key={imageCardKey++} source={Object.assign(code,{setter:codeComponentClicked})}></CodeImageCard>)}
                    </ScrollView>
                </View>
        </View>
    );
});

export default FoodInfoRegisterScreen;