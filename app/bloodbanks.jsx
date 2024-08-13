import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from './bottomnavbar';

const bloodBanksData = [
  {
    name: "Nepal Red Cross Society",
    address: "Kalimati, Kathmandu",
    contact: "+977-1-4270650"
  },
  {
    name: "Bhaktapur Red Cross Society",
    address: "Bhaktapur, Nepal",
    contact: "+977-1-6612266"
  },
  {
    name: "Patan Hospital Blood Bank",
    address: "Lagankhel, Lalitpur",
    contact: "+977-1-5522278"
  },
  {
    name: "Frontline Hospital Blood Bank",
    address: "Old Baneshwor, Kathmandu",
    contact: "01-5970132"
  },
  {
    name: "Teaching Hospital",
    address: "Maharajgunj, Kathmandu",
    contact: "01-44123030, 01-4410911"
  },
  {
    name: "Gangalal Hospital",
    address: "Bansbari, Kathmandu",
    contact: "01-4371322"
  }
];

export default function BloodBanksScreen() {
  const navigation = useNavigation();

  const navigateToNotifications = () => {
    navigation.navigate('notifications');
  };

  const renderBloodBank = ({ item }) => (
    <View style={styles.bloodBankContainer}>
      <Text style={styles.bloodBankName}>{item.name}</Text>
      <Text style={styles.bloodBankInfo}>{item.address}</Text>
      <Text style={styles.bloodBankInfo}>{item.contact}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <TouchableOpacity onPress={navigateToNotifications}>
          <Icon name="notifications" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
      <Image source={require('/home/srijanbea/Rakta-main/assets/images/blood-bag.png')} style={styles.logo} />
        <Text style={styles.headerText}>Blood Banks Section</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={bloodBanksData}
          renderItem={renderBloodBank}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <BottomNavBar activeScreen="bloodbanks" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'space-between',
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#004aad',
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004aad',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  bloodBankContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  bloodBankName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004aad',
    marginBottom: 8,
  },
  bloodBankInfo: {
    fontSize: 16,
    color: '#555',
  },
});
