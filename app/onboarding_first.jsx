import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function OnboardingScreen() {
    const [fullName, setFullName] = useState('');
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
        navigation.navigate('personalinfo');
    };

    const getFirstName = (fullName) => {
        if (fullName.includes(' ')) {
            return fullName.split(' ')[0];
        }
        return fullName;
    };

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
                            <Text style={styles.headerText}>Welcome</Text>
                            <Text style={styles.userFirsName}>{getFirstName(fullName)} !</Text>
                            <Text style={styles.subHeaderText}>Glad to have you with us.</Text>
                        </View>
                        <Image source={require('../assets/images/onboarding1.png')} style={styles.onboardingImage} />
                            
                        <Text style={styles.infoText}>
                            We will collect your personal and medical information to ensure the best match and care for both donors and recipients. The information you provide will be used to create your donor profile in Rakta to accurately match you with donation opportunities and keep your records up to date. Thank you for your willingness to contribute!
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                                <Text style={styles.buttonText}>Create Your Profile</Text>
                                <Icon name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
                            </TouchableOpacity>
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
    userFirsName: {
        fontSize: 35,
        color: '#fff',
        alignSelf: 'flex-start'
    },

    subHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
    },
    onboardingImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 11,
        color: '#000',
        textAlign: 'justify',
        marginTop: 20,
        marginBottom: 30,
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
    },
    nextButton: {
        flexDirection: 'row',
        backgroundColor: '#004aad',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        width: 220,
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
