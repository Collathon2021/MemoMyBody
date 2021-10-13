// 홈 메인 화면

import React, { Component, useEffect } from 'react';
import { Text, StyleSheet, View,  TouchableOpacity } from 'react-native';
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

const Home = ({navigation}) => {
    return (
        <View style={styles.eachView} >
            <Text> 홈 화면 입니다.</Text>
            <TouchableOpacity
                onPress = {() => navigation.navigate('Board')}>
                <Text>  go to board !!!</Text>
            </TouchableOpacity>   
        </View>
    );   
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

export default Home; 