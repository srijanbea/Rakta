import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';

const NotificationHeader = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.headerContainer}>
            <View style={styles.innerContainer}>
                <TouchableOpacity 
                    style={styles.notificationButton} 
                    onPress={() => navigation.navigate('notifications')}
                >
                    <Icon name="notifications" size={25} color="#fff" />
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
        paddingBottom: 10 // paddingTop: 40 #android
    },
    notificationButton: {
        marginRight: 10,
        marginLeft: 10
    },
});

export default NotificationHeader;
