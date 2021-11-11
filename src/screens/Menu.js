import { StatusBar } from 'react-native';
import React, { useRef, useState, useContext } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, 
        Text, TouchableOpacity, View, Modal, Pressable,
        ScrollView, } from 'react-native';
import formenu from '../assets/ww.png';
import home from '../assets/home.png';
import search from '../assets/search.png';
import notifications from '../assets/bell.png';
import settings from '../assets/settings.png';
import logout from '../assets/logout.png';
import menu from '../assets/menu.png';
import close from '../assets/close.png';
import { createStackNavigator } from '@react-navigation/stack';
import {Home, Community}from '../screens';
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

const Stack = createStackNavigator();

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//


export const Menu1 = ({navigation}) => {
  const [currentTab, setCurrentTab] = useState("홈");
  const [showMenu, setShowMenu] = useState(false); 
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(true);
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
        {
            // Over lay View...
        }

        <Animated.View style= {{
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 15,
          paddingVertical: 20,
          borderRadius: showMenu ? 15 : 0,
          // Transforming View...
          transform: [
              { scale: scaleValue },
              { translateX: offsetValue }
          ]
        }}>
            {
            // Menu Button...
            }

            <Animated.View style={{
            transform: [{
                translateY: closeButtonOffset
            }]
            }}>
            <TouchableOpacity onPress={() => {
                // Do Actions Here....
                // Scaling the view...
                Animated.timing(scaleValue, {
                toValue: showMenu ? 1 : 0.88,
                duration: 300,
                useNativeDriver: true
                })
                .start()

                Animated.timing(offsetValue, {
                // YOur Random Value...
                toValue: showMenu ? 0 : 230,
                duration: 300,
                useNativeDriver: true
                })
                .start()

                Animated.timing(closeButtonOffset, {
                // YOur Random Value...
                toValue: !showMenu ? -30 : 0,
                duration: 300,
                useNativeDriver: true
                })
                .start()

                setShowMenu(!showMenu);
            }}>

                <Image source={showMenu ? close : menu} style={{
                width: 20,
                height: 20,
                tintColor: 'black',
                marginTop: 40,

                }}></Image>

            </TouchableOpacity>

                <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: 'black',
                    paddingTop: 20
                }}>{currentTab}</Text>
                
                
            </Animated.View>
            <View style={{position:'absolute', right:20, bottom:20, zIndex:10,
                }}>
                <Text style={{textAlign: 'center',
                }}>Memo My Body</Text>
            </View>
        </Animated.View>
    </SafeAreaView>
    

  );
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const TabButton = (currentTab, setCurrentTab, title, image, navigation) => {
  return (
    <TouchableOpacity onPress={() => {
      if (title == "로그아웃") {
        // Do your Stuff...
        navigation.navigate("Login");
        setCurrentTab(title);
      }
      else if(title == "홈"){
        navigation.navigate("Home");
        setCurrentTab(title);
      }
      else{
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


const Panel = ({navigation})=>{
    return(
        <Stack.Navigator
            initialRouteName='Menu1'
            screenOptions={{  
                headerShown: false
            }}
        >
            <Stack.Screen 
                name = "Menu1"
                component = {Menu1}
                navigation = {navigation}
            />
            <Stack.Screen 
                name = "Community"
                component = {Community}
            />
            <Stack.Screen 
                name = "Home"
                component = {Home}
            />
        </Stack.Navigator>
    );
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const Menu = ({navigation})=>{
    return(
        <Panel navigation={navigation}/>
    );
};

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

export default Menu;

