import React from 'react';
import styled from 'styled-components/native';
import {Text, Button } from 'react-native';

// 로그인 화면

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${ ({theme}) => theme.background }  
`;

const Login = ({ navigation }) => {
    return(
        <Container>
            <Text style={{ fontSize: 30 }}>Signup screen</Text>
            <Button title="Signup" onPress={() => navigation.navigate('Signup')}/>
        </Container>
    );
};

export default Login;