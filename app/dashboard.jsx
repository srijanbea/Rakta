import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Corrected import

export default function DashboardScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const auth = getAuth();
  const firestore = getFirestore();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth.currentUser;
      if (user) {
        setEmail(user.email);
        
        // Query Firestore to get user details based on email
        const usersCollection = collection(firestore, 'users');
        const userQuery = query(usersCollection, where('email', '==', user.email));
        
        try {
          const querySnapshot = await getDocs(userQuery);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            setUsername(userDoc.username);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      // Sign out from Firebase Authentication
      await signOut(auth);

      // Optionally clear any locally stored data
      await AsyncStorage.removeItem('userEmail'); // Clear the email from AsyncStorage

      // Reset navigation to login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Dashboard</Text>
      <Text style={styles.details}>Email: {email}</Text>
      <Text style={styles.details}>Username: {username}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  details: {
    fontSize: 18,
    marginBottom: 16,
  },
});
