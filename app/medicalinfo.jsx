import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';

export default function MedicalInfoScreen() {
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [selectedHeight, setSelectedHeight] = useState('170'); // Default height
  const [selectedWeight, setSelectedWeight] = useState('70'); // Default weight
  const [pressedButton, setPressedButton] = useState(null); // For tracking pressed button
  const navigation = useNavigation();

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleBloodTypeSelect = (type) => {
    setSelectedBloodType(type);
  };

  const handleNext = () => {
    if (!selectedBloodType || !selectedHeight || !selectedWeight) {
      alert('Please fill in all required fields before proceeding.');
      return;
    }
    navigation.navigate('dashboard');
  };

  const incrementHeight = () => {
    setSelectedHeight((prevHeight) => Math.min(parseInt(prevHeight, 10) + 1, 250).toString());
  };

  const decrementHeight = () => {
    setSelectedHeight((prevHeight) => Math.max(parseInt(prevHeight, 10) - 1, 100).toString());
  };

  const incrementWeight = () => {
    setSelectedWeight((prevWeight) => Math.min(parseInt(prevWeight, 10) + 1, 200).toString());
  };

  const decrementWeight = () => {
    setSelectedWeight((prevWeight) => Math.max(parseInt(prevWeight, 10) - 1, 30).toString());
  };

  const handleHeightChange = (value) => {
    // Allow empty input and handle numeric values
    if (value === '' || /^[0-9]*$/.test(value)) {
      setSelectedHeight(value);
    }
  };

  const handleWeightChange = (value) => {
    // Allow empty input and handle numeric values
    if (value === '' || /^[0-9]*$/.test(value)) {
      setSelectedWeight(value);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Medical</Text>
            <Text style={styles.headerText}>Information</Text>
          </View>

          <Image source={require('../assets/images/onboarding3.png')} style={styles.onboardingImage} />
          
          <Text style={styles.infoText}>
            We prioritize your privacy and do not share your data with any third parties. 
            Your personal and medical information will be kept confidential.     
            Thank you for trusting us with your important information.      
          </Text>
          
          <View style={styles.form}>
            <Text style={styles.label}>Blood Group</Text>

            <View style={styles.bloodTypeContainer}>
              {bloodTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.bloodTypeCard,
                    selectedBloodType === type && styles.selectedCard,
                  ]}
                  onPress={() => handleBloodTypeSelect(type)}
                >
                  <Icon
                    name="opacity"
                    size={24}
                    color={selectedBloodType === type ? "#fff" : "#aaa"}
                    style={styles.bloodIcon}
                  />
                  <Text
                    style={[
                      styles.bloodTypeText,
                      selectedBloodType === type && styles.selectedText,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.stepperGroup}>
                <Text style={styles.label}>Height (cm)</Text>
                <View style={styles.stepperContainer}>
                  <TouchableOpacity
                    onPress={decrementHeight}
                    style={[
                      styles.stepperButton,
                      pressedButton === 'heightDecrement' && styles.pressedButton,
                    ]}
                    onPressIn={() => setPressedButton('heightDecrement')}
                    onPressOut={() => setPressedButton(null)}
                  >
                    <Text style={styles.stepperText}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={selectedHeight}
                    onChangeText={handleHeightChange}
                  />
                  <TouchableOpacity
                    onPress={incrementHeight}
                    style={[
                      styles.stepperButton,
                      pressedButton === 'heightIncrement' && styles.pressedButton,
                    ]}
                    onPressIn={() => setPressedButton('heightIncrement')}
                    onPressOut={() => setPressedButton(null)}
                  >
                    <Text style={styles.stepperText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.stepperGroup}>
                <Text style={styles.label}>Weight (kg)</Text>
                <View style={styles.stepperContainer}>
                  <TouchableOpacity
                    onPress={decrementWeight}
                    style={[
                      styles.stepperButton,
                      pressedButton === 'weightDecrement' && styles.pressedButton,
                    ]}
                    onPressIn={() => setPressedButton('weightDecrement')}
                    onPressOut={() => setPressedButton(null)}
                  >
                    <Text style={styles.stepperText}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={selectedWeight}
                    onChangeText={handleWeightChange}
                  />
                  <TouchableOpacity
                    onPress={incrementWeight}
                    style={[
                      styles.stepperButton,
                      pressedButton === 'weightIncrement' && styles.pressedButton,
                    ]}
                    onPressIn={() => setPressedButton('weightIncrement')}
                    onPressOut={() => setPressedButton(null)}
                  >
                    <Text style={styles.stepperText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  keyboardAvoidingView: {
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004aad',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  bloodTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  bloodTypeCard: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    backgroundColor: '#004aad',
    borderColor: '#004aad',
  },
  bloodIcon: {
    marginBottom: 5,
  },
  bloodTypeText: {
    fontSize: 16,
    color: '#aaa',
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  stepperGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperButton: {
    width: 40,
    height: 40,
    borderRadius: 10, // Adjusted for rounded square
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  pressedButton: {
    backgroundColor: '#004aad', // Color when pressed
  },
  stepperText: {
    fontSize: 20,
    color: '#aaa', // Default text color
  },
  input: {
    width: 60,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    color: '#004aad',
    marginHorizontal: 10,
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
});
