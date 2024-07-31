import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from './bottomnavbar'; // Adjust the path as needed

export default function BloodBanksScreen() {
  const navigation = useNavigation();

  const navigateToNotifications = () => {
    navigation.navigate('notifications'); // Make sure this is the correct route name for the Notifications
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.infoText}>Request Blood Section</Text>
        {/* Add the content for blood banks information here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'space-between', // Ensures the bottom bar is pushed to the bottom
  },
  content: {
    flex: 1, // Takes the available space between the title bar and bottom nav
    padding: 16,
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});
