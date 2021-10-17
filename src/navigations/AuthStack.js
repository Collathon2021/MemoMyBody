// Navigation 요소들

import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup, Board, Home} from '../screens';
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const Stack = createStackNavigator();

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const AuthStack = () => {
    const theme = useContext(ThemeContext);

    return(
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerTitleAlign: 'center',
                cardStyle: { backgroundColor: theme.backgroundColor },
                headerTintColor: theme.headerTintColor,
            }}
        >
            <Stack.Screen 
                name="Login" 
                component={Login}
                //options={{ headerShown: false }}  회원가입 위에 Login 타이틀 없애기            
            />
            <Stack.Screen 
                name="Signup" 
                component={Signup}
                options={{ headerBackTitleVisible: false }}
            />         
            <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="Board"
                component={Board}
            />
            
        </Stack.Navigator>
    );
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

export default AuthStack;