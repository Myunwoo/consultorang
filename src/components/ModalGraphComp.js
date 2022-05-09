import React from 'react';
import { StyleSheet, Text, View,  } from 'react-native';
import commonStyles, {modalStyles} from '../variables/commonStyles';
import {theme} from '../variables/color';
import {
    BASIC_SHADOW,
    CONTENT_SECTION_BORDER_RADIUS,
} from '../variables/scales';

const ModalCircle=(type)=>{
    const circleOutterBody={
        width:18, height:18, borderRadius:18,
        justifyContent:'center', alignItems:'center',
        backgroundColor:'white',
        ...BASIC_SHADOW,
    };
    const circleInnerBody={
        width:14, height:14, borderRadius:14,
        backgroundColor:type==='primeCost'?theme.primeCostOrange:theme.originCostBlue,
        ...BASIC_SHADOW,
    };
    return (
        <View style={circleOutterBody}>
            <View style={circleInnerBody}></View>
        </View>
    );
};

const ModalBubble=(text)=>{
    const mainBody={width:'100%', height:'100%',};
    const arrowWrapper={
        width:'100%', height:8,justifyContent:'center',
    };
    const bubbleWrapper={
        flex:1,
        width:'100%',
        backgroundColor:theme.torangGrey,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
    };
    const triangle={
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 10,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor:theme.torangGrey,
        marginBottom:-1,
        alignSelf:'center',
    };
    const txt={
        color:'white',
        ...commonStyles.commonTextShadow,
    }

    return (
        <View style={mainBody}>
            <View style={arrowWrapper}>
                <View style={triangle}></View>
            </View>
            <View style={bubbleWrapper}>
                <Text style={txt}>{text}</Text>
            </View>
        </View>
    );
}

const ModalGraphComp = (arg) => {
    const {type, data, column}=arg;
    
    const txtGB=type==='primeCost'?'Prime Cost':'식재료 원가';

    const mBackgroundColor={ backgroundColor:type==='primeCost'?theme.primeCostOrangeLight:theme.originCostBlueLight, };
    const mColor={ color:type==='primeCost'?theme.primeCostOrange:theme.originCostBlue,  };
    const mBorderColor={
        borderBottomColor:type==='primeCost'?theme.primeCostOrange:theme.originCostBlue,
        borderLeftColor:type==='primeCost'?theme.primeCostOrange:theme.originCostBlue,
    };

    return (
        <View style={styles.mainbody}>
            <View style={{...modalStyles.graphContentWrapper, ...mBorderColor}}>
                <View style={modalStyles.graphTopWrapper}>
                    <View style={modalStyles.graphTopInnerWrapper}>
                        <View style={{...modalStyles.graphBubbleWrapper, top:'40%',}}>
                            {ModalCircle(type)}
                            <View style={modalStyles.graphBubble}>
                                {ModalBubble(data[0])}
                            </View>
                        </View>
                    </View>
                    <View style={modalStyles.graphTopInnerWrapper}>
                        <View style={{...modalStyles.graphBubbleWrapper, top:'30%',}}>
                            {ModalCircle(type)}
                            <View style={modalStyles.graphBubble}>
                                {ModalBubble(data[1])}
                            </View>
                        </View>
                    </View>
                    <View style={modalStyles.graphTopInnerWrapper}>
                        <View style={{...modalStyles.graphBubbleWrapper, top:'20%',}}>
                            {ModalCircle(type)}
                            <View style={modalStyles.graphBubble}>
                                {ModalBubble(data[2])}
                            </View>
                        </View>
                    </View>
                    <View style={modalStyles.graphTopInnerWrapper}>
                        <View style={{...modalStyles.graphBubbleWrapper, top:'10%',}}>
                            {ModalCircle(type)}
                            <View style={modalStyles.graphBubble}>
                                {ModalBubble(data[3])}
                            </View>
                        </View>
                    </View>
                    <View style={modalStyles.graphTopInnerWrapper}>
                        <View style={{...modalStyles.graphBubbleWrapper, top:'0%',}}>
                            {ModalCircle(type)}
                            <View style={modalStyles.graphBubble}>
                                {ModalBubble(data[4])}
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{...modalStyles.graphBottomWrapper, ...mBackgroundColor}}>
                    <Text style={{...modalStyles.txtGraphBottom, ...mColor}}>{txtGB}</Text>
                </View>
            </View>
            <View style={modalStyles.graphNumWrapper}>
                <View style={modalStyles.graphNumInnerWrapper}><Text style={modalStyles.txtGraphNum}>{column[0]}</Text></View>
                <View style={modalStyles.graphNumInnerWrapper}><Text style={modalStyles.txtGraphNum}>{column[1]}</Text></View>
                <View style={modalStyles.graphNumInnerWrapper}><Text style={modalStyles.txtGraphNum}>{column[2]}</Text></View>
                <View style={modalStyles.graphNumInnerWrapper}><Text style={modalStyles.txtGraphNum}>{column[3]}</Text></View>
                <View style={modalStyles.graphNumInnerWrapper}><Text style={modalStyles.txtGraphNum}>{column[4]}</Text></View>
            </View>
        </View>
    );
}

export default ModalGraphComp;

const styles = StyleSheet.create({
    mainbody:{
        width:'100%',
        height:'100%',
    }
});