import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Pressable, Platform, Image, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';

export default function PersonalInfoScreen() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [fullName, setFullName] = useState('');
  const navigation = useNavigation();
  

  const handleNext = () => {
    navigation.navigate('medicalinfo');
  };

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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
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
    width: '100%',
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
  icon: {
    marginRight: 10,
  },
});
