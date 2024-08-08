import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Pressable, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; 
import countries from '../assets/countries.json'; 
import { useNavigation } from 'expo-router';

export default function PersonalInfoScreen() {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [contactNo, setContactNo] = useState('');
  const [countryCode, setCountryCode] = useState('+977');
  const [city, setCity] = useState('');
  const [countryRegion, setCountryRegion] = useState('Nepal'); 
  const [focusedInput, setFocusedInput] = useState(null);
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('medicalinfo');
};

const handleSkip = () => {
    navigation.navigate('dashboard');
};

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setDateOfBirth(formatDate(currentDate));
      if (Platform.OS === "android") {
        toggleDatePicker();
      }
    } else {
      toggleDatePicker();
    }
  }

  const getInputContainerStyle = (inputName) => ({
    ...styles.inputContainer,
    borderColor: focusedInput === inputName ? '#004aad' : '#f0f0f0',
    backgroundColor: focusedInput === inputName ? '#e6f0ff' : '#f0f0f0',
  });

  const getIconStyle = (inputName) => ({
    ...styles.icon,
    color: focusedInput === inputName ? '#004aad' : '#aaa',
  });

  const getPlaceholderTextColor = (inputName) => focusedInput === inputName ? '#004aad' : '#aaa';

  const getCountryLabel = (code) => {
    const country = countries.find(c => c.dial_code === code);
    return country ? `${country.flag} ${country.dial_code}` : '';
  };
  useEffect(() => {
    const selectedCountry = countries.find(c => c.dial_code === countryCode);
    setCountryRegion(selectedCountry ? selectedCountry.name : '');
  }, [countryCode]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.header}>
                        <Text style={styles.headerText}>Personal Information</Text>
                    </View>
      <Image source={require('../assets/images/onboarding2.png')} style={styles.onboardingImage} />
      <Text style={styles.infoText}>
      We prioritize your privacy and do not share your data with any third parties. 
      Your personal and medical information will be kept confidential.     
      Thank you for trusting us with your important information.      
                    </Text>
        
        <View style={styles.form}>
          <View style={styles.fieldWrapper}>
            <View style={getInputContainerStyle('fullName')}>
              <Icon name="person-outline" size={20} style={getIconStyle('fullName')} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor={getPlaceholderTextColor('fullName')}
                onFocus={() => setFocusedInput('fullName')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
          </View>

          <View style={styles.fieldWrapper}>
            <View style={getInputContainerStyle('dateOfBirth')}>
              <Icon name="calendar-today" size={20} style={getIconStyle('dateOfBirth')} />
              {
                showPicker && (
                  <DateTimePicker
                    mode='date'
                    display='spinner'
                    value={date}
                    onChange={onChange}
                  />
                )
              }
              {
                !showPicker && (
                  <Pressable onPress={toggleDatePicker} style={styles.dateContainer}>
                    <Text style={[styles.dateText, { color: dateOfBirth ? '#000' : getPlaceholderTextColor('dateOfBirth') }]}>
                      {dateOfBirth || "Date of Birth"}
                    </Text>
                  </Pressable>
                )
              }
            </View>
          </View>
          <View style={styles.fieldWrapper}>
            <View style={styles.rowContainer}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={countryCode}
                  style={styles.picker}
                  onValueChange={(itemValue) => {
                    setCountryCode(itemValue);
                  }}
                >
                  {countries.map((country) => (
                    <Picker.Item
                      key={country.code}
                      label={`${country.flag} ${country.dial_code} (${country.code})`}
                      value={country.dial_code}
                    />
                  ))}
                </Picker>
                <Text style={styles.countryCodeLabel}>
                  {getCountryLabel(countryCode)}
                </Text>
              </View>

              <View style={styles.contactNoContainer}>
                <Icon name="phone" size={20} style={styles.contactNoIcon} />
                <TextInput
                  style={styles.contactNoInput}
                  placeholder="Contact No."
                  value={contactNo}
                  onChangeText={setContactNo}
                  keyboardType="phone-pad"
                  placeholderTextColor={getPlaceholderTextColor('contactNo')}
                  onFocus={() => setFocusedInput('contactNo')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            </View>
          </View>
          <View style={styles.fieldWrapper}>
            <View style={getInputContainerStyle('city')}>
              <Icon name="location-city" size={20} style={getIconStyle('city')} />
              <TextInput
                style={styles.input}
                placeholder="City"
                value={city}
                onChangeText={setCity}
                placeholderTextColor={getPlaceholderTextColor('city')}
                onFocus={() => setFocusedInput('city')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
          </View>
          <View style={styles.fieldWrapper}>
            <View style={getInputContainerStyle('countryRegion')}>
              <Icon name="public" size={20} style={getIconStyle('countryRegion')} />
              <TextInput
                style={styles.input}
                placeholder="Country/Region"
                value={countryRegion}
                editable={false}
                placeholderTextColor={getPlaceholderTextColor('countryRegion')}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                            <Text style={styles.buttonText}>Next</Text>
                            <Icon name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSkip}>
                            <Text style={styles.skipText}>Skip</Text>
                        </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
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
  marginTop: 10,
  marginBottom: 20,
  alignSelf: 'flex-start',
},
headerText: {
  fontSize: 25,
  fontWeight: 'bold',
  color: '#004aad',
  marginTop: 20
},
  onboardingImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
},
  form: {
    width: '100%',
  },
  fieldWrapper: {
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f0f0f0',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 15,
    borderWidth: 1,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 16,
    textAlign: 'left',
  },
  pickerContainer: {
    flex: 0.3,
    borderColor: '#f0f0f0',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  countryCodeLabel: {
    fontSize: 14,
    color: '#000',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  contactNoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f0f0f0',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  contactNoIcon: {
    marginRight: 10,
    color: '#aaa'
  },
  contactNoInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
},
nextButton: {
    flexDirection: 'row',
    backgroundColor: '#004aad',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
},
buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
},
buttonIcon: {
    marginLeft: 5,
},
skipText: {
    marginTop: 10,
    color: '#004aad',
    fontSize: 14,
    fontWeight: 'bold',
},
});
