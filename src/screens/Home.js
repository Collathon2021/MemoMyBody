
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState} from 'react';
import { Text, View, TouchableOpacity, SectionList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import database from '@react-native-firebase/database';
import formenu from '../assets/ww.png';

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const DATA = [
    { title: '루틴 및 자세게시판', data: [''] },
    { title: '식단정보게시판', data : [''] },
    { title: '자유게시판', data : [''] },
];

const Item = ({ communityType, title, navigation}) => (
    <View style={{flex:1, backgroundColor:'#edecfa', padding: 5 }}>
        <TouchableOpacity onPress={() => {
            navigation.navigate("Community", {
            CommunityType: {communityType}.communityType})
            }
        }>
            <Text style ={{textAlign : 'center', fontSize: 12,}}>  {title} </Text>
        </TouchableOpacity>
    </View>
);

const BottomHome = ({ data }) => {
    const navigation = useNavigation();
    return(
    <View style = {{
        backgroundColor: '#8fbc8f', padding:10, padding : 5,
        marginLeft:20, marginRight : 20, borderRadius: 10 
    }}>
        <SectionList style 
            sections={data}
            keyExtractor={(item, index) => index + item}
            renderItem={({item, index, section}) => {
                if(index > 3) return null;
                return(
                    <Item communityType={section.title} title ={item} navigation={navigation}/>
                );
            }}
            renderSectionHeader={({section: {title}}) => 
                <Text style={{fontSize: 20,
                    textAlign: 'center', color : '#1c1c26'}}> {title}</Text>
            }
        />
    </View>
    );
}

const Home = () => {
    const [data, setData] = useState(DATA);
    
    useEffect(() => {
        try{
            database()
            .ref('/')
            .on('value', snapshot => {
                const tmp = [];
                snapshot.forEach(( child ) => {
                    const childData = [];
                    child.forEach(( data ) => {
                        childData.unshift({
                            key : data.key,
                            memo: data.val(),
                            regdate: data.val().regdate,
                        })
                    })
                    const memo = [];
                    childData.forEach(( m ) => {
                        memo.push(m.memo.memo);
                    })
                    tmp.unshift({
                        title : child.key,
                        data : memo,
                    });
                });
                var idx = 0;
                DATA.forEach(( data ) => {
                    if(tmp.find(element => element.title == data.title) == undefined){
                        tmp.push({title: data.title, data: data.data});
                    }
                    idx++;
                })
                
                tmp.forEach(( data ) => {
                    var idx;
                    if((idx = tmp.find(element=> element.title == "Best게시판"))!= undefined){
                        
                    }
                })
                setData(tmp);
            });
        } catch(error){
            alert(error.toString());
        }
    }, [])

    return (
        <SafeAreaView style = {{
            flex: 1, 
            justifyContent: 'center', 
            alignContent: 'center', 
            backgroundColor: '#ffffe0'
            // lightyello #ffffe0  , white #ffffff
        }}>
            <Image source={formenu} style={{
                width: 80, 
                height: 80, 
                marginLeft: 20,
                borderRadius: 0,
                marginTop: 7
             }}></Image>
            <BottomHome data = {data}/>
        </SafeAreaView>
    );   
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

export default Home; 