import React, { useRef, useState, useContext } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, 
        Text, TouchableOpacity, View, ScrollView, } from 'react-native';
import formenu from '../assets/ww.png';
import home from '../assets/home.png';
import search from '../assets/search.png';
import logout from '../assets/logout.png';
import menu from '../assets/menu.png';
import close from '../assets/close.png';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Community}from '../screens';
import { UserContext } from '../contexts/UserContext';

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//


const TabButton = (currentTab, setCurrentTab, title, image, navigation) => {
  return (
    <TouchableOpacity onPress={() => {
      if (title == "로그아웃") {
        navigation.navigate("Login");
        setCurrentTab(title);
      }
      else if(title == "홈"){
        navigation.navigate("Home");
        setCurrentTab(title);
      }
      else {
          const regex = new RegExp('(게시판)$');
          if(regex.test(title)) {
            navigation.navigate("Community", {
                CommunityType: title
            });
            setCurrentTab(title);
          }
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? "#5359D1" : "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#5359D1" : "white"
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const Tabmenu = ({ navigation }) => {
  const [currentTab, setCurrentTab] = useState("홈");
  const { user: {name} } = useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{padding: 15, left : 25 }}>
        <Image source={formenu} style={{
            width: 80,
            height: 80,
            borderRadius: 0,
            marginTop: 7
        }}></Image>
          
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20
        }}>{name}</Text>
        
        <TouchableOpacity>  
          <Text style={{fontSize: 13,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 10
            }}>회원정보 수정</Text>
        </TouchableOpacity>

        <ScrollView>
            <View style={{ flexGrow: 1, marginTop: 50 }}>    
                {TabButton(currentTab, setCurrentTab, "홈", home, navigation)}
                {TabButton(currentTab, setCurrentTab, "자유게시판", search, navigation)}
                {TabButton(currentTab, setCurrentTab, "루틴 및 자세게시판", search, navigation)}
                {TabButton(currentTab, setCurrentTab, "식단정보게시판", search, navigation)}
                {TabButton(currentTab, setCurrentTab, "Best게시판", search, navigation)}  
                {TabButton(currentTab, setCurrentTab, "로그아웃", logout, navigation)}
            </View>
        </ScrollView>
      </View>      
    </SafeAreaView>
  );
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

export default Tabmenu;

