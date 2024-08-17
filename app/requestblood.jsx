import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import BottomNavBar from './bottomnavbar';

export default function BloodRequestScreen() {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
  const [bloodAmount, setBloodAmount] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedRequester, setSelectedRequester] = useState(null);
  const [isScheduled, setIsScheduled] = useState(false);

  const bloodGroups = [
    { type: 'A+', name: 'A Positive' },
    { type: 'A-', name: 'A Negative' },
    { type: 'B+', name: 'B Positive' },
    { type: 'B-', name: 'B Negative' },
    { type: 'O+', name: 'O Positive' },
    { type: 'O-', name: 'O Negative' },
    { type: 'AB+', name: 'AB Positive' },
    { type: 'AB-', name: 'AB Negative' },
  ];

  const handleBloodGroupSelect = (group) => {
    setSelectedBloodGroup(group.type);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.dateString);
    setIsModalVisible(false);
  };

  const handleRequestBlood = () => {
    if (!selectedBloodGroup || !bloodAmount || (isScheduled && !selectedDate) || !selectedRequester) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    const requestDate = isScheduled ? selectedDate : 'Now';
    Alert.alert('Blood Request', `Requesting ${bloodAmount} mL of ${selectedBloodGroup} blood for ${requestDate} by ${selectedRequester}.`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Select Blood Group</Text>

        <View style={styles.bloodGroupContainer}>
          {bloodGroups.map((group, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.bloodGroupButton,
                selectedBloodGroup === group.type && styles.bloodGroupButtonSelected,
              ]}
              onPress={() => handleBloodGroupSelect(group)}
              accessible={true}
              accessibilityLabel={`Select ${group.type}`}
            >
              <Ionicons
                name="water"
                size={28}
                color={selectedBloodGroup === group.type ? '#ffffff' : '#004aad'}
              />
              <Text
                style={[
                  styles.bloodGroupText,
                  selectedBloodGroup === group.type && styles.bloodGroupTextSelected,
                ]}
              >
                {group.type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.unitContainer}>
          <Ionicons name="water" size={24} color="#004aad" />
          <TextInput
            style={styles.unitInput}
            keyboardType="numeric"
            placeholder="Enter amount in ml"
            placeholderTextColor="#aaa"
            value={bloodAmount}
            onChangeText={(text) => setBloodAmount(text)}
          />
        </View>

        <View style={styles.scheduleOptionContainer}>
          <Text style={styles.scheduleOptionText}>Schedule for Later :</Text>
          <Switch
            value={isScheduled}
            onValueChange={(value) => setIsScheduled(value)}
          />
        </View>

        {isScheduled && (
          <TouchableOpacity 
            style={styles.scheduleButton} 
            onPress={() => setIsModalVisible(true)}
          >
            <Ionicons name="calendar" size={24} color="#004aad" />
            <Text style={styles.scheduleText}>
              {selectedDate ? selectedDate : 'Select Date'}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={[
            styles.requestButton,
            (!selectedBloodGroup || !bloodAmount || (isScheduled && !selectedDate) || !selectedRequester) && styles.requestButtonDisabled
          ]}
          onPress={handleRequestBlood}
          disabled={!selectedBloodGroup || !bloodAmount || (isScheduled && !selectedDate) || !selectedRequester}
        >
          <Text style={styles.requestButtonText}>Request Blood</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date</Text>
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={handleDateChange}
                markedDates={{ [selectedDate]: { selected: true } }}
              />
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 20,
    
  },
  bloodGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  bloodGroupButton: {
    width: '22%', // Adjust width to fit 4 cards in a row
    aspectRatio: 1, // Makes the height equal to the width
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Adding shadow to the card
  },
  bloodGroupButtonSelected: {
    backgroundColor: '#004aad',
  },
  bloodGroupText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 8,
  },
  bloodGroupTextSelected: {
    color: '#ffffff',
  },
  unitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: '100%',
    justifyContent: 'space-between',
    elevation: 3,
    marginBottom: 20,
  },
  unitInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    borderBottomColor: '#004aad',
  },
  scheduleOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  scheduleOptionText: {
    fontSize: 18,
    color: '#333',
  },
  scheduleButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    elevation: 3,
    marginBottom: 20,
  },
  scheduleText: {
    fontSize: 16,
    color: '#333',
  },
  requestButton: {
    backgroundColor: '#004aad',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    elevation: 3,
  },
  requestButtonDisabled: {
    backgroundColor: '#004aad',
  },
  requestButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: '90%',
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  calendarContainer: {
    width: '100%',
  },
  closeButton: {
    backgroundColor: '#004aad',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
