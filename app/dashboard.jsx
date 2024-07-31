import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Platform, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from './bottomnavbar'; // Adjust the path as needed

export default function DashboardScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState(''); // Ensure this is initialized
  const [profilePicture, setProfilePicture] = useState('');
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
            setFullName(userDoc.fullName); // Ensure fullName is set correctly
            setProfilePicture(userDoc.profilePicture);

            // Store user details in AsyncStorage
            await AsyncStorage.setItem('userDetails', JSON.stringify({
              username: userDoc.username,
              email: userDoc.email,
              fullName: userDoc.fullName,
              profilePicture: userDoc.profilePicture
            }));
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

  const navigateToNotifications = () => {
    navigation.navigate('notifications'); // Make sure this is the correct route name for the Notifications
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <TouchableOpacity onPress={navigateToNotifications}>
          <Icon name="notifications" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>GIVE THE GIFT OF LIFE</Text>
        <Text style={styles.heading}>
          Donate <Text style={styles.bold}>Blood</Text>
        </Text>
        <View style={styles.statsContainer}>
          <View style={[styles.statsCard, styles.statsCardAccent]}>
            <Text style={styles.statsCountAccent}>0</Text>
            <Text style={styles.statsLabelAccent}>Blood Requested</Text>
          </View>
          <View style={[styles.statsCard, styles.statsCardDefault]}>
            <Text style={styles.statsCount}>0</Text>
            <Text style={styles.statsLabel}>Lives Saved</Text>
          </View>
        </View>
        <Text style={styles.helpText}>
          Each donation can help save up to <Text style={styles.boldText}>3 lives!</Text>
        </Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('CreateDonorProfile')}>
            <Icon name="person-add" size={35} color="#004aad" />
            <Text style={styles.optionTitle}>Create Donor Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('DonateBlood')}>
            <Icon name="bloodtype" size={35} color="#004aad" />
            <Text style={styles.optionTitle}>Donate Blood</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('RequestForBlood')}>
            <Icon name="diversity-1" size={35} color="#004aad" />
            <Text style={styles.optionTitle}>Request Blood</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('DonationHistory')}>
            <Icon name="history" size={35} color="#004aad" />
            <Text style={styles.optionTitle}>My Records</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#004aad',
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  content: {
    padding: 16,
    flexGrow: 1, // Ensures the content area grows to fill available space
  },
  subtitle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  heading: {
    fontSize: 40,
    color: '#004aad',
    fontWeight: 'normal', // Normal weight for 'Donate'
    textAlign: 'center',
    marginBottom: 16,
  },
  bold: {
    fontWeight: 'bold', // Bold weight for 'Blood'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center cards horizontally
    marginBottom: 16, // Space between stats and cards below
  },
  statsCard: {
    width: '45%', // Increase width of each card
    aspectRatio: 1, // Make the card square
    padding: 16, // Increase padding
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8, // Add horizontal margin for spacing
  },
  statsCardAccent: {
    backgroundColor: '#004aad', // Accent color for the first card
  },
  statsCardDefault: {
    backgroundColor: '#f8f8ff', // Default background color for the second card
  },
  statsCountAccent: {
    fontSize: 60, // Decrease font size for the count
    fontWeight: 'bold',
    color: '#fff', // White color for the digit on the accent card
    marginBottom: 4, // Space between digit and text
  },
  statsLabelAccent: {
    fontSize: 12, // Decrease font size for the label
    color: '#fff', // White color for text on the accent card
    fontWeight: 'bold',
  },
  statsCount: {
    fontSize: 60, // Decrease font size for the count
    fontWeight: 'bold',
    color: '#aaa', // Color for the digit on the default card
    marginBottom: 4, // Space between digit and text
  },
  statsLabel: {
    fontSize: 12, // Decrease font size for the label
    color: '#aaa', // Grey color for text on the default card
    fontWeight: 'bold',
  },
  helpText: {
    fontSize: 16, // Adjust font size
    color: 'grey', // Grey color for the text
    textAlign: 'center',
    marginBottom: 16, // Space below the help text
  },
  boldText: {
    fontWeight: 'bold', // Bold weight for '3 lives !'
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16, // Increase padding
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#004aad',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12, // Increase margin between cards
  },
  optionTitle: {
    fontSize: 18, // Increase font size
    color: '#333',
    marginLeft: 12, // Increase margin between icon and text
  },
});
