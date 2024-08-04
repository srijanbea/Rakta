import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function Notifications() {

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.infoText}>Notifications Section</Text>
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