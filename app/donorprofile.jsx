import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function DonorProfile() {

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Donor Profile</Text>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="edit" size={8} color="#004aad" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileSection}>
  <Image source={require('../assets/images/user-placeholder.png')} style={styles.profileImage} />
  <View style={styles.profileDetails}>
    <Text style={styles.profileName}>Sudeep Poudel</Text>
    <View style={styles.profileDescription}>
    <View style={styles.leftInfoColumn}>
        <Text style={styles.profileLabel}>Blood Group</Text>
        <Text style={styles.profileValue}>O+</Text>
      </View>
      <View style={styles.rightInfoColumn}>
        <Text style={styles.profileLabel}>Donations</Text>
        <Text style={styles.profileValue}>3</Text>
      </View>
    </View>
  </View>
</View>



      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Email</Text>
        <Text style={styles.infoText}>sudeep.poudel@yahoo.com</Text>
        <Text style={styles.infoLabel}>Mobile No.</Text>
        <Text style={styles.infoText}>+977-9811364390</Text>
        <Text style={styles.infoLabel}>Address</Text>
        <Text style={styles.infoText}>Balaju, Kathmandu</Text>
        <Text style={styles.infoLabel}>Area</Text>
        <Text style={styles.infoText}>Balaju</Text>
      </View>

      <View style={styles.acknowledgeSection}>
        <Text style={styles.acknowledgeTitle}>We Acknowledge</Text>
        <Text style={styles.acknowledgeText}>Here is a badge for you as our appreciation for your contributions made to save lives.</Text>
        <Image source={require('../assets/images/badge.png')} style={styles.badgeImage} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    backgroundColor: '#004aad',
    padding: 20,
  },
  headerTextContainer: {
    alignItems: 'flex-end',
  },
  headerText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 25,
    marginTop: 10,
  },
  editButtonText: {
    color: '#004aad',
    marginLeft: 5,
    fontSize: 8,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'relative',
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
    position: 'absolute',
    top: -60,
    left: 20,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  profileDetails: {
    flex: 1,
    
  },
  profileName: {
    marginLeft: 140,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileDescription: {
    flexDirection: 'row',
    marginTop: 10, // Space between profile name and the new sections
    marginBottom: 35
  },
  rightInfoColumn: {
    position: 'absolute',
    marginLeft: 259,
  },
  leftInfoColumn: {
    position: 'absolute',
    marginLeft: 141,
  },
  profileLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  
  profileValue: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    fontWeight: 'bold',
  },
    
  infoSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  acknowledgeSection: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    alignItems: 'center',
  },
  acknowledgeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  acknowledgeText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  badgeImage: {
    marginTop: 10,
    width: 120,
    height: 120,
  },
});
