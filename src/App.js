import React , { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar, Image } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Navigation from './navigations/index';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
    useEffect(() => { /* Splash 화면 일정시간 후 닫히게 */
        setTimeout(() => {
            SplashScreen.hide();    
        },1000);
    }, []);  

    return (
        <ThemeProvider theme={theme}>
            <StatusBar barStyle="dark-content" />            
            <Navigation />
        </ThemeProvider>
    );
};


export default App;
