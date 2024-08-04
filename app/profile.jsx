import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from './bottomnavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ProfileScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetailsJson = await AsyncStorage.getItem('userDetails');
        if (userDetailsJson) {
          const userDetails = JSON.parse(userDetailsJson);
          setFullName(userDetails.fullName);
          setEmail(userDetails.email);
        } else {
          console.log('Error', 'No user details found.');
        }
      } catch (error) {
        console.log('Error retrieving user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userDetails');
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#004aad" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.details}>Full Name: {fullName}</Text>
          <Text style={styles.details}>Email: {email}</Text>
        </View>
        <View style={styles.logoutWrapper}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={24} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavBar activeScreen="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'space-between', // Ensures the bottom bar is pushed to the bottom
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between', // Make space for logout button
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  details: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  logoutWrapper: {
    alignItems: 'center',
    marginBottom: 75, // Ensure there's space above the bottom nav
  },
  logoutButton: {
    padding: 16,
    backgroundColor: '#004aad',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
  },
  logoutText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});