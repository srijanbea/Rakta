import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';

const CustomHeader2 = ({ title }) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.headerContainer}>
            <View style={styles.innerContainer}>
            <Text style={styles.title}>{title}</Text>
                <TouchableOpacity 
                    style={styles.arrowForwardButton} 
                    onPress={() => navigation.navigate('dashboard')}
                >
                    <Icon name="arrow-forward" size={25} color="#fff" />
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
        paddingBottom: 10, // paddingTop: 40 #android
    },
    arrowForwardButton: {
        marginRight: 10,
        marginLeft: 10
    },
    title: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default CustomHeader2;