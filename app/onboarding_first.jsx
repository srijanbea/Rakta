import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function OnboardingScreen() {
    const [fullName, setFullName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [address, setAddress] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const storedName = await AsyncStorage.getItem('fullName');
                if (storedName) {
                    setFullName(storedName);
                }
            } catch (error) {
                console.error('Failed to fetch user name from AsyncStorage', error);
            }
        };

        fetchUserName();
    }, []);

    const handleNext = () => {
        if (!fullName || !contactNo || !address) {
            Alert.alert('Error', 'Please fill in all required fields');
        } else {
            // Proceed to the next onboarding step
            // navigation.navigate('NextOnboardingStep');
        }
    };

    const getInputContainerStyle = (inputName) => ({
        ...styles.inputContainer,
        borderColor: focusedInput === inputName ? 'transparent' : '#f0f0f0',
        backgroundColor: focusedInput === inputName ? '#e6f0ff' : '#fff',
    });

    const getIconStyle = (inputName) => ({
        ...styles.icon,
        color: focusedInput === inputName ? '#004aad' : '#000',
    });

    const getPlaceholderTextColor = (inputName) => focusedInput === inputName ? '#004aad' : '#aaa';

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient
                colors={['#004aad', '#f0f8ff']}
                start={[0, 0]}
                end={[0, 1]}
                style={styles.background}
            >
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
                >
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Welcome!</Text>
                            <Text style={styles.subHeaderText}>A few details to get you started</Text>
                        </View>
                        <Image source={require('../assets/images/onboarding1.png')} style={styles.onboardingImage} />
                        <Text style={styles.infoText}>
                            The information you provide will be used to create your donor profile in Rakta to accurately match you with donation opportunities and keep your records up to date.
                        </Text>
                        <Text style={styles.personalInfoHeader}>Personal Information</Text>
                        <View style={styles.form}>
                            <View style={styles.fieldWrapper}>
                                <View style={getInputContainerStyle('fullName')}>
                                    <Icon name="person-outline" size={20} style={getIconStyle('fullName')} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Full Name"
                                        value={fullName}
                                        onChangeText={setFullName}
                                        autoCapitalize="words"
                                        placeholderTextColor={getPlaceholderTextColor('fullName')}
                                        onFocus={() => setFocusedInput('fullName')}
                                        onBlur={() => setFocusedInput(null)}
                                    />
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                                    <Text style={styles.buttonText}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
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
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    header: {
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        alignSelf: 'flex-start',
    },
    subHeaderText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 10,
    },
    onboardingImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 10,
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
    },
    personalInfoHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
        textAlign: 'center',
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
        borderColor: '#fff',
        backgroundColor: '#fff',
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
    icon: {
        marginRight: 10,
        color: '#000',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
    },
    nextButton: {
        backgroundColor: '#004aad',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        flex: 1,
        marginLeft: 10,
        width: 140,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
