import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavBar from './bottomnavbar';

export default function ProfileScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [dob, setDob] = useState('');
  const [lastDonationDate, setLastDonationDate] = useState('');
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
          setBloodGroup(userDetails.bloodGroup);
          setPhoneNumber(userDetails.phoneNumber);
          setLocation(userDetails.location);
          setDob(userDetails.dob);
          setLastDonationDate(userDetails.lastDonationDate);
        } else {
          console.log('No user details found.');
        }
      } catch (error) {
        console.error('Error retrieving user details:', error);
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
      console.error('Error logging out:', error);
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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-6/445161318_747497967588769_1677089034473477694_n.jpg?stp=cp6_dst-jpg&_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=p7FhwVnLc_IQ7kNvgFJe7UB&_nc_ht=scontent.fktm1-1.fna&oh=00_AYCUD2-SyAOLFN7vm70Q7aETFgybaONpvREhLAVngDPtmA&oe=66BDF451' }} // Placeholder for profile picture
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{fullName}</Text>
          <Text style={styles.userDetails}>Blood Group: {bloodGroup}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Icon name="person" size={20} color="#004aad" />
            <Text style={styles.details}>{fullName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="email" size={20} color="#004aad" />
            <Text style={styles.details}>{email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="phone" size={20} color="#004aad" />
            <Text style={styles.details}>Phone: {phoneNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="location-on" size={20} color="#004aad" />
            <Text style={styles.details}>Location: {location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="calendar-today" size={20} color="#004aad" />
            <Text style={styles.details}>DOB: {dob}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="history" size={20} color="#004aad" />
            <Text style={styles.details}>Last Donation: {lastDonationDate}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
    paddingVertical: 20,
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
  userDetails: {
    fontSize: 16,
    color: '#dbe1e8',
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  details: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#004aad',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    elevation: 5,
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});
