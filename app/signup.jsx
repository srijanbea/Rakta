import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import { auth, db, storage } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function SignUpScreen() {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    const navigation = useNavigation();

    // Request permission for image picker
    React.useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission required', 'We need permission to access your gallery to pick a profile picture.');
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        console.log('ImagePicker result:', result); // Log the entire result object
    
        if (!result.canceled && result.assets && result.assets.length > 0) {
            console.log('Image picked:', result.assets[0].uri); // Log the image URI from assets
            setImageUri(result.assets[0].uri);
        } else {
            console.log('Image selection canceled or no assets found');
        }
    };

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('username', '==', username));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                Alert.alert('Error', 'Username is already taken');
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            let profilePictureUrl = '';
            if (imageUri) {
                const response = await fetch(imageUri);
                const blob = await response.blob();
                const imageRef = ref(storage, `profilePictures/${user.uid}`);
                await uploadBytes(imageRef, blob);
                profilePictureUrl = await getDownloadURL(imageRef);
                console.log('Profile picture URL:', profilePictureUrl); // Log the image URL
            }

            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                fullName: fullName,
                username: username,
                email: email,
                profilePicture: profilePictureUrl,
            });

            Alert.alert(
                'Registration Successful',
                'Your account has been created successfully.',
                [{ text: 'OK', onPress: () => navigation.navigate('login') }],
                { cancelable: false }
            );
        } catch (error) {
            console.error('Error during registration:', error); // Log the detailed error
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                Alert.alert('Error', 'Email is already in use');
            } else {
                Alert.alert('Error', 'An error occurred during registration');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#004aad" />
                        </View>
                    ) : (
                        <>
                            <Text style={styles.heading}>Register</Text>
                            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                                {imageUri ? (
                                    <Image source={{ uri: imageUri }} style={styles.image} />
                                ) : (
                                    <View style={styles.imagePlaceholder}>
                                        <Ionicons name="add-circle" size={30} color="#aaa" />
                                        <Text style={styles.uploadText}>Profile Picture</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                            <View style={styles.form}>
                                <View style={styles.inputContainer}>
                                    <Ionicons name="person-outline" size={20} color="#aaa" style={styles.icon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Full Name"
                                        value={fullName}
                                        onChangeText={setFullName}
                                        placeholderTextColor="#aaa"
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Ionicons name="mail-outline" size={20} color="#aaa" style={styles.icon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email"
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        placeholderTextColor="#aaa"
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Ionicons name="person-outline" size={20} color="#aaa" style={styles.icon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Username"
                                        value={username}
                                        onChangeText={setUsername}
                                        placeholderTextColor="#aaa"
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Ionicons name="lock-closed-outline" size={20} color="#aaa" style={styles.icon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Password"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry
                                        autoCapitalize="none"
                                        placeholderTextColor="#aaa"
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Ionicons name="lock-closed-outline" size={20} color="#aaa" style={styles.icon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        secureTextEntry
                                        autoCapitalize="none"
                                        placeholderTextColor="#aaa"
                                    />
                                </View>
                                <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.loginContainer}>
                                <Text style={styles.loginText}>Already have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                                    <Text style={styles.loginButton}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </ScrollView>
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
        padding: 20,
    },
    heading: {
        fontSize: 30,
        color: '#333',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    imagePicker: {
        width: 120, // Adjust size as needed
        height: 120, // Adjust size as needed
        borderRadius: 60, // Circular border radius
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderColor: '#004aad',
        borderWidth: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadText: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 10,
        color: '#aaa'

    },

    form: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    signUpButton: {
        backgroundColor: '#004aad',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginText: {
        color: '#333',
    },
    loginButton: {
        color: '#004aad',
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
