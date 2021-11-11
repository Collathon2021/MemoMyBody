// 로그인 화면

import React, { useState, useRef, useEffect, useContext } from 'react';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, Input, Button } from '../../components';
import { images } from '../../utils/images';
//import { _handleLoginButtonPress } from './LoginFB';
import db from '../../../test/db';
import { UserContext } from '../../contexts/UserContext';
import { $CombinedState } from 'redux';


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
    const { user, setUser } = useContext(UserContext);    

    useEffect(() => {
        setDisabled(!(email && password ));
    }, [email, password]);

    const _handleLoginButtonPress = (id,pw) => {
        try {
        db.collection('user')
            .doc(id)
            .get()
            .then(doc => {
                if(!doc.data()) { // id가 없음
                    Alert.alert('Login Error',`ID 또는 PW를 다시 확인하세요.`);                   
                } else {
                    if(doc.data().userPW === pw) {
                        const n = doc.data().name;
                        Alert.alert('Login Success',`환영합니다 ! ${n}님`);
                        setUser({
                            name: n ,
                            id
                        });
                        navigation.navigate('Menu');
                    } else {
                        Alert.alert('Login Error',`ID 또는 PW를 다시 확인하세요.`);
                    }
                }
            })
        } catch(e) {
            Alert.alert('Login Error',e.message);
        }
    };

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
                        onChangeText={email => setEmail(email)}
                        onSubmitEditing = {() => passwordRef.current.focus()}
                        placeholder = "Id"
                        returnKeyType = "next"
                    />
                    <Input
                        ref={passwordRef}
                        label="Password"
                        value={password}
                        onChangeText={password => setPassword(password)}
                        onSubmitEditing = {() => {}}
                        placeholder = "Password"
                        returnKeyType = "done"
                        isPassword
                    />
                    <Button 
                        title="Login" 
                        onPress={() => _handleLoginButtonPress(email,password)}
                        disabled={disabled}
                        //idonPress = {() => navigation.navigate('Menu')} 
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