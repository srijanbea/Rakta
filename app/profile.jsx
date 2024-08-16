import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';
import BottomNavBar from './bottomnavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { storage, db } from '../firebaseConfig'; // Import firebase configuration

export default function ProfileScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [countryRegion, setCountryRegion] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [totalBloodDonated, setTotalBloodDonated] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingProfilePicture, setLoadingProfilePicture] = useState(false); // New state for loading
  const [availableToDonate, setAvailableToDonate] = useState(''); // New state for availability
  const navigation = useNavigation();

  const handleNavigateToUpdateProfileInfo = () => {
    navigation.navigate('updateprofileinfo');
  };

  const handleNavigateToUpdateMedicalInfo = () => {
    navigation.navigate('updatemedicalinfo');
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetailsJson = await AsyncStorage.getItem('userDetails');
        if (userDetailsJson) {
          const userDetails = JSON.parse(userDetailsJson);
          setFullName(userDetails.fullName);
          setEmail(userDetails.email);

  
          const dob = new Date(userDetails.dateOfBirth);
          const age = new Date().getFullYear() - dob.getFullYear();
          setDateOfBirth(age + " yrs");
          setCountryRegion(userDetails.countryRegion);
          setBloodGroup(userDetails.bloodGroup);
          setTotalBloodDonated(userDetails.totalBloodDonated);
          setAvailableToDonate(userDetails.availableToDonate || false); // Load availability status
  
          // Only update profile picture if the URL has changed
          if (userDetails.profilePicture !== profilePicture) {
            setProfilePicture(userDetails.profilePicture || '');
          }
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
  }, [profilePicture]); // This dependency might cause issues, remove if unnecessary

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

  const handleUpdateProfilePicture = async () => {
    setLoadingProfilePicture(true); // Show loading indicator

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      const { uri } = result.assets[0];
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {
        const email = user.email;
  
        // Reference to Firebase Storage
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
  
        try {
          // Upload profile picture to Firebase Storage
          await uploadBytes(storageRef, blob);
          const downloadURL = await getDownloadURL(storageRef);
  
          // Update AsyncStorage
          const userDetailsJson = await AsyncStorage.getItem('userDetails');
          const userDetails = JSON.parse(userDetailsJson);
          userDetails.profilePicture = downloadURL;
          await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
          
          // Update Firestore
          const usersCollection = collection(db, 'users');
          const userQuery = query(usersCollection, where('email', '==', email));
          const querySnapshot = await getDocs(userQuery);
  
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0]; // Get the first document
            const userDocRef = doc(db, 'users', userDoc.id); // Get the reference to the document
  
            // Update the profilePicture field
            await updateDoc(userDocRef, { profilePicture: downloadURL });
  
            // Update local state
            setProfilePicture(downloadURL);
          } else {
            console.error('No user document found with this email.');
          }
        } catch (error) {
          console.error('Error uploading profile picture:', error);
        } finally {
          setLoadingProfilePicture(false); // Hide loading indicator
        }
      } else {
        console.error('No user is signed in.');
        setLoadingProfilePicture(false); // Hide loading indicator
      }
    } else {
      setLoadingProfilePicture(false); // Hide loading indicator if user cancels
    }
  };

  const handleToggleAvailability = async () => {
    try {
      // Toggle the state
      const newAvailability = !availableToDonate;
      console.log('Toggling availability to:', newAvailability); // Add this line for debugging
      setAvailableToDonate(newAvailability);
      
      // Update AsyncStorage
      const userDetailsJson = await AsyncStorage.getItem('userDetails');
      const userDetails = JSON.parse(userDetailsJson);
      userDetails.availableToDonate = newAvailability;
      await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
    
      // Get current user email
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {
        const email = user.email;
  
        // Update Firestore
        const usersCollection = collection(db, 'users');
        const userQuery = query(usersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(userQuery);
  
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0]; // Get the first document
          const userDocRef = doc(db, 'users', userDoc.id); // Get the reference to the document
          
          // Update the availableToDonate field
          await updateDoc(userDocRef, { availableToDonate: newAvailability });
          console.log('Updated Firestore with availability:', newAvailability); // Add this line for debugging
        } else {
          console.error('No user document found with this email.');
        }
      } else {
        console.error('No user is signed in.');
      }
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const handleNavigateToPrivacyPolicy = () => {
    // Navigation logic here
  };

  const handleNavigateToContactUs = () => {
    // Navigation logic here
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
            <TouchableOpacity style={styles.editButton} onPress={handleUpdateProfilePicture}>
              <Icon name="edit" size={8} color="#004aad" />
              <Text style={styles.editButtonText}>Update Profile Picture</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageWrapper}>
            <Image 
              source={profilePicture ? { uri: profilePicture } : require('../assets/images/placeholder.jpg')} 
              style={styles.profileImage} 
            />
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.age}>{dateOfBirth}<Text style={styles.countryRegion}>  {countryRegion}</Text>
            </Text>
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

        {/* New container for availability toggle */}
        <View style={styles.availabilityContainer}>
          <Text style={styles.availabilityLabel}>I am currently available to donate</Text>
          <Switch
            value={availableToDonate}
            onValueChange={handleToggleAvailability}
            trackColor={{ true: '#004aad', false: '#fff' }}
            thumbColor={availableToDonate ? '#fff' : '#fff'}
            style={styles.switch}
          />
        </View>
        <View style={styles.cardsContainer}>
  <TouchableOpacity style={styles.card} onPress={handleNavigateToUpdateProfileInfo}>
    <Icon name="person" size={25} color="#004aad" style={styles.cardIcon} />
    <Text style={styles.cardTitle}>My Personal Information</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.card} onPress={handleNavigateToUpdateMedicalInfo}>
    <Icon name="health-and-safety" size={25} color="#004aad" style={styles.cardIcon} />
    <Text style={styles.cardTitle}>My Medical Information</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.card} onPress={handleNavigateToPrivacyPolicy}>
          <Icon name="policy" size={25} color="#004aad" style={styles.cardIcon} />
          <Text style={styles.cardTitle}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleNavigateToContactUs}>
          <Icon name="contact-support" size={25} color="#004aad" style={styles.cardIcon} />
          <Text style={styles.cardTitle}>Contact Us</Text>
        </TouchableOpacity>
</View>


        <View style={styles.logoutWrapper}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={24} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Transparent loading overlay */}
      {loadingProfilePicture && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#004aad" />
        </View>
      )}

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
    paddingBottom: 20,
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
    fontSize: 30,
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
    position: 'relative',
    borderRadius: 20
  },
  profileImageWrapper: {
    position: 'absolute',
    top: -60,
    left: 20,
    zIndex: 1, // Ensure the image is above other elements
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFF',
    backgroundColor: '#FFF'
  },
  profileDetails: {
    flex: 1,
    marginLeft: 140, // Adjust margin to accommodate the profile image
  },
  age: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileDescription: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 15,
  },
  rightInfoColumn: {
    marginLeft: 'auto', // Align to the right
  },
  leftInfoColumn: {
    marginRight: 'auto', // Align to the left
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
  availabilityContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10, // Rounded corners for the card
    shadowColor: '#000', // Shadow for the card effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow effect
    maxWidth: '95%', // Card width less than full width
    alignSelf: 'center', // Center the card horizontally
  },
  
  availabilityLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'normal',
    flex: 1,
  },
  switch: {
    marginLeft: 10,
  },
  cardsContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    maxWidth: '95%',
    alignSelf: 'center',
    marginBottom: 10,
    height: 60
  },
  cardTitle: {
    fontSize: 16,
    color: '#004aad',
    fontWeight: 'normal',
    flex: 1,
  },
  cardIcon: {
    marginRight: 20,
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryRegion: {
    fontSize: 8,
    color: '#333',
    fontWeight: 'normal',
  },
});
