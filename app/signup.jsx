import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from 'expo-router';

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [rh, setRh] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    // Implement sign-up logic here
    Alert.alert(
      'Registration Successful',
      'You have been registered successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('login'),
        },
      ],
      { cancelable: false }
    );
  };

  const RadioButton = ({ label, value, selected, onSelect }) => (
    <TouchableOpacity onPress={() => onSelect(value)} style={styles.radioButtonContainer}>
      <View style={[styles.radioButton, selected && styles.radioButtonSelected]} />
      <Text style={styles.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Register</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Contact No"
          value={contactNo}
          onChangeText={setContactNo}
          keyboardType="phone-pad"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          placeholderTextColor="#aaa"
        />
        <Text style={styles.label}>Blood Group</Text>
        <View style={styles.radioGroup}>
          {['A', 'B', 'O', 'AB'].map((group) => (
            <RadioButton
              key={group}
              label={group}
              value={group}
              selected={bloodGroup === group}
              onSelect={setBloodGroup}
            />
          ))}
        </View>
        <Text style={styles.label}>RH</Text>
        <View style={styles.radioGroup}>
          {['+ve', '-ve'].map((factor) => (
            <RadioButton
              key={factor}
              label={factor}
              value={factor}
              selected={rh === factor}
              onSelect={setRh}
            />
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Text style={styles.loginButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 30,
    color: '#333',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  input: {
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
  },
  label: {
    width: '100%',
    fontSize: 16,
    marginBottom: 8,
    color: '#555555',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioButtonSelected: {
    backgroundColor: '#ff7e5f',
  },
  radioButtonLabel: {
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: '#ff7e5f',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    color: '#333',
  },
  loginButton: {
    color: '#ff7e5f',
    fontWeight: 'bold',
  },
});
