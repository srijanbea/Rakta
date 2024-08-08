import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//     webClientId: "275266781580-q3je1v06lsmi2bjc3e1h2rk585n95ufp.apps.googleusercontent.com",
//     offlineAccess: true,
//   });

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setError({});
        });
        return unsubscribe;
    }, [navigation]);


    const handleLogin = async () => {
        const newError = {};

        if (!email) {
            newError.email = 'This field is required';
        }

        if (!password) {
            newError.password = 'This field is required';
        }

        setError(newError);

        if (Object.keys(newError).length === 0) {
            setLoading(true);
            try {
                await signInWithEmailAndPassword(auth, email, password);
                const user = auth.currentUser;

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'onboarding_first' }],
                });
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/invalid-credential') {
                    setPassword('');
                    newError.password = 'Invalid Credentials';
                } else {
                    Alert.alert('Error', errorMessage);
                }
                setError(newError);
            } finally {
                setLoading(false);
            }
        }
    };

    // const signInWithGoogle = async () => {
    //     setLoading(true);
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         const idToken = userInfo.idToken;
    //         const credential = GoogleAuthProvider.credential(idToken);
    //         const userCredential = await signInWithCredential(auth, credential);
    //         const user = userCredential.user;
    //         const userDocRef = doc(db, 'users', user.uid);
    //         const userDoc = await getDoc(userDocRef);
    
    //         if (!userDoc.exists()) {
    //             // Create the user document with a specific ID (user.uid)
    //             await setDoc(userDocRef, {
    //                 uid: user.uid,
    //                 fullName: userInfo.user.name,
    //                 email: userInfo.user.email,
    //                 profilePicture: userInfo.user.photo,
    //             });
    //         }
    //         navigation.reset({
    //             index: 0,
    //             routes: [{ name: 'onboarding_first' }],
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

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

                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.signInWithGoogleButton} onPress={signInWithGoogle} disabled={loading}> */}
                        <TouchableOpacity style={styles.signInWithGoogleButton} disabled={loading}>
                            <View style={styles.googleButtonContent}>
                                <Image source={require('../assets/images/google-icon-small.png')} style={styles.googleLogo} />
                                <Text style={styles.signInWithGoogleButtonText}>Continue With Google</Text>
                            </View>
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
        marginBottom: 50,
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        width: '90%',
        height: undefined,
        aspectRatio: 2,
    },
    welcomeText: {
        fontSize: 30,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    form: {
        width: '100%',
        marginBottom: 100,
    },
    fieldWrapper: {
        marginBottom: 15,
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
    loginButton: {
        backgroundColor: '#004aad',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginVertical: 10,
        height: 55,
        justifyContent: 'center'
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signInWithGoogleButton: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: "#004aad",
        borderRadius: 25,
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 55,
    },
    googleButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    googleLogo: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    signInWithGoogleButtonText: {
        color: '#004aad',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    forgotPassword: {
        marginTop: 5,
        color: '#004aad',
        textAlign: 'center',
    },
    signupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupText: {
        color: '#333',
    },
    signupButton: {
        color: '#004aad',
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
