import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineChart } from 'react-native-chart-kit';
import BottomNavBar from './bottomnavbar';
import { format } from 'date-fns';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {
  const [uid, setUid] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [contactNo, setContactNo] = useState('');
  const [cityDistrict, setCityDistrict] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [countryRegion, setCountryRegion] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [totalBloodDonated, setTotalBloodDonated] = useState('');
  const [totalBloodRequested, setTotalBloodRequested] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [availableToDonate, setAvailableToDonate] = useState('');


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
          setUid(userDoc.uid);
          setEmail(userDoc.email);
          setFullName(userDoc.fullName);
          setDateOfBirth(userDoc.dateOfBirth);
          setContactNo(userDoc.contactNo);
          setCityDistrict(userDoc.cityDistrict);
          setStateProvince(userDoc.stateProvince);
          setCountryRegion(userDoc.countryRegion);
          setBloodGroup(userDoc.bloodGroup);
          setHeight(userDoc.height);
          setWeight(userDoc.weight);
          setTotalBloodDonated(userDoc.totalBloodDonated);
          setTotalBloodRequested(userDoc.totalBloodRequested);
          setProfilePicture(userDoc.profilePicture);
          setAvailableToDonate(userDoc.availableToDonate);

          await AsyncStorage.setItem('userDetails', JSON.stringify({
            uid: userDoc.uid,
            email: userDoc.email,
            fullName: userDoc.fullName,
            dateOfBirth: userDoc.dateOfBirth,
            contactNo: userDoc.contactNo,
            cityDistrict: userDoc.cityDistrict,
            stateProvince: userDoc.stateProvince,
            countryRegion: userDoc.countryRegion,
            bloodGroup: userDoc.bloodGroup,
            height: userDoc.height,
            weight: userDoc.weight,
            totalBloodDonated: userDoc.totalBloodDonated,
            totalBloodRequested: userDoc.totalBloodRequested,
            profilePicture: userDoc.profilePicture,
            availableToDonate: userDoc.availableToDonate,
          }));
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Error fetching user details:', error);
      }
    } else {
      console.log('Error', 'No user is logged in.');
    }
  }, [auth, firestore]);

  console.log(email);
  console.log(fullName);
  console.log(dateOfBirth);
  console.log(contactNo);
  console.log(cityDistrict);
  console.log(stateProvince);
  console.log(countryRegion);
  console.log(bloodGroup);
  console.log(height);
  console.log(weight);
  console.log(totalBloodDonated);
  console.log(totalBloodRequested);

  const fetchLiveData = useCallback(async () => {
    const today = new Date();
    const startOfRange = new Date(today);
    startOfRange.setDate(startOfRange.getDate() - 4);
  
    const endOfRange = new Date(today);
    const q = query(
      collection(firestore, 'rakta_usage'),
      where('date', '>=', startOfRange),
      where('date', '<=', endOfRange)
    );
  
    try {
      const snapshot = await getDocs(q);
  
      const labels = [];
      const dataMap = {};
  
      for (let i = 4; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
        labels.push(formattedDate);
        dataMap[formattedDate] = 0;
      }
  
      labels.push(`${today.getDate()}/${today.getMonth() + 1}`); 
      dataMap[`${today.getDate()}/${today.getMonth() + 1}`] = 0; 
  
      for (let i = 1; i <= 2; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(futureDate.getDate() + i);
        const formattedDate = `${futureDate.getDate()}/${futureDate.getMonth() + 1}`;
        labels.push(formattedDate);
        dataMap[formattedDate] = 0; 
      }

      snapshot.forEach(doc => {
        const dataPoint = doc.data();
        if (dataPoint && dataPoint.date && dataPoint.blood_donation_count !== undefined) {
          const date = dataPoint.date.toDate ? dataPoint.date.toDate() : new Date(dataPoint.date.seconds * 1000);
          const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
  
          if (dataMap.hasOwnProperty(formattedDate)) {
            dataMap[formattedDate] = dataPoint.blood_donation_count;
            console.log(`Updated data for ${formattedDate}:`, dataPoint.blood_donation_count);
          }
        }
      });
  
      const finalLabels = [...new Set(labels)];
      const finalData = finalLabels.map(label => dataMap[label] || 0);
      
      
      console.log('Final Labels:', finalLabels);
      console.log('Final Data:', finalData);
  
      setChartData({
        labels: finalLabels,
        datasets: [{ data: finalData, strokeWidth: 2 }]
      });
  
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching live data:', error);
      Alert.alert('Error', 'Failed to load live data.');
    }
  }, [firestore]);
  

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
  
      setTotalBloodDonation(totalCount); 
    } catch (error) {
      console.log('Error calculating total blood donation:', error);
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
            <Icon name="face" size={35} color="#004aad" />
            <Text style={styles.optionTitle}>My Donor Profile</Text>
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