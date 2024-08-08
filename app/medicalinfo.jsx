import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Pressable, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';

export default function PersonalInfoScreen() {
  const [showPicker, setShowPicker] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('dashboard');
};

const handleSkip = () => {
    navigation.navigate('dashboard');
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
      <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.header}>
                        <Text style={styles.headerText}>Medical Information</Text>
                    </View>
      <Image source={require('../assets/images/onboarding3.png')} style={styles.onboardingImage} />
      <Text style={styles.infoText}>
      We prioritize your privacy and do not share your data with any third parties. 
      Your personal and medical information will be kept confidential.     
      Thank you for trusting us with your important information.      
                    </Text>
        
        <View style={styles.form}>
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
