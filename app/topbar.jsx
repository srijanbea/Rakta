import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';

const CustomHeader = ({ title }) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.headerContainer}>
            <View style={styles.innerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={25} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
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
        height: 80, // Set height to ensure sufficient space for header
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingBottom: 10 // paddingTop: 40 #android

    },
    backButton: {
        marginLeft: 10,
        marginRight: 10, // Adds space between the back button and the title
    },
    title: {
        color: '#fff',
        flex: 1, // Allows title to take up remaining space
        fontSize: 15,
        fontWeight: 'bold',
    },
});


export default CustomHeader;