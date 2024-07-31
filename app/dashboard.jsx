// DashboardScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from './bottomnavbar'; // Adjust the path as needed

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
          Alert.alert('Error', 'Failed to load user details.');
        }
      } else {
        Alert.alert('Error', 'No user is logged in.');
      }
    };

    fetchUserDetails();
  }, [auth, firestore]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('userEmail'); // Clear the email from AsyncStorage

      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    } catch (error) {
      console.log('Error logging out:', error);
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  const navigateToNotifications = () => {
    navigation.navigate('notifications'); // Make sure this is the correct route name for the Notifications
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.titleText}>Dashboard</Text>
        <TouchableOpacity onPress={navigateToNotifications}>
          <Icon name="notifications" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.details}>Email: {email}</Text>
          <Text style={styles.details}>Username: {username}</Text>
        </View>
        <View style={styles.actionsContainer}>
          <Button title="Donate Blood" onPress={() => navigation.navigate('DonateBlood')} color="#ff7e5f" />
          <Button title="Find a Donor" onPress={() => navigation.navigate('FindDonor')} color="#ff7e5f" />
          <Button title="My Profile" onPress={() => navigation.navigate('Profile')} color="#ff7e5f" />
          <Button title="Logout" onPress={handleLogout} color="#ff7e5f" />
        </View>
      </View>
      <BottomNavBar activeScreen="dashboard" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'space-between', // Ensures the bottom bar is pushed to the bottom
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff7e5f',
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1, // Takes the available space between the title bar and bottom nav
    padding: 16,
  },
  infoContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  details: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  actionsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 16,
  },
});
