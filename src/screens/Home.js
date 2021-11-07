// 홈 메인 화면
import { useNavigation } from '@react-navigation/core';
import React, { Component, useEffect, useState} from 'react';
import { Text, StyleSheet, View, TouchableOpacity, SectionList, ScrollView, Button} from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import { images } from '../utils/images';
import { Image, Input,} from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import database, { firebase } from '@react-native-firebase/database';
import { element } from 'prop-types';

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 상단
const TopHome = ()=>{
    return(
        <SafeAreaView>
            <View style = {{top : 8}}>
                <Image url={images.Loginlogo} imageStyle={{ borderRadius: 2 }}/>
            </View>
        </SafeAreaView>
    )
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 중단
const MiddleHome = ()=>{
    return(
            <View style = {{justifyContent: 'center', flexDirection: 'row'
        , marginLeft: 50, marginRight: 50, backgroundColor: '#8d91e0', alignSelf: 'stretch',
        borderRadius: 15, bottom : 15}}>
                <View style = {{flex : 1, padding : 20,}}>
                    <Text style = {{fontSize : 20, backgroundColor: '#46476a', textAlign: 'center', color : '#eee',}}> 출석 </Text>
                    <Text style = {{fontSize : 20,backgroundColor: '#46476a', textAlign: 'center', color : '#eee', top: 20}}> 업로드 </Text>
                </View>
                <View style = {{flex : 1, top : 15}}>
                    <Image url={images.Loginlogo} imageStyle={{ borderRadius: 8 }}/>
                </View>
            </View>
    )
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 하단
// data에 게시판 글 제목들을 미리 표시하며 클릭하면 이제 그 게시물로 이동
// 아래 data는 예시
const DATA = [
    {
        title: 'Best게시판', data : ['1. 하루만에 키가 2미터', '2. 와 오진다']
    },
    {
        title: '자유게시판', data : ['1. 기타등등', '2. ????']
    },
    {
        title: '루틴 및 자세게시판', data: ['1. ㅇㅇㅇㅇ', '2. 글좀써줘']
    },
    {
        title: '식단정보게시판', data : ['Board','21312']
    },
];
const Item = ({communityType,title, navigation}) => (
    <View style={{flex:1, backgroundColor:'#edecfa', padding: 5 }} >
        <TouchableOpacity onPress={(item)=>{
            navigation.navigate("Community", {
            CommunityType: {communityType}.communityType})
            }
        }>
            <Text style ={{textAlign : 'center', fontSize: 12,}}>  {title} </Text>
        </TouchableOpacity>
    </View>
);

const BottomHome = ({data}) =>{
    const navigation = useNavigation();
    return(
    <View style = {{backgroundColor: '#8d91e0', padding: 5, padding :5,
        marginLeft: 50, marginRight : 50, borderRadius: 15 }}>
        <SectionList style 
            sections={data}
            keyExtractor={(item, index) => index + item}
            renderItem={ ({item, index, section}) => {
                if(index > 3) return null;
                return(
                    <Item communityType={section.title} title ={item} navigation={navigation}/>
                );
            }}
            renderSectionHeader={({section: {title}}) => <Text style={{fontSize: 18,
                textAlign: 'center', color : '#1c1c26'}}> {title}</Text>
            }
        />
    </View>
    );
}

const Home = ({navigation}) => {
    const [data, setData] = useState(DATA);
    
    useEffect(()=>{
        try{
            database()
            .ref('/')
            .on('value', snapshot => {
                const tmp = [];
                snapshot.forEach((child)=>{
                    const childData = [];
                    child.forEach((data)=>{
                        childData.unshift({
                            key : data.key,
                            memo: data.val(),
                            regdate: data.val().regdate,
                        })
                    })
                    const memo = [];
                    childData.forEach((m)=>{
                        memo.push(m.memo.memo);
                    })

                    tmp.unshift({
                        title : child.key,
                        data : memo,
                    });
                });

                    // console.log(tmp);
                var idx = 0;
                DATA.forEach((data)=>{
                    if(tmp.find(element => element.title == data.title) == undefined){
                        tmp.push({title: data.title, data: data.data});
                    }
                    idx++;
                })
                
                tmp.forEach((data)=>{
                    var idx;
                    if((idx = tmp.find(element=> element.title == "Best게시판"))!= undefined){
                        
                    }
                })
                setData(tmp);
            });
        }
        catch(error){
            alert(error.toString());
        }

    }, [])


    return (
        <SafeAreaView style = {{flex: 1, backgroundColor: '#5359D1'}}>
            <TopHome /> 
            <MiddleHome />
            <BottomHome data = {data}/>
            <View style = {{ position:'absolute', left:20, bottom:20,zIndex:10,}}>
                <Button onPress ={()=>{
                    navigation.pop();
                }} color = "#1c1c26" title = "뒤로가기" />
            </View>
        </SafeAreaView>
    );   
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

export default Home; 