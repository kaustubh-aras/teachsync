import {StyleSheet, Text, View} from 'react-native';
import {useContext} from 'react';
import {AuthContext} from '../../../context/authContext';

export default function Home() {
  const [state] = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>Home</Text>
      <Text>{JSON.stringify(state, null, 4)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// Import necessary React Native components

// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Title, Card, Button, Avatar } from 'react-native-paper';

// const Home = () => {
//   return (
//     <View style={styles.container}>
//       <Title style={styles.title}>Home Dashboard</Title>

//       {/* Cards for different sections */}
//       <View style={styles.cardContainer}>
//         <Card style={styles.card}>
//           <Card.Title title="Total Sales" />
//           <Card.Content>
//             <Title>$1,234</Title>
//           </Card.Content>
//           <Card.Actions>
//             <Button>View Details</Button>
//           </Card.Actions>
//         </Card>

//         <Card style={styles.card}>
//           <Card.Title title="New Orders" />
//           <Card.Content>
//             <Title>45</Title>
//           </Card.Content>
//           <Card.Actions>
//             <Button>View Details</Button>
//           </Card.Actions>
//         </Card>
//       </View>

//       {/* User profile */}
//       <Card style={styles.userCard}>
//         <Card.Title title="User Profile" />
//         <Card.Content style={styles.userCardContent}>
//           <Avatar.Image
//             size={80}
//             // source={require('./path-to-your-profile-image.jpg')}
//           />
//           <View style={styles.userInfo}>
//             <Title>Your Name</Title>
//             <Button>Edit Profile</Button>
//           </View>
//         </Card.Content>
//       </Card>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   cardContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   card: {
//     flex: 1,
//     marginHorizontal: 8,
//   },
//   userCard: {
//     marginTop: 20,
//   },
//   userCardContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   userInfo: {
//     marginLeft: 16,
//     flex: 1,
//   },
// });

// export default Home;


