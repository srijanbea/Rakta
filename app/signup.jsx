import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
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
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact No"
        value={contactNo}
        onChangeText={setContactNo}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
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
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text style={styles.loginLink} onPress={() => navigation.navigate('login')}>
          Login
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
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
    backgroundColor: '#f4511e',
  },
  radioButtonLabel: {
    fontSize: 16,
  },
  loginText: {
    marginTop: 16,
    fontSize: 16,
  },
  loginLink: {
    color: '#f4511e',
    fontWeight: 'bold',
  },
});
