import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';


export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const navigation = useNavigation();


  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const checkEmailExists = async (email) => {
  const q = query(collection(db, 'users'), where('email', '==', email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

  const handleResetPassword = async () => {
    const newError = {};
    if (!email) {
      newError.email = 'This field is required';
    } else if (!isValidEmail(email)) {
      newError.email = 'Invalid email';
  }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      setLoading(true);
      try {
        const emailExists = await checkEmailExists(email);
        if (!emailExists) {
          setError({email: 'User does not exist'})
          setEmail('');
          setLoading(false);
          return;
        }
        const auth = getAuth();
        await sendPasswordResetEmail(auth, email)
        Alert.alert('Success', 'Password reset link has been sent to your email.');
        setEmail('');
      } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage)
      } finally {
        setLoading(false);
      }
    }
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/images/forgotpassword.jpg')} style={styles.logo} resizeMode="contain" />
          </View>
          <View style={styles.header}>
            <Text style={styles.heading}>Reset Your Password</Text>
            <Text style={styles.subheading}>
              You will receive a link to create a new password via your registered email.
            </Text>
          </View>
          <View style={styles.form}>
            <View style={styles.fieldWrapper}>
              <View style={getInputContainerStyle('email')}>
                <Icon name="mail-outline" size={20} style={getIconStyle('email')} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor={getPlaceholderTextColor('email')}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              {error.email && <Text style={styles.errorText}>{error.email}</Text>}
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword} disabled={loading}>
              <Text style={styles.resetButtonText}>Send Password Reset Link</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {loading && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#004aad" />
            <Text style={styles.loadingText}>Please wait...</Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  logoContainer: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
  },
  header: {
    marginBottom: 30,
  },
  heading: {
    fontSize: 30,
    color: '#004aad',
    fontWeight: 'bold',
    textAlign: 'left',
    marginHorizontal: 20,
  },
  subheading: {
    fontSize: 11,
    color: '#666',
    textAlign: 'left',
    marginTop: 5,
    marginHorizontal: 20,
  },
  form: {
    width: '100%',
  },
  fieldWrapper: {
    marginBottom: 10,
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
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  resetButton: {
    backgroundColor: '#088f8f',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
    height: 50,
    justifyContent: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#004aad',
    marginTop: 10,
  },
});
