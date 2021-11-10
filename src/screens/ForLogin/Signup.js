// 회원가입 화면

import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components/native';
import { Image, Input, Button } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images } from '../../utils/images'
import { _handleSignupButtonPress } from './LoginFB';
import { Alert } from 'react-native';
import db from '../../../test/db';


//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${ ({ theme }) => theme.background };
    padding: 40px 20px;
`;

const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
`;

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const Signup = ({navigation}) => {
    const [name,setName] = useState('');
    const [id,setId] = useState('');
    const [password,setPassword] = useState('');
    const [passwordConfirm,setPasswordConfirm] = useState(''); 
    const [errorMessage,setErrorMessage] = useState('');
    const [disabled,setDisabled] = useState(true);

    const idRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    useEffect(() => {
        let _errorMessage = '';
        if (!name) { 
            _errorMessage = 'Please enter your name.';
        } else if (!id) {
            _errorMessage = "Please enter your id.";
        } else if (password.length < 6) {
            _errorMessage = "The password must contain 6 characters at least.";
        } else if (password !== passwordConfirm) {
            _errorMessage = "Passwords need to match.";
        } else {
            _errorMessage = '';
        }
        setErrorMessage(_errorMessage);
    }, [name, id, password, passwordConfirm]);

    useEffect(() => {
        setDisabled(
            !(name && id && password && passwordConfirm && !errorMessage)
        );
    }, [name, id, password, passwordConfirm, errorMessage]);


    const _handleSignupButtonPress = (name, id, pw) => {
        try {
        db.collection('user')
            .doc(id)
            .get()
            .then(doc => {
            if (!doc.data()) {
                db.collection('user')
                .doc(id)
                .set({
                    name: name,
                    userPW: pw,
                    }); 
                Alert.alert('SignUp Success',`${name}님 환영합니다.`);
                navigation.navigate('Login');
            } else { 
                //등록된 유저일 경우
                Alert.alert('SignUp Fail',`이미 사용중인 ID입니다.`);
            }
            })
        } catch (e) {
            Alert.alert('SignUp Fail',e.message);
        }
    };

    return(
        <KeyboardAwareScrollView extraScrollHeight={20}>
            <Container>
                <Image url={images.Signuplogo} imageStyle={{ borderRadius: 8 }}/>
                <Input
                    label="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    onSubmitEditing={() => {
                        setName(name.trim());
                        idRef.current.focus();
                    }}
                    onBlur={() => setName(name.trim())}
                    placeholder="Name"
                    returnKeyType="next"
                />
                <Input
                    ref={idRef}
                    label="Id"
                    value={id}
                    onChangeText={text => setId(text)}
                    onSubmitEditing={() => 
                        passwordRef.current.focus()
                    }
                    placeholder="Id"
                    returnKeyType="next"
                />
                <Input
                    ref={passwordRef}
                    label="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={() => 
                        passwordConfirmRef.current.focus()
                    }
                    placeholder="Password"
                    returnKeyType="done"
                    isPassword
                />
                <Input
                    ref={passwordConfirmRef}
                    label="Password Confirm"
                    value={passwordConfirm}
                    onChangeText={text => setPasswordConfirm(text)}
                    onSubmitEditing={() => _handleSignupButtonPress(name,id,password)}
                    placeholder="Password"
                    returnKeyType="done"
                    isPassword
                />
                <ErrorText>{errorMessage}</ErrorText>
                <Button
                    title="Signup"
                    onPress={() => _handleSignupButtonPress(name,id,password)}
                    disabled={disabled}
                /> 
            </Container>
        </KeyboardAwareScrollView>
    );
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

export default Signup;