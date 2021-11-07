import {Modal, Dimensions, TouchableWithoutFeedback,
StyleSheet, View, Text} from 'react-native';
import { useState, useRef } from 'react';
import React from 'react';


const ButtonPopup = ()=>{
    const [show, setShow] = useState(false);
    const popupRef = useRef();
    const renderOutsideTouchalbe = ({onTouch}) =>{
        const view = <View
        style = {{flex: 1, width: '100%'}}
        />
        if(!onTouch) return view;

        return(
            <TouchableWithoutFeedback onPress={onTouch} style ={{flex : 1, width: '100%',}}>
                {view}
            </TouchableWithoutFeedback>
        )


    }
    return(
        <Modal
            animationType = {'fade'}
            transparent = {true}
            visible = {show}
            onRequestClose = {this.close}
        >
            <View
                style = {{flex: 1, backgroundColor: '#000000AA',
            justifyContent : 'flex-end'}}
            >

            </View>
        </Modal>
        
    );
}