import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, KeyboardAvoidingView, Platform, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust the path to your firebaseConfig
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icon usage

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleLogin = async () => {
        setLoading(true); // Show loading indicator

        try {
            // Authenticate the user with Firebase
            await signInWithEmailAndPassword(auth, email, password);

            // If successful, navigate to Dashboard
            navigation.reset({
                index: 0,
                routes: [{ name: 'dashboard' }],
            });
        } catch (error) {
            // Handle Firebase authentication errors
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/invalid-credential') {
                Alert.alert('Invalid Credentials');
                setPassword('');
            }
            console.log(errorMessage);
        } finally {
            setLoading(false); // Hide loading indicator
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
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/images/rakta-logo-blue.png')} style={styles.logo} resizeMode="contain" />
                    </View>
                    <Text style={styles.welcomeText}>Welcome</Text>
                    <View style={styles.form}>
                    <View style={getInputContainerStyle('email')}>
                            <Ionicons name="mail-outline" size={20} style={getIconStyle('email')} />
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
                        <View style={getInputContainerStyle('password')}>
                            <Ionicons name="lock-closed-outline" size={20} style={getIconStyle('password')} />
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
                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('forgotpassword')}>
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                            <Text style={styles.signupButton}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {loading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="#004aad" />
                    <Text style={styles.loadingText}>Please wait...</Text>
                </View>
            )}
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
        padding: 20,
    },
    logoContainer: {
        marginBottom: 70,
        width: '100%', // Ensure the logo container takes full width
        alignItems: 'center', // Center the logo horizontally
    },
    logo: {
        width: '100%', // Ensure the logo takes full width of its container
        height: undefined, // Let the height adjust based on the aspect ratio
        aspectRatio: 2, // Adjust this if needed, e.g., 1 for square, or the actual aspect ratio of your image
    },
    welcomeText: {
        fontSize: 30,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 20,
        fontSize: 16,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        paddingHorizontal: 10,
    },
    
    icon: {
        marginRight: 10,
    },

    loginButton: {
        backgroundColor: '#004aad',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotPassword: {
        color: '#004aad',
        textAlign: 'center',
    },
    signupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signupText: {
        marginTop: 130,
        color: '#333',
    },
    signupButton: {
        marginTop: 130,
        color: '#004aad',
        fontWeight: 'bold',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    loadingText: {
        marginTop: 10,
        color: '#004aad',
        fontSize: 16,
    },
});
