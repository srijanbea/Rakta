import { Stack } from 'expo-router';
import { TransitionPresets } from '@react-navigation/stack';
import { TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library

export default function RootLayout() {
  const navigation = useNavigation();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#004aad',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS, // Add the transition preset here
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ 
        headerShown: true,
        title: '',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 5, flexDirection: 'row', alignItems: 'center'}}
          >
            <Icon name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
        ),
         }} />
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="donorprofile" options={{
        headerShown: true,
        title: '',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 5, flexDirection: 'row', alignItems: 'center'}}
          >
            <Icon name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
        ),
      }} />
      <Stack.Screen name="donateblood" options={{
        headerShown: true,
        title: '',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 5, flexDirection: 'row', alignItems: 'center'}}
          >
            <Icon name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
        ),
      }} />
      <Stack.Screen name="requestblood" options={{
        headerShown: true,
        title: '',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 5, flexDirection: 'row', alignItems: 'center'}}
          >
            <Icon name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
        ),
      }} />
      <Stack.Screen name="donationhistory" options={{
        headerShown: true,
        title: '',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 5, flexDirection: 'row', alignItems: 'center'}}
          >
            <Icon name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
        ),
      }} />
      <Stack.Screen name="bloodbanks" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen
        name="notifications"
        options={{
          headerShown: true,
          title: 'Notifications',
          headerStyle: {
            backgroundColor: '#004aad', // Change this to match your design
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ padding: 5, flexDirection: 'row', alignItems: 'center'}}
            >
              <Icon name="arrow-back" size={25} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
