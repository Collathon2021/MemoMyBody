// 홈 메인 화면

import { useNavigation } from '@react-navigation/core';
import React, { Component, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, SectionList} from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import { images } from '../utils/images';
import { Image, Input, Button } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const styles = StyleSheet.create({
    // 상단
    topHome: {
        flex: 1,
    },
    // 중단
    middleHome:{
        flex : 1,
    },
    /////
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    eachView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex:3,
        paddingTop: 5,
    },
    middleContainer: {
        flexDirection: 'column',
        flexWrap: "wrap",
        backgroundColor: 'white'
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'gray',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
      flex: 1,
      marginHorizontal: "1%",
      marginBottom: 6,
      minWidth: "48%",
      textAlign: "center",
    },
})

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 상단
const TopHome = ()=>{
    return(
        <SafeAreaView style = {styles.topHome}>
            <View style = {styles.middleContainer}>
                <Text> Memo My body </Text>
                <Image url={images.Loginlogo} imageStyle={{ borderRadius: 2 }}/>
            </View>
        </SafeAreaView>
    )
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 중단
const MiddleHome = ()=>{
    return(
        <SafeAreaView style = {styles.middleHome}>
            <View style={styles.middleContainer}>
                <View>
                    <Text> 출석 </Text>
                    <Text> 업로드 </Text>
                </View>
                <View>
                    <Image url={images.Loginlogo} imageStyle={{ borderRadius: 8 }}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 하단
// data에 게시판 글 제목들을 미리 표시하며 클릭하면 이제 그 게시물로 이동
// 아래 data는 예시
const DATA = [
    {
        title: 'Best 게시판', data : ['1. 하루만에 키가 2미터', '2. 와 오진다']
    },
    {
        title: 'Hot 게시판', data : ['1. 질풍가도', "2. 쾌걸근육맨"]
    },
    {
        title: '자유게시판', data : ['1. 기타등등']
    },
    {
        title: '루틴 및 자세게시판', data: ['1. ㅇㅇㅇㅇ', '2. 글좀써줘']
    },
    {
        title: '식단정보게시판', data : ['Board','21312']
    },
  ];
const Item = ({ title, navigation}) => (
    <View style = {styles.middleContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate('Board')}>
            <Text> {title} </Text>
        </TouchableOpacity>
    </View>
);
const BottomHome = () =>{
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => index + item}
                renderItem={
                    ({item}) => <Item title={item} navigation={navigation}/>
                }
                renderSectionHeader={({section: {title}}) => <Text style={styles.sectionHeader}> {title}</Text>
                }
            />  
        </View>
    );
}


const Home = ({navigation}) => {
    return (
        <SafeAreaView style={styles.eachView} >
            <TopHome /> 
            <MiddleHome />
            <BottomHome />
        </SafeAreaView>
    );   
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

export default Home; 