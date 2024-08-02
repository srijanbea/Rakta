import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, Platform, StatusBar, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineChart } from 'react-native-chart-kit';
import BottomNavBar from './bottomnavbar'; // Adjust the path as needed
import { Dimensions } from 'react-native';
import { format } from 'date-fns';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [chartData, setChartData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();
  const firestore = getFirestore();
  const [totalBloodDonation, setTotalBloodDonation] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);
  const formattedDate = lastUpdated ? format(lastUpdated, "EEE, MMM d, h:mm a") : 'No updates yet';


  const fetchUserDetails = useCallback(async () => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);

      const usersCollection = collection(firestore, 'users');
      const userQuery = query(usersCollection, where('email', '==', user.email));

      try {
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0].data();
          setFullName(userDoc.fullName);
          setProfilePicture(userDoc.profilePicture);

          await AsyncStorage.setItem('userDetails', JSON.stringify({
            email: userDoc.email,
            fullName: userDoc.fullName,
            profilePicture: userDoc.profilePicture
          }));
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        Alert.alert('Error', 'Failed to load user details.');
      }
    } else {
      Alert.alert('Error', 'No user is logged in.');
    }
  }, [auth, firestore]);

  const fetchLiveData = useCallback(async () => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

    const q = query(collection(firestore, 'rakta_usage'), where('date', '>=', startOfWeek));
    
    try {
      const snapshot = await getDocs(q);
      const labels = [];
      const data = [];
      
      snapshot.forEach(doc => {
        const dataPoint = doc.data();
        
        if (dataPoint && dataPoint.date && dataPoint.blood_donation_count !== undefined) {
          const date = dataPoint.date.toDate ? dataPoint.date.toDate() : new Date(dataPoint.date.seconds * 1000);
          const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
          
          labels.push(formattedDate);
          data.push(dataPoint.blood_donation_count);
        }
      });

      // Ensure there are 7 data points with latest data centered
      const totalPoints = 7;
      const emptyPoints = totalPoints - labels.length;
      const halfEmptyPoints = Math.floor(emptyPoints / 2);

      const finalLabels = Array(halfEmptyPoints).fill('').concat(labels).concat(Array(totalPoints - labels.length - halfEmptyPoints).fill(''));
      const finalData = Array(halfEmptyPoints).fill(0).concat(data).concat(Array(totalPoints - labels.length - halfEmptyPoints).fill(0));

      setChartData({
        labels: finalLabels,
        datasets: [{
          data: finalData,
          strokeWidth: 2,
        }]
      });
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching live data:', error);
      Alert.alert('Error', 'Failed to load live data.');
    }
  }, [firestore]);

  const navigateToNotifications = () => {
    navigation.navigate('notifications');
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 74, 173, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#004aad"
    },
    style: {
      borderRadius: 16,
      paddingRight: 16,
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: '#e0e0e0',
    },
    propsForHorizontalLines: {
      strokeWidth: 1,
      stroke: '#e0e0e0',
    },
    propsForVerticalLines: {
      strokeWidth: 1,
      stroke: '#e0e0e0',
    },
  };
  const calculateTotalBloodDonation = useCallback(async () => {
    const q = query(collection(firestore, 'rakta_usage'));
  
    try {
      const snapshot = await getDocs(q);
      let totalCount = 0;
  
      snapshot.forEach(doc => {
        const dataPoint = doc.data();
        if (dataPoint && dataPoint.blood_donation_count !== undefined) {
          totalCount += dataPoint.blood_donation_count;
        }
      });
  
      setTotalBloodDonation(totalCount); // Ensure this updates the state
    } catch (error) {
      console.error('Error calculating total blood donation:', error);
      Alert.alert('Error', 'Failed to calculate total blood donation.');
    }
  }, [firestore]);

  useEffect(() => {
    fetchUserDetails();
    fetchLiveData();
    calculateTotalBloodDonation();
  }, [fetchUserDetails, fetchLiveData, calculateTotalBloodDonation]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLiveData();
    await calculateTotalBloodDonation();
    setLastUpdated(new Date());
    setRefreshing(false);
  };
  
  
  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <TouchableOpacity onPress={navigateToNotifications}>
          <Icon name="notifications" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Text style={styles.subtitle}>GIVE THE GIFT OF LIFE</Text>
        <Text style={styles.heading}>
          Donate <Text style={styles.bold}>Blood</Text>
        </Text>
        <View style={styles.statsContainer}>
          <View style={[styles.statsCard, styles.statsCardAccent]}>
            <Text style={styles.statsCountAccent}>0</Text>
            <Text style={styles.statsLabelAccent}>Blood Requested</Text>
          </View>
          <View style={[styles.statsCard, styles.statsCardDefault]}>
            <Text style={styles.statsCount}>{totalBloodDonation}</Text>
            <Text style={styles.statsLabel}>Lives Saved</Text>
          </View>
        </View>
        <Text style={styles.helpText}>
          Each donation can help save up to <Text style={styles.boldText}>3 lives!</Text>
        </Text>
        {chartData.labels.length > 0 ? (
          <LineChart
            data={chartData}
            width={screenWidth - 32}
            height={160}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        ) : (
          <Text style={styles.noDataText}>No data available</Text>
        )}
        {lastUpdated && (
          <Text style={styles.lastUpdatedText}>
            Last Updated on: {formattedDate}
          </Text>
        )

        }
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('donorprofile')}>
            <Icon name="person-add" size={35} color="#004aad" />
            <Text style={styles.optionTitle}>Create Donor Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('donateblood')}>
            <Icon name="bloodtype" size={35} color="#004aad" />
            <Text style={styles.optionTitle}>Donate Blood</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('requestblood')}>
            <Icon name="diversity-1" size={35} color="#004aad" />
            <Text style={styles.optionTitle}>Request Blood</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('donationhistory')}>
            <Icon name="history" size={35} color="#004aad" />
            <Text style={styles.optionTitle}>My Records</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavBar activeScreen="dashboard" />
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
  content: {
    padding: 16,
    flexGrow: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  heading: {
    fontSize: 40,
    color: '#004aad',
    textAlign: 'center',
    marginBottom: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  statsCard: {
    width: '45%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  statsCardAccent: {
    backgroundColor: '#004aad',
  },
  statsCardDefault: {
    backgroundColor: '#ffffff',
  },
  statsCountAccent: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  statsLabelAccent: {
    fontSize: 14,
    color: '#ffffff',
  },
  statsCount: {
    fontSize: 24,
    color: '#004aad',
    fontWeight: 'bold',
  },
  statsLabel: {
    fontSize: 14,
    color: '#004aad',
  },
  helpText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginVertical: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
  chart: {
    marginVertical: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 8,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginVertical: 16,
  },
  lastUpdatedText: {
    color: '#888',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 60,
  },
  optionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: 16,
    color: '#004aad',
    marginTop: 8,
  },
});
