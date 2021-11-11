import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup, Home, Menu, Community} from '../screens';
import UserContextProvider from '../contexts/UserContext';

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const Stack = createStackNavigator();

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const AuthStack = () => {
    const theme = useContext(ThemeContext);

    return(
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
                    name="Community"
                    component={Community}
                />
                <Stack.Screen
                    name="Menu"
                    component={Menu}
                />
                
            </Stack.Navigator>
      </UserContextProvider>
    );
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

export default AuthStack;