import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');

const BottomNavBar = ({ activeScreen }) => {
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate('dashboard');
  };

  const navigateToProfile = () => {
    navigation.navigate('profile');
  };

  const navigateToBloodBanks = () => {
    navigation.navigate('bloodbanks');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconWrapper}>
          <Icon 
            name="home" 
            size={30} 
            color={activeScreen === 'dashboard' ? "#004aad" : "#777"} 
            onPress={navigateToHome} 
          />
          <Text style={[styles.label, { color: activeScreen === 'dashboard' ? "#004aad" : "#777" }]}>Home</Text>
        </View>
        <View style={styles.iconWrapper}>
          <Icon 
            name="local-hospital" 
            size={30} 
            color={activeScreen === 'bloodbanks' ? "#004aad" : "#777"} 
            onPress={navigateToBloodBanks} 
          />
          <Text style={[styles.label, { color: activeScreen === 'bloodbanks' ? "#004aad" : "#777" }]}>Blood Banks</Text>
        </View>
        <View style={styles.iconWrapper}>
          <Icon 
            name="person" 
            size={30} 
            color={activeScreen === 'profile' ? "#004aad" : "#777"} 
            onPress={navigateToProfile} 
          />
          <Text style={[styles.label, { color: activeScreen === 'profile' ? "#004aad" : "#777" }]}>Profile</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0, // Ensure it's at the bottom of the screen
    left: 0,
    right: 0,
    width: width, // Make the container stretch full width
    backgroundColor: '#fff', // Background color of the nav bar
    borderTopColor: '#ddd', // Optional border color
    borderTopWidth: 0, // Remove border if you want a seamless look
    borderRadius: 0, // Remove rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 }, // Shadow above the bar
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, // Elevation for Android
    paddingVertical: 9, // Space inside the nav bar
    paddingHorizontal: 16,
    alignItems: 'center', // Center the icon container horizontally
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%', // Stretch icons container to full width
    marginBottom: 12,
  },
  iconWrapper: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default BottomNavBar;
