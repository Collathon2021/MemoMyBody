import {RNCamera} from 'react-native-camera';

import React, { Component, useEffect, useState  } from 'react';

import { Text, Image, View, Button  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

const CameraScreen = () =>{ 
    const cameraRef = React.useRef(null);
    const [image, useImage] = useState(null);
    const takePhoto = async () => {
        console.log('cameraRef', cameraRef);
        if (cameraRef) {
          const data = await cameraRef.current.takePictureAsync({
              quality: 1,
              exif: true,
          });
          useImage(data);
          console.log('😻 data', data);
        }
      };
    if(image != null){
        return(
            <>
                <Image 
                style={{width: '100%', height: '100%', alignItems: 'flex-end', }} source={image}>
                </Image>
                <View style={{position: 'absolute',bottom: 25, flexDirection:'row'}}>
                    <View style={{flex:1, alignItems : 'center'}}>
                        <Icon name="camera" size={30} color="#e33057" onPress={()=>{useImage(null)}}/>
                    </View>
                    <View style={{flex:1, alignItems : 'center'}}>
                        {/* <Button title="업로드" onPress={()=>{console.log("navigate")}}></Button> */}
                        <Icon name= "upload" size={30} color="#e33057" onPress={()=>{console.log("navigate")}}/>
                    </View>
                </View>
            </>
        );
    }
    return (
        <>
            <RNCamera
                ref={cameraRef}
                style={{width: '100%', height: '100%', alignItems: 'flex-end', }}
                captureAudio={false}
            >
            </RNCamera>
            <View style={{position: 'absolute',bottom: 25, alignSelf: 'center'}}>
                <Icon name="camera" size={50} color="#e33057" onPress={takePhoto}/>
            </View>
        </>
    );
}
export default CameraScreen;