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
    useEffect(() => {
        setTimeout(() =>{
            SplashScreen.hide();
            console.log("start");  
        },1000);
    }, []);  

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName = "HomePage">
                <Stack.Screen name = "HomePage" component = {HomePage} />
                <Stack.Screen name = "Board" component = {Board} />
            </Stack.Navigator>
        </NavigationContainer>

        // <ThemeProvider theme={theme}>
        //     <StatusBar barStyle="dark-content" />
        // </ThemeProvider>    
    );
};


export default App;
