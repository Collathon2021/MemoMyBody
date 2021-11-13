import React, {useState, useRef, useEffect, useContext} from 'react';
import styled from 'styled-components/native';
import {Input, Button } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images } from '../../utils/images'
import { _handleSignupButtonPress } from './LoginFB';
import { Alert, Image } from 'react-native';
import db from '../../../test/db';
import fix from '../../assets/fix.png';
import { UserContext } from '../../contexts/UserContext';
import { checkPropTypes } from 'prop-types';

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

const LoginFix = ({navigation}) => {
    const { user: {name}} = useContext(UserContext);
    const { user: {id}} = useContext(UserContext);
    const { user: {pw}} = useContext(UserContext);
    const [name1,setName] = useState(name);
    const [id1,setId] = useState(id);
    const [password,setPassword] = useState(pw);
    const [passwordConfirm,setPasswordConfirm] = useState(pw); 
    const [errorMessage,setErrorMessage] = useState('');
    const [disabled,setDisabled] = useState(true);
    const { user, setUser } = useContext(UserContext); 
    //const { user: {id}} = useContext(UserContext);   

    const idRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    useEffect(() => {
        let _errorMessage = '';
        if (!name1) { 
            _errorMessage = 'Please enter your name.';
        } else if (password.length < 6) {
            _errorMessage = "The password must contain 6 characters at least.";
        } else if (password !== passwordConfirm) {
            _errorMessage = "Passwords need to match.";
        } else {
            _errorMessage = '';
        }
        setErrorMessage(_errorMessage);
    }, [name1, password, passwordConfirm]);

    useEffect(() => {
        setDisabled(
            !(name && password && passwordConfirm && !errorMessage)
        );
    }, [name, password, passwordConfirm, errorMessage]);


    // just change, not make address
    const _handleSignupButtonPress = (inputedName, inputedId, inputedPw) => {
        try {
        db.collection('user')
            .doc()
            .get()
            .then(doc => {
            if (!doc.data()) {
                db.collection('user')
                .doc(id)
                .update({
                    name : inputedName,
                    userPW : inputedPw
                })
                 
                //Alert.alert('LoginFix Success',`${name1}님 환영합니다.`);
                setUser({
                    name: inputedName,
                    id: id,
                    pw : inputedPw,
                    Com: '',
                })
                Alert.alert('LoginFix Success',`성공적으로 변경되었습니다.`);
                navigation.navigate('menu');
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
                    <Image source={fix} style={{
                    width: 80,
                    height: 80,
                    borderRadius: 0,
                    marginTop: 7
                    }}></Image>
                <Input
                    label="Name"
                    value={name1}
                    onChangeText={text => setName(text)}
                    onSubmitEditing={() => {
                        setName(name1.trim());
                        idRef.current.focus();
                    }}
                    onBlur={() => setName(name1.trim())}
                    placeholder="Name"
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
                    onSubmitEditing={() => _handleSignupButtonPress(name1,id1,password)}
                    placeholder="Password"
                    returnKeyType="done"
                    isPassword
                />
                <ErrorText>{errorMessage}</ErrorText>
                <Button
                    title="change"
                    onPress={() => _handleSignupButtonPress(name1,id1,password)}
                    disabled={disabled}
                /> 
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default LoginFix;
