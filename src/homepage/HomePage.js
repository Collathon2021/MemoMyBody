import React, { Component, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar, Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const HomePage = ({navigation}) => {
    return (
        <View style={styles.eachView} >
            <Text> 홈 화면 입니다.</Text>
            <TouchableOpacity
                onPress = {()=>navigation.navigate('Board')}>
                <Text>  go to board !!!</Text>
            </TouchableOpacity>   
        </View>
    )   
}
  
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

export default HomePage;