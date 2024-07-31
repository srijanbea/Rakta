import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';

export default function DashboardScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notifications Section</Text>
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
