import React , { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar, Image } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Navigation from './navigations/index';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import CameraScreen from '../test/CameraScreen';


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
            {/* <CameraScreen/> */}
            {/* Navigation 컴포넌트 호출 */}
        </ThemeProvider>
    );
};


export default App;
