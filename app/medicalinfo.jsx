import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useNavigation } from 'expo-router';
import {doc, collection, query, where, getDocs, setDoc} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebaseConfig';

export default function MedicalInfoScreen() {
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [selectedHeight, setSelectedHeight] = useState('170'); // Default height
  const [selectedWeight, setSelectedWeight] = useState('70'); // Default weight
  const [pressedButton, setPressedButton] = useState(null); // For tracking pressed button
  const [selectedChronicDiseases, setSelectedChronicDiseases] = useState([]); // Chronic diseases state
  const [hasDonatedRecently, setHasDonatedRecently] = useState(null);
  const [errors, setErrors] = useState({ height: '', weight: '', bloodType: '' }); // Error state

  const navigation = useNavigation();

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const chronicDiseases = [
    'Diabetes',
    'Hypertension',
    'Asthma',
    'Heart Disease',
    'Chronic Kidney Disease',
    'COPD',
    'None',
  ];
  const hasChronicDisease = selectedChronicDiseases.length > 0 && !selectedChronicDiseases.includes('None');
  const donatedBloodRecently = hasDonatedRecently === 'Yes';

  const validateInputs = () => {
    let valid = true;
    const newErrors = { height: '', weight: '', bloodType: '' };

    if (!selectedBloodType) {
      newErrors.bloodType = 'Please select a blood type';
      valid = false;
    }

    if (parseInt(selectedHeight, 10) < 100 || parseInt(selectedHeight, 10) > 250) {
      newErrors.height = 'Height must be between 100 and 250 cm';
      valid = false;
    }

    if (parseInt(selectedWeight, 10) < 30 || parseInt(selectedWeight, 10) > 200) {
      newErrors.weight = 'Weight must be between 30 and 200 kg';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = async () => {
    if (validateInputs()) {
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
              onboardingCompleted: true,
              bloodGroup: selectedBloodType,
              height: selectedHeight,
              weight: selectedWeight,
              hasChronicDisease: hasChronicDisease,
              donatedBloodRecently: donatedBloodRecently,
            }, { merge: true });
  
            console.log('User details updated successfully');
            navigation.reset({
              index: 0,
              routes: [{ name: 'dashboard' }],
          });
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

  const handleBloodTypeSelect = (type) => {
    setSelectedBloodType(type);
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

  const handleChronicDiseaseSelect = (disease, isChecked) => {
    setSelectedChronicDiseases((prev) =>
      isChecked ? [...prev, disease] : prev.filter((d) => d !== disease)
    );
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
          
          <View style={styles.fieldWrapper}>
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
            {errors.bloodType ? <Text style={styles.errorText}>{errors.bloodType}</Text> : null}
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
                {errors.height ? <Text style={styles.errorText}>{errors.height}</Text> : null}
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
                {errors.weight ? <Text style={styles.errorText}>{errors.weight}</Text> : null}
              </View>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Chronic Diseases ( If Any )</Text>
              {chronicDiseases.map((disease, index) => (
                <BouncyCheckbox
                  key={index}
                  text={disease}
                  fillColor="#004aad"
                  unfillColor="#FFFFFF"
                  textStyle={{ textDecorationLine: 'none' }}
                  iconStyle={{ borderColor: '#004aad', borderRadius: 8 }}
                  innerIconStyle={{ borderRadius: 8 }} // Adjust for rounded square
                  style={{ marginBottom: 10 }}
                  onPress={(isChecked) => handleChronicDiseaseSelect(disease, isChecked)}
                />
              ))}
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Have you donated blood in the past 6 months?</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setHasDonatedRecently('Yes')}
                >
                  <Icon
                    name={hasDonatedRecently === 'Yes' ? 'radio-button-checked' : 'radio-button-unchecked'}
                    size={24}
                    color="#004aad"
                  />
                  <Text style={styles.radioText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setHasDonatedRecently('No')}
                >
                  <Icon
                    name={hasDonatedRecently === 'No' ? 'radio-button-checked' : 'radio-button-unchecked'}
                    size={24}
                    color="#004aad"
                  />
                  <Text style={styles.radioText}>No</Text>
                </TouchableOpacity>
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
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    marginBottom: 15
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
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
    marginBottom: 15,
  },
  stepperGroup: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingRight: 10,
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
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#004aad',
    marginRight: 30
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center'
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
