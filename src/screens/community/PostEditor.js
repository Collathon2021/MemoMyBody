// 홈 메인 화면
import React, {useState, useRef, useEffect} from 'react';
import db from '../../../test/db';

import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import {Image, Input, Button} from '../../components';

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eachView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

function PostEditor({route, navigation}) {
  var props = route.params.content;
  var communityId = route.params.communityId;
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [reference, setReference] = useState(props.reference);
  console.log(reference);
  const titleRef = useRef();
  const contentRef = useRef();

  function updateData() {
    console.log("UPDATE");
    console.log(title)
    db.collection('community')
      .doc(communityId)
      .collection('content')
      .doc(props.key)
      .update({title:title,content:content,reference:reference}).then(console.log("DONE"), console.log(content));
  }
  return (
    <View style={styles.eachView}>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <Input
          label="title"
          value={title}
          onChangeText={text => setTitle(text)}
          placeholder="title"
          returnKeyType="next">
          {title}
        </Input>
        <Text>{props.userId}</Text>
      </View>
      <ContentReference></ContentReference>

      <Input
        label="content"
        value={content}
        onChangeText={text => setContent(text)}
        placeholder="content"
        returnKeyType="next">
        {content}
      </Input>
      <FlatList
        data={reference}
        renderItem={({item}) => (
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <Text>{item}</Text>
          </View>
        )}
      />
      <Button onPress={() => {}}> 추가 </Button>
      <Button label="수정완료" onPress={() => {
        updateData();navigation.goBack("asdf"); /*  FIREBASSE UPDATE  */
        route.params.getData()}}>
        수정 완료
      </Button>
    </View>
  );
}

// 의료
// 내가 살기 좋은 곳
// 자녀가 학습 문제
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
function ContentReference() {
  return <View />;
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

export default PostEditor;
