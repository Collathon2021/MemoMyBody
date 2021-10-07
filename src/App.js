import React , { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';

const App = () => {
    useEffect(() => {
        setTimeout(() =>{
            SplashScreen.hide();    
        },1000);
    }, []);  

    return (
        <ThemeProvider theme={theme}>
            <StatusBar barStyle="dark-content" />
        </ThemeProvider>
    );
};

export default App;
