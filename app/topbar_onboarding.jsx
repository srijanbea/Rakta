import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';

const OnboardingHeader = ({ title }) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.headerContainer}>
            <View style={styles.innerContainer}>
            <Text style={styles.title}>{title}</Text>
                <TouchableOpacity 
                    style={styles.skipButton} 
                    onPress={() =>         navigation.reset({
                        index: 0,
                        routes: [{ name: 'dashboard' }],
                    })}
                >
                    <Icon name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#004aad',
        height: 80, // 
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end', 
        paddingHorizontal: 10, // paddingTop: 40 #android
        paddingVertical: 10
    
    },
    skipButton: {
        marginRight: 10,
        marginLeft: 10
    },
    title: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default OnboardingHeader;
