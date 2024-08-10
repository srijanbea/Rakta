import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient'; 
import Icon from 'react-native-vector-icons/MaterialIcons';

import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function OnboardingScreen() {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const auth = getAuth();
    const firestore = getFirestore();
    const navigation = useNavigation();

    const handleNext = () => {
        navigation.navigate('personalinfo');
    };

    const fetchUserDetails = useCallback(async () => {
        const user = auth.currentUser;
        if (user) {
          setEmail(user.email);
    
          const usersCollection = collection(firestore, 'users');
          const userQuery = query(usersCollection, where('email', '==', user.email));
    
          try {
            const querySnapshot = await getDocs(userQuery);
            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0].data();
              setFullName(userDoc.fullName);
    
              await AsyncStorage.setItem('userDetails', JSON.stringify({
                email: userDoc.email,
                fullName: userDoc.fullName,
              }));
            } else {
              console.log('No such document!');
            }
          } catch (error) {
            console.log('Error fetching user details:', error);
          }
        } else {
          console.log('Error', 'No user is logged in.');
        }
      }, [auth, firestore]);

      useEffect(() => {
        fetchUserDetails();
      }, [fetchUserDetails]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient
                colors={['#004aad', '#f0f8ff']}
                start={[0, 0]}
                end={[0, 1]}
                style={styles.background}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Welcome!</Text>
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
            </LinearGradient>
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
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    background: {
        flex: 1,
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
    },
    subHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
        marginBottom: 20,
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
        marginTop: 30,
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
