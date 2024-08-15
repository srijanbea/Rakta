import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from './bottomnavbar';

export default function ProfileScreen() {
  const [isAvailableToDonate, setIsAvailableToDonate] = useState(false);
  const [fullName, setFullName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetailsJson = await AsyncStorage.getItem('userDetails');
        if (userDetailsJson) {
          const userDetails = JSON.parse(userDetailsJson);
          setFullName(userDetails.fullName);
          setProfilePic(userDetails.profilePic); // Assuming profilePic is stored in AsyncStorage
          setIsAvailableToDonate(userDetails.isAvailableToDonate);
        }
      } catch (error) {
        console.error('Error retrieving user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const toggleAvailableToDonate = async () => {
    try {
      setIsAvailableToDonate(!isAvailableToDonate);
      await AsyncStorage.setItem(
        'userDetails',
        JSON.stringify({
          fullName,
          profilePic,
          isAvailableToDonate: !isAvailableToDonate,
        })
      );
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileHeader}>
          <Image
            source={profilePic ? { uri: profilePic } : require('../assets/images/user-placeholder.png')}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{fullName}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Available to Donate</Text>
            <Switch
              value={isAvailableToDonate}
              onValueChange={toggleAvailableToDonate}
              trackColor={{ false: '#767577', true: '#004aad' }}
              thumbColor={isAvailableToDonate ? '#004aad' : '#f4f3f4'}
            />
          </View>
        </View>
      </ScrollView>

      <BottomNavBar activeScreen="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollViewContent: {
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#004aad',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 4,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 18,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});
