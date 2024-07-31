import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, KeyboardAvoidingView, Platform, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust the path to your firebaseConfig

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleLogin = async () => {
        setLoading(true); // Show loading indicator

        try {
            // Authenticate the user with Firebase
            await signInWithEmailAndPassword(auth, email, password);

            // If successful, navigate to Dashboard
            navigation.navigate('dashboard');
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

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                    </View>
                    <Text style={styles.welcomeText}>Welcome</Text>
                    <View style={styles.form}>
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
                    <ActivityIndicator size="large" color="#ff7e5f" />
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
        marginBottom: 30,
    },
    logo: {
        width: 150,
        height: 150,
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
    input: {
        height: 50,
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 20,
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: '#ff7e5f',
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
        color: '#ff7e5f',
        textAlign: 'center',
        marginBottom: 130,
    },
    signupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signupText: {
        color: '#333',
    },
    signupButton: {
        color: '#ff7e5f',
        fontWeight: 'bold',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    loadingText: {
        marginTop: 10,
        color: '#fff',
        fontSize: 16,
    },
});
