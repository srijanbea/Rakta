import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function DonorCard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>My Donor Card</Text>
          </View>
        </View>

        <View style={styles.profileSection}>
          <Image source={require('../assets/images/placeholder.jpg')} style={styles.profileImage} />
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>Sudeep Poudel</Text>
            <View style={styles.profileDescription}>
              <View style={styles.infoColumn}>
                <Text style={styles.profileLabel}>Blood Group</Text>
                <Text style={styles.profileValue}>O+</Text>
              </View>
              <View style={styles.infoColumn}>
                <Text style={styles.profileLabel}>Donations</Text>
                <Text style={styles.profileValue}>3</Text>
              </View>
              <View style={styles.infoColumn}>
                <Text style={styles.profileLabel}>BMI</Text>
                <Text style={styles.profileValue}>22.5</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Donor ID</Text>
          <Text style={styles.infoText}>123456</Text>
          <Text style={styles.infoLabel}>Last Donation Date</Text>
          <Text style={styles.infoText}>2024-08-16</Text>
          <Text style={styles.infoLabel}>Available to Donate</Text>
          <Text style={styles.infoText}>Yes</Text>
        </View>

        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>Download Card</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    width: '90%',
  },
  header: {
    marginBottom: 20,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004aad',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: '#fff',
  },
  profileDetails: {
    marginLeft: 20,
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileDescription: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  infoColumn: {
    flex: 1,
    alignItems: 'center',
  },
  profileLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  profileValue: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  downloadButton: {
    backgroundColor: '#004aad',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
