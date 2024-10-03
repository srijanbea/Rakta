import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker'; // Updated import

export default function DonateBloodScreen() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const [donationAmount, setDonationAmount] = useState('');

  const handleSubmitDonation = () => {
    // Add submission logic here
    if (!bloodGroup || !location || !donationAmount) {
      alert('Please fill out all fields!');
      return;
    }
    alert(`Thank you for your donation of ${donationAmount}ml for ${bloodGroup}!`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Donate Blood</Text>
        </View>

        {/* Blood Group Picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Blood Group</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={bloodGroup}
              onValueChange={(itemValue) => setBloodGroup(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Blood Group" value="" />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
            </Picker>
          </View>
        </View>

        {/* Location Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your location"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Donation Amount */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Donation Amount (ml)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter donation amount"
            keyboardType="numeric"
            value={donationAmount}
            onChangeText={setDonationAmount}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.8}
          onPress={handleSubmitDonation}
        >
          <Icon name="favorite" size={24} color="#fff" />
          <Text style={styles.submitButtonText}>Donate Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    backgroundColor: '#004aad',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#004aad',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 8,
    transition: 'background-color 0.3s ease',
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

