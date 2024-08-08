import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
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
        <TouchableOpacity onPress={navigateToHome} style={styles.iconWrapper} accessibilityLabel="Home">
          <Icon 
            name="home" 
            size={30} 
            color={activeScreen === 'dashboard' ? "#004aad" : "#777"} 
          />
          <Text style={[styles.label, { color: activeScreen === 'dashboard' ? "#004aad" : "#777" }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToBloodBanks} style={styles.iconWrapper} accessibilityLabel="Blood Banks">
          <Icon 
            name="local-hospital" 
            size={30} 
            color={activeScreen === 'bloodbanks' ? "#004aad" : "#777"} 
          />
          <Text style={[styles.label, { color: activeScreen === 'bloodbanks' ? "#004aad" : "#777" }]}>Blood Banks</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToProfile} style={styles.iconWrapper} accessibilityLabel="Profile">
          <Icon 
            name="person" 
            size={30} 
            color={activeScreen === 'profile' ? "#004aad" : "#777"} 
          />
          <Text style={[styles.label, { color: activeScreen === 'profile' ? "#004aad" : "#777" }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: width,
    backgroundColor: '#fff',
    borderTopColor: '#ddd',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    paddingVertical: 9,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
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
