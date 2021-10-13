// 게시판 메인 화면 

import React, { Component, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import {  Text, StyleSheet, View,  TouchableOpacity } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const styles = StyleSheet.create({
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    eachView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const Board = ({ navigation }) => {
    return (
        <View style={styles.eachView} >
        <Text> 게시판 화면 입니다.</Text>
        <TouchableOpacity
            onPress = {() => navigation.navigate('Home')}>
            <Text>  go to home </Text>
        </TouchableOpacity>
        </View>
    );
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

export default Board;
 

