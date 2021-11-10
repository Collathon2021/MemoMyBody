// 홈 메인 화면
import React, {useState, useEffect} from 'react';
import db from '../../../test/db';
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './theme';
import {Button} from '../../components';

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

function Post({route, navigation}) {
  console.log(props)
  var communityId = route.params.communityId;
  const [loading, setLoading] = useState(true);
  const [props, setProps] = useState(route.params.item);
  const [content, setContents] = useState([]);

  function getData() {
  useEffect(() => {
    const subscriber = db
      .collection('community')
      .doc(communityId)
      .collection('content')
      .doc(props.key)
      .collection('comment')
      .onSnapshot(querySnapshot => { /*  FIREBASE READ */
        const content = [];

        querySnapshot.forEach(documentSnapshot => {
          content.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setContents(content);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
}

getData();
  if (loading) {
    return <ActivityIndicator />;
  }
  console.log(props);
  return (
    <View style={styles.eachView}>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <Text>{props.title}</Text>
        <Text>{props.userId}</Text>
      </View>
      <ContentReference></ContentReference>

      <Text>{props.content}</Text>

      <FlatList
        data={content}
        renderItem={({item}) => (
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <Text>{item.content}</Text>
            <Text>{item.userId}</Text>
          </View>
        )}
      />

      <Button
        onPress={() =>
          navigation.push('PostEditor', {content:props, communityId: communityId, getData : getData})
        }>
        <Text> Edit </Text>
      </Button>
    </View>
  );
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
function ContentReference() {
  return <View />;
}
export default Post;
