import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, Text} from 'react-native';
import db from './db'
function fb() {
  const [loading, setLoading] = useState(true);
  const [content, setContents] = useState([]);
  var communityId = 'V5bVZhdtFHiLXHiuFnLJ'
  useEffect(() => {
    const subscriber = db
      .collection('community').doc('V5bVZhdtFHiLXHiuFnLJ').collection('content')
      .onSnapshot(querySnapshot => {
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
  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={content}
      renderItem={({ item }) => (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text >{item.title}</Text>
        <View style={{justifyContent: 'center', flexDirection: "row",flexWrap: "wrap",}}>
          <Text >{item.content}</Text>
          <Text>{item.like}</Text>
          </View>
        </View>
      )}
    />
  );
}
export default fb;
