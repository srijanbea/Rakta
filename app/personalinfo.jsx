import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Pressable, Platform, Image, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {doc, collection, query, where, getDocs, setDoc} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebaseConfig';

export default function PersonalInfoScreen() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [temporaryDate, setTemporaryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [contactNo, setContactNo] = useState('');
  const [cityDistrict, setCityDistrict] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [countryRegion, setCountryRegion] = useState('');
  const [error, setError] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetailsJson = await AsyncStorage.getItem('userDetails');
        if (userDetailsJson) {
          const userDetails = JSON.parse(userDetailsJson);
          setFullName(userDetails.fullName);
                  // Convert dateOfBirth string back to a Date object
        if (userDetails.dateOfBirth) {
          setDateOfBirth(new Date(userDetails.dateOfBirth));
        }
          setContactNo(userDetails.contactNo);
          setCityDistrict(userDetails.cityDistrict);
          setStateProvince(userDetails.stateProvince);
          setCountryRegion(userDetails.countryRegion);
        } else {
          console.log('Error', 'No user details found.');
        }
      } catch (error) {
        console.log('Error retrieving user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  console.log(fullName);
  console.log(dateOfBirth);
  console.log(contactNo);
  console.log(stateProvince);
  console.log(cityDistrict);
  console.log(countryRegion);

  const validateForm = () => {
    const newError = {};
    if (!fullName) newError.fullName = 'Full Name is required';
    if (!contactNo) newError.contactNo = 'Contact Number is required';
    if (!cityDistrict) newError.cityDistrict = 'City / District is required';
    if (!stateProvince) newError.stateProvince = 'State / Province is required';
    if (!countryRegion) newError.countryRegion = 'Country / Region is required';
    setError(newError);
    return Object.keys(newError).length === 0;
  };


  const handleNext = async () => {
    if (validateForm()) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
  
        if (user) {
          const email = user.email;
  
          // Query for the user document by email
          const usersCollection = collection(db, 'users');
          const userQuery = query(usersCollection, where('email', '==', email));
          const querySnapshot = await getDocs(userQuery);
  
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0]; // Get the first document
            const userDocRef = doc(db, 'users', userDoc.id); // Get the reference to the document
  
            // Update the fields of the user document
            await setDoc(userDocRef, {
              fullName: fullName,
              dateOfBirth: dateOfBirth.toISOString(),
              contactNo: contactNo,
              cityDistrict: cityDistrict,
              stateProvince: stateProvince,
              countryRegion: countryRegion,
            }, { merge: true });
  
            console.log('User details updated successfully');
            navigation.navigate('medicalinfo');
          } else {
            console.log('No user document found with this email.');
          }
        } else {
          console.log('No user is currently signed in.');
        }
      } catch (error) {
        console.log('Error saving user details:', error);
      }
    }
  };
  
  const handleConfirmDate = () => {
    setDateOfBirth(temporaryDate);
    setShowDatePicker(false);
  };

  const getInputContainerStyle = (inputName) => ({
    ...styles.inputContainer,
    borderColor: focusedInput === inputName ? 'transparent' : '#f0f0f0',
    backgroundColor: focusedInput === inputName ? '#e6f0ff' : '#f0f0f0',
  });

  const getIconStyle = (inputName) => ({
    ...styles.icon,
    color: focusedInput === inputName ? '#004aad' : '#aaa',
  });

  const getPlaceholderTextColor = (inputName) => focusedInput === inputName ? '#004aad' : '#aaa';

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Personal</Text>
            <Text style={styles.headerText}>Information</Text>
          </View>
          <Image source={require('../assets/images/onboarding2.png')} style={styles.onboardingImage} />
          <Text style={styles.infoText}>
            We prioritize your privacy and do not share your data with any third parties. 
            Your personal and medical information will be kept confidential.     
            Thank you for trusting us with your important information.      
          </Text>

          <View style={styles.form}>
            {/* Full Name Field */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Full Name</Text>
              <View style={getInputContainerStyle('fullName')}>
                <Icon name="person" size={20} style={getIconStyle('fullName')} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor={getPlaceholderTextColor('fullName')}
                  value={fullName}
                  onChangeText={setFullName}
                  onFocus={() => setFocusedInput('fullName')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              {error.fullName && <Text style={styles.errorText}>{error.fullName}</Text>}
            </View>

            {/* Date of Birth Field */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Date of Birth</Text>
              <Pressable
                style={getInputContainerStyle('dateOfBirth')}
                onPress={() => setShowDatePicker(true)}
              >
                <Icon name="calendar-today" size={20} style={getIconStyle('dateOfBirth')} />
                <TextInput
                  style={styles.input}
                  placeholder="Date of Birth"
                  placeholderTextColor={getPlaceholderTextColor('dateOfBirth')}
                  value={formatDate(dateOfBirth)}
                  editable={false} // Prevent manual editing
                  pointerEvents="none" // Ensure touch events pass through the TextInput
                />
              </Pressable>
              {showDatePicker && (
                <View style={styles.datePickerContainer}>
                  <DateTimePicker
                    value={temporaryDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        setTemporaryDate(selectedDate);
                      }
                    }}
                    maximumDate={new Date()} // Prevent selecting a future date
                  />
                  <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmDate}>
                    <Text style={styles.buttonText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Contact Number Field */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Contact No</Text>
              <View style={getInputContainerStyle('contactNo')}>
                <Icon name="phone" size={20} style={getIconStyle('contactNo')} />
                <TextInput
                  style={styles.input}
                  placeholder="Contact Number"
                  placeholderTextColor={getPlaceholderTextColor('contactNo')}
                  value={contactNo}
                  onChangeText={setContactNo}
                  onFocus={() => setFocusedInput('contactNo')}
                  onBlur={() => setFocusedInput(null)}
                  keyboardType="phone-pad" // Use phone pad for contact number input
                />
              </View>
              {error.contactNo && <Text style={styles.errorText}>{error.contactNo}</Text>}
            </View>

            {/* City/District Field */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>City / District</Text>
              <View style={getInputContainerStyle('city')}>
                <Icon name="location-city" size={20} style={getIconStyle('city')} />
                <TextInput
                  style={styles.input}
                  placeholder="City / District"
                  placeholderTextColor={getPlaceholderTextColor('city')}
                  value={cityDistrict}
                  onChangeText={setCityDistrict}
                  onFocus={() => setFocusedInput('city')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              {error.cityDistrict && <Text style={styles.errorText}>{error.cityDistrict}</Text>}
            </View>

            {/* State/Province Field */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>State / Province</Text>
              <View style={getInputContainerStyle('state')}>
                <Icon name="map" size={20} style={getIconStyle('state')} />
                <TextInput
                  style={styles.input}
                  placeholder="State / Province"
                  placeholderTextColor={getPlaceholderTextColor('state')}
                  value={stateProvince}
                  onChangeText={setStateProvince}
                  onFocus={() => setFocusedInput('state')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              {error.stateProvince && <Text style={styles.errorText}>{error.stateProvince}</Text>}
            </View>

            {/* Country/Region Field */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Country / Region</Text>
              <View style={getInputContainerStyle('country')}>
                <Icon name="public" size={20} style={getIconStyle('country')} />
                <TextInput
                  style={styles.input}
                  placeholder="Country / Region"
                  placeholderTextColor={getPlaceholderTextColor('country')}
                  value={countryRegion}
                  onChangeText={setCountryRegion}
                  onFocus={() => setFocusedInput('country')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              {error.countryRegion && <Text style={styles.errorText}>{error.countryRegion}</Text>}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
                <Icon name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  infoText: {
    fontSize: 11,
    color: '#aaa',
    textAlign: 'justify',
    marginBottom: 20,
  },
  header: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#004aad',
  },
  onboardingImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  fieldWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    marginLeft: 15
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f0f0f0',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 20,
    borderWidth: 1,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  datePickerContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: '#004aad',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#004aad',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonIcon: {
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 15,
    marginTop: 5,

  },
});
