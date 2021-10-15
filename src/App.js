import React, { Component, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar, Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './homepage/HomePage';
import Board from './borad/Borad';


const Stack = createStackNavigator();

const App = () => {
    useEffect(() => { /* Splash 화면 일정시간 후 닫히게 */
        setTimeout(() => {
            SplashScreen.hide();    
        },1000);
    }, []);  

    return (
        <ThemeProvider theme={theme}>
            <StatusBar barStyle="dark-content" /> 
            {/* 휴대폰 최상단 설정 */} 
            <Navigation />
            {/* Navigation 컴포넌트 호출 */}
        </ThemeProvider>
    );
};


export default App;
