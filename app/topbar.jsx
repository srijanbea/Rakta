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
        height: 80, 
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingTop: 40, // paddingBottom: 10 #ios

    },
    backButton: {
        marginLeft: 10,
        marginRight: 10,
    },
    title: {
        color: '#fff',
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
    },
});


export default CustomHeader;
