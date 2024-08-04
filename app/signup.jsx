import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { auth, db } from '../firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

export default function SignUpScreen() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);
    const [error, setError] = useState({});
    const navigation = useNavigation();


    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,:;])[A-Za-z\d!@#$%^&*.,:;]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSignUp = async () => {
        const newError = {};

        if (!fullName) {
            newError.fullName = 'This field is required';
        }

        if (!email) {
            newError.email = 'This field is required';
        } else if (!isValidEmail(email)) {
            newError.email = 'Invalid email';
        }

        if (!password) {
            newError.password = 'This field is required';
        } else if (!isValidPassword(password)) {
            newError.password = 'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character';
        }

        if (!confirmPassword) {
            newError.confirmPassword = 'This field is required';
        } else if (password && confirmPassword !== password) {
            newError.confirmPassword = 'Passwords do not match';
        }

        setError(newError);

        if (Object.keys(newError).length === 0) {
            setLoading(true);

            try {
                // Create a new user with email and password
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                // Store full name and email in Firestore
                const user = userCredential.user;
                await addDoc(collection(db, 'users'), {
                    uid: user.uid,
                    fullName: fullName,
                    email: email,
                    profilePicture: '',
                });

                Alert.alert(
                    'Registration Successful',
                    'Your account has been created successfully.',
                    [{ text: 'OK', onPress: () => navigation.navigate('login') }],
                    { cancelable: false }
                );
            } catch (error) {
                const errorCode = error.code;
                if (errorCode === 'auth/email-already-in-use') {
                    newError.email = 'Email is already in use'
                }
                else {
                    console.log('Error', error.message);
                }
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
                // keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text style={styles.heading}>Register</Text>
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
                            {error.fullName && <Text style={styles.errorText}>{error.fullName}</Text>}
                        </View>

                        <View style={styles.fieldWrapper}>
                            <View style={getInputContainerStyle('email')}>
                                <Icon name="mail-outline" size={20} style={getIconStyle('email')} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
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
                        
                        <View style={styles.fieldWrapper}>
                            <View style={getInputContainerStyle('password')}>
                                <Icon name="lock-outline" size={20} style={getIconStyle('password')} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                    placeholderTextColor={getPlaceholderTextColor('password')}
                                    onFocus={() => setFocusedInput('password')}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </View>
                            {error.password && <Text style={styles.errorText}>{error.password}</Text>}
                        </View>
                        
                        <View style={styles.fieldWrapper}>
                            <View style={getInputContainerStyle('confirmPassword')}>
                                <Icon name="lock-outline" size={20} style={getIconStyle('confirmPassword')} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                    placeholderTextColor={getPlaceholderTextColor('confirmPassword')}
                                    onFocus={() => setFocusedInput('confirmPassword')}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </View>
                            {error.confirmPassword && <Text style={styles.errorText}>{error.confirmPassword}</Text>}
                        </View>
                        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={loading}>
                            <Text style={styles.signUpButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signUpWithGoogleButton} disabled={loading}>
                            <View style={styles.googleButtonContent}>
                                <Image source={require('../assets/images/google-icon-small.png')} style={styles.googleLogo} />
                                <Text style={styles.signUpWithGoogleButtonText}>Sign Up With Google</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('login')}>
                            <Text style={styles.loginButton}>Login</Text>
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
    heading: {
        fontSize: 30,
        color: '#333',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    form: {
        width: '100%',
    },
    fieldWrapper: {
        marginBottom: 15, // Space between fields
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
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        paddingHorizontal: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 5, // Small margin for error text
        marginLeft: 10,
    },
    signUpButton: {
        backgroundColor: '#004aad',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginVertical: 10,
        width: '100%', // Ensures the button takes full width
        justifyContent: 'center',
        height: 55,
    },
    signUpButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    signUpWithGoogleButton: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: "#004aad",
        borderRadius: 25,
        alignItems: 'center',
        marginVertical: 10,
        width: '100%', // Ensures the button takes full width
        flexDirection: 'row', // Aligns children in a row
        justifyContent: 'center', // Centers content horizontally
        height: 55,
    },
    googleButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%', // Ensures the content takes full width
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    googleLogo: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    signUpWithGoogleButtonText: {
        color: '#004aad',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    
    loginContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    loginButton: {
        color: '#004aad',
        fontWeight: 'bold',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loadingText: {
        color: '#004aad',
        marginTop: 10,
    },
});