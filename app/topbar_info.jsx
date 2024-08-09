import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';

const InfoHeader = ({ title }) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.headerContainer}>
            <View style={styles.innerContainer}>
            <Text style={styles.title}>{title}</Text>
                <TouchableOpacity 
                    style={styles.skipButton} 
                    onPress={() => navigation.navigate('dashboard')}
                >
                    <Icon name="arrow-forward" size={20} color="#004aad" />
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
        backgroundColor: '#fff',
        height: 80, // 
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end', 
        paddingHorizontal: 10, // paddingTop: 40 #android
    
    },
    skipButton: {
        marginRight: 10,
        marginLeft: 10
    },
    title: {
        color: '#004aad',
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default InfoHeader;
