// 로그인 화면

import React, { useState, useRef, useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, Input, Button } from '../components';
import { images } from '../utils/images';
import db from '../../test/db';


//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${ ({theme}) => theme.background };
    padding: 0 20px;
    padding-top: ${({ insets: {top} }) => top}px;
    padding-bottom: ${({ insets: {bottom} }) => bottom}px;
`;

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(true);
    const passwordRef = useRef();
    const insets = useSafeAreaInsets();   

    /* 동기적 동작 처리를 하기 위해 js는 기본적으로 비동기 처리
    async/await 처리를

    const _handleLoginButtonPress = () => {};

    */

    useEffect(() => {
        setDisabled(!(email && password ));
    }, [email, password]); 

    return(
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            extraScrollHeight={20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container insets={insets}>
                    <Image url={images.Loginlogo} imageStyle={{ borderRadius: 8 }}/>
                    <Input
                        label="Id"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        onSubmitEditing = {() => passwordRef.current.focus()}
                        placeholder = "Id"
                        returnKeyType = "next"
                    />
                    <Input
                        ref={passwordRef}
                        label="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        onSubmitEditing = {() => {}}
                        placeholder = "Password"
                        returnKeyType = "done"
                        isPassword
                    />
                    <Button 
                        title="Login" 
                        //onPress={_handleLoginButtonPress}
                        onPress = {() => navigation.navigate('Home')} 
                        //disabled={disabled} DB완성후 구현예정
                    />
                    <Button
                        title="Sign up"
                        onPress={() => navigation.navigate('Signup')}
                        isFilled={false}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>    
    );
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

export default Login;