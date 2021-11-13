import React, {useEffect, useRef, useState, useContext} from 'react';
import {SafeAreaView, Text, View, 
        TextInput, Button, StatusBar, TouchableOpacity} from 'react-native';
import database, { firebase } from '@react-native-firebase/database';
import { FlatList } from 'react-native-gesture-handler';
import { UserContext } from '../contexts/UserContext';
import { ComContext } from '../contexts/ComContext';

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const Post = ({navigation}) => {
    const {user: {id,com}} = useContext(UserContext);
    const {com: {Title,Story,dat}} = useContext(ComContext)

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#ffffe0', }}>
                <View style={{flex:1,}}>        
                    <View style={{flex:1, backgroundColor:'#fff,'}}>
                        <Text style={{
                            backgroundColor:'#dcdcdc', 
                            padding:10, 
                            flex:1, 
                            fontSize: 25, 
                            borderRadius:5,
                            marginLeft:10,
                            marginRight:10,
                            marginTop: 10,
                        }}>
                               {Title}                     
                        </Text> 
                    </View>

                    <View style={{flex:5, backgroundColor:'#ffffe0', }}>
                        <Text style={{
                            backgroundColor:'#eee', 
                            padding:10, 
                            flex:1, 
                            fontSize: 20,
                            marginLeft:10,
                            marginRight:10, 
                            marginBottom:10,
                            borderRadius:5,
                        }}>
                        ▶    {Story} {dat}
                        </Text>
                    </View>
                    <StatusBar style="auto" />
                </View>
            </SafeAreaView>
    );    
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

export default Post;