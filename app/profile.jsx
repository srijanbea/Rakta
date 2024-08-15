import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';
import BottomNavBar from './bottomnavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [totalBloodDonated, setTotalBloodDonated] = useState('');
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
          setDateOfBirth(userDetails.dateOfBirth);
          setBloodGroup(userDetails.bloodGroup);
          setTotalBloodDonated(userDetails.totalBloodDonated);
          set
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>{fullName}</Text>
            <TouchableOpacity style={styles.editButton}>
              <Icon name="edit" size={8} color="#004aad" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileSection}>
          <Image source={require('../assets/images/placeholder.jpg')} style={styles.profileImage} />
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{dateOfBirth}</Text>
            <View style={styles.profileDescription}>
              <View style={styles.leftInfoColumn}>
                <Text style={styles.profileLabel}>Blood Group</Text>
                <Text style={styles.profileValue}>{bloodGroup}</Text>
              </View>
              <View style={styles.rightInfoColumn}>
                <Text style={styles.profileLabel}>Donations</Text>
                <Text style={styles.profileValue}>{totalBloodDonated}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.logoutWrapper}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={24} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
  scrollContainer: {
    flex: 1,
    paddingBottom: 20, // Adjust padding if needed
  },
  header: {
    backgroundColor: '#004aad',
    padding: 20,
  },
  headerTextContainer: {
    alignItems: 'flex-end',
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 25,
    marginTop: 10,
  },
  editButtonText: {
    color: '#004aad',
    marginLeft: 5,
    fontSize: 8,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'relative',
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
    position: 'absolute',
    top: -60,
    left: 20,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    marginLeft: 140,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileDescription: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 35,
  },
  rightInfoColumn: {
    position: 'absolute',
    marginLeft: 259,
  },
  leftInfoColumn: {
    position: 'absolute',
    marginLeft: 141,
  },
  profileLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  profileValue: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  logoutWrapper: {
    alignItems: 'center',
    marginBottom: 75,
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

