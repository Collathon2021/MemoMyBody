
// import React, {useState, useEffect} from 'react';
// import {ActivityIndicator, FlatList, View, Text} from 'react-native';
// import db from '../../../test/db';
// import {Button} from '../../components';
// function Community({navigation}) {
//   const [loading, setLoading] = useState(true);
//   const [content, setContents] = useState([]);

//   /// TODO: 생성자?로 원하는 게시판 글 받기.
//   var communityId = 'V5bVZhdtFHiLXHiuFnLJ';

//   useEffect(() => {
//     const subscriber = db
//       .collection('community')
//       .doc(communityId)
//       .collection('content')
//       .onSnapshot(querySnapshot => {
//         const content = [];

//         querySnapshot.forEach(documentSnapshot => {
//           content.push({
//             ...documentSnapshot.data(),
//             key: documentSnapshot.id,
//           });
//         });

//         setContents(content);
//         setLoading(false);
//       });

//     // Unsubscribe from events when no longer in use
//     return () => subscriber();
//   }, []);
//   if (loading) {
//     return <ActivityIndicator />;
//   }

//   return (
//     <FlatList
//       data={content}
//       renderItem={({item}) => (
//         <View style={{alignItems: 'center', justifyContent: 'center'}}>
//           <Button onPress = {() => navigation.push('Post', {item, communityId: communityId})}>
//             <Text>{item.title}</Text>
//             <View
//               style={{
//                 justifyContent: 'center',
//                 flexDirection: 'row',
//                 flexWrap: 'wrap',
//               }}>
//               <Text>{item.content}</Text>
//               <Text>{item.like}</Text>
//             </View>
//           </Button>
//         </View>
//       )}
//     />
//   );
// }
// export default Community;
