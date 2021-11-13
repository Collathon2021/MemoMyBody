import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup, Home, Community, menu, LoginFix, Post} from '../screens';
import UserContextProvider from '../contexts/UserContext';
import ComContextProvider from '../contexts/ComContext';

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const Stack = createStackNavigator();

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const AuthStack = () => {
    const theme = useContext(ThemeContext);

    return(
        <ComContextProvider>
        <UserContextProvider>
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
                    name="Community"
                    component={Community}
                />
                <Stack.Screen
                    name="menu"
                    component={menu}
                    options={{headerLeft: () => null}}
                />
                <Stack.Screen
                    name="LoginFix"
                    component={LoginFix}
                />
                <Stack.Screen
                    name="Post"
                    component={Post}
                />
            </Stack.Navigator>
        </UserContextProvider>
        </ComContextProvider>
    );
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

export default AuthStack;