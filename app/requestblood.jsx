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
    { type: 'B+', name: 'B Positive' },
    { type: 'O+', name: 'O Positive' },
    { type: 'AB+', name: 'AB Positive' },
  ];

  const handleBloodGroupSelect = (group) => {
    setSelectedBloodGroup(group.type);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.dateString);
    setIsModalVisible(false);
  };

  const handleRequesterSelect = (type) => {
    setSelectedRequester(type);
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
              accessibilityLabel={`Select ${group.name}`}
            >
              <View style={[
                styles.iconContainer,
                selectedBloodGroup === group.type && styles.iconContainerSelected,
              ]}>
                <Ionicons
                  name={selectedBloodGroup === group.type ? "water-outline" : "water"}
                  size={28}
                  color={selectedBloodGroup === group.type ? '#ffffff' : '#004aad'}
                />
              </View>
              <Text
                style={[
                  styles.bloodGroupText,
                  selectedBloodGroup === group.type && styles.bloodGroupTextSelected,
                ]}
              >
                {group.type}
              </Text>
              <Text style={[
                styles.bloodGroupSubText,
                selectedBloodGroup === group.type && styles.bloodGroupSubTextSelected,
              ]}>
                {group.name} ({group.type})
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.unitContainer}>
          <Ionicons name="water" size={24} color="#004aad" />
          <TextInput
            style={styles.unitInput}
            keyboardType="numeric"
            placeholder="Enter amount in mL"
            placeholderTextColor="#aaa"
            value={bloodAmount}
            onChangeText={(text) => setBloodAmount(text)}
          />
        </View>

        <View style={styles.scheduleOptionContainer}>
          <Text style={styles.scheduleOptionText}>Schedule for Later:</Text>
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

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.meButton,
              selectedRequester === 'Me' && styles.meButtonSelected
            ]}
            onPress={() => handleRequesterSelect('Me')}
          >
            <Text style={styles.meButtonText}>Me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.otherButton,
              selectedRequester === 'Other' && styles.otherButtonSelected
            ]}
            onPress={() => handleRequesterSelect('Other')}
          >
            <Text style={styles.otherButtonText}>Other</Text>
          </TouchableOpacity>
        </View>

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
    marginBottom: 20,
  },
  bloodGroupButton: {
    width: '45%',
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#004aad',
    elevation: 3,
  },
  bloodGroupButtonSelected: {
    backgroundColor: '#004aad',
    borderColor: '#004aad',
  },
  iconContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  iconContainerSelected: {
    backgroundColor: '#004aad',
  },
  bloodGroupText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    marginTop: 8,
  },
  bloodGroupTextSelected: {
    color: '#ffffff',
  },
  bloodGroupSubText: {
    fontSize: 12,
    color: '#555',
  },
  bloodGroupSubTextSelected: {
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
    borderBottomWidth: 1,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  meButton: {
    flex: 1,
    backgroundColor: '#004aad',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  meButtonSelected: {
    backgroundColor: '#002f7e',
  },
  meButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  otherButton: {
    flex: 1,
    backgroundColor: '#004aad',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginLeft: 10,
  },
  otherButtonSelected: {
    backgroundColor: '#002f7e',
  },
  otherButtonText: {
    color: '#ffffff',
    fontSize: 16,
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
    backgroundColor: '#aaa',
  },
  requestButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  calendarContainer: {
    width: '100%',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#004aad',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
