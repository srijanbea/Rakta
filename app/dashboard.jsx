import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';

export default function DashboardScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the Dashboard!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
});
