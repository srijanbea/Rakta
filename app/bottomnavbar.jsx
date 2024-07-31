// BottomNavBar.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';

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
    <View style={styles.bottomNavBar}>
      <Icon 
        name="home" 
        size={30} 
        color={activeScreen === 'dashboard' ? "#ff7e5f" : "#777"} 
        onPress={navigateToHome} 
      />
      <Icon 
        name="location-on" 
        size={30} 
        color={activeScreen === 'bloodBanks' ? "#ff7e5f" : "#777"} 
        onPress={navigateToBloodBanks} 
      />
      <Icon 
        name="person" 
        size={30} 
        color={activeScreen === 'profile' ? "#ff7e5f" : "#777"} 
        onPress={navigateToProfile} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default BottomNavBar;
