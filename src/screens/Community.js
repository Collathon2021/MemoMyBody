import React, {useEffect, useRef, useState, useContext } from 'react';
import {SafeAreaView, StyleSheet, Text, View, 
        TextInput, Button, StatusBar, TouchableOpacity} from 'react-native';
import database, { firebase } from '@react-native-firebase/database';
import { FlatList } from 'react-native-gesture-handler';
import { UserContext } from '../contexts/UserContext';

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const Community =({route, navigation})=>{
    const {CommunityType} = route.params
    const [postNumber, setPostNumber] = useState(0);
    const [text, setText] = useState("");
    const text1 =useRef("");
    const [data, setData] = useState("");
    const [writeMode, setWriteMode] = useState(false);
    const { user: {name} } = useContext(UserContext);

    const saveMemo = () => {
        var key = Math.random().toString().replace(".", "");
        var memo = text;
        try{
            firebase
            .database()
            .ref({CommunityType}.CommunityType.toString() +"/" + name)
            .set({
                memo: memo,
                regdate: new Date().toString(),
            }).then(() => {
                if(text1.current)
                    text1.current.clear();
                console.log({name});
            })
        }
        catch(error){
            alert(error.toString());
        }
    }

    const delMemo = ( key ) => {
        try{
            firebase
            .database()
            .ref({CommunityType}.CommunityType.toString() + "/" + key)
            .set(null);
        }
        catch(error){
            alert(error);
        }
    }

    const renderItem = ({ item }) => { 
        return(
            <SafeAreaView>
                <View style={{
                    padding:15, 
                    borderBottomColor:'#aaa',
                    borderBottomWidth: 1,
                    flexDirection:'row',
                }}>
                    <Text style={{flex:1, }}>
                        ▶  {item.memo} 
                    </Text>
                    {/*<Button title="삭제" onPress = {() => delMemo(item.key)}/>*/}
                </View>
            </SafeAreaView>
        )
    }

    useEffect(() => {
        var changeDataRef = firebase
                            .database()
                            .ref({CommunityType}.CommunityType.toString())
                            .orderByChild("regdate");
        try{
            changeDataRef.on("value", (snapshot)=>{
                const tmp = [];
                snapshot.forEach((child)=>{
                    tmp.unshift({
                        key : child.key,
                        memo: child.val().memo,
                        regdate: child.val().regdate,
                    });
                });
                setData(tmp);
            });
        }
        catch(error){
            alert("not valid ");
        }
    }, [])
    
    if( writeMode ) { //글쓰기
        return(
            <SafeAreaView style={{flex:1, backgroundColor:'#9c0', }}>
                <View style={{flex:1, }}>        
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <TouchableOpacity style={{padding:15, }} onPress={()=>setWriteMode(false)}>
                            <Text style={{fontSize:18, }}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{padding:15, }}  onPress={()=>{
                            saveMemo();
                            setWriteMode(false);
                        }} >
                            <Text style={{fontSize:18, }}>저장</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, backgroundColor:'#fff', }}>
                        <TextInput style={{backgroundColor:'#eee', padding:5, flex:1, }}
                            ref ={text1}
                            onChangeText={text=> setText(text)}
                            multiline
                            placeholder="내용을 입력해주세요" /> 
                    </View>

                    <StatusBar style="auto" />
                </View>
            </SafeAreaView>
        );
    }

    return(
        <View style={{backgroundColor:'#ffffe0', flex:1}}>
            <SafeAreaView style={{flex:1, }}>
                <View style={{ padding:15, marginTop: 10}}> 
                    <Text style = {{
                        textAlign:'center', 
                        fontSize: 18,
                        fontWeight: 'bold', 
                        color : '#1c1c26' 
                    }}>{CommunityType}</Text>
                </View> 
                
                <View style = {{ 
                    backgroundColor: '#dcdcdc', 
                    marginTop: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    borderRadius: 15,                    
                }}>
                    <FlatList data = {data} renderItem = {renderItem} 
                              style ={{padding: 10,} }
                    />
                </View>

                <View style={{position:'absolute', right:20, bottom:20, zIndex:10,  }}>
                    <View style={{
                            width:50, 
                            height:50, 
                            backgroundColor:'tomato', 
                            borderRadius:25,
                            alignItems:'center', 
                            justifyContent:'center', 
                    }}>          
                        <TouchableOpacity onPress={() => setWriteMode(true)}>       
                        <Text style={{color:'#ffff', }}> 글쓰기 </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//


export default Community;