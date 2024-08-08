import { Stack } from 'expo-router';
import CustomHeader from './topbar';
import NotificationHeader from './topbar_notifications';

export default function RootLayout() {
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
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding_first" options={{ headerShown: false }} />
      <Stack.Screen name="personalinfo" options={{ headerShown: false }} />
      <Stack.Screen name="medicalinfo" options={{ headerShown: false }} />
      <Stack.Screen name='forgotpassword' options={{
        header: () => <CustomHeader title="Back to Login" />,
      }} />
      <Stack.Screen name="signup" options={{
        header: () => <CustomHeader title="Back to Login" />,
      }} />
      <Stack.Screen name="dashboard" options={{
        header: () => <NotificationHeader title="" />,
      }} />
      <Stack.Screen name="donorprofile" options={{
        header: () => <CustomHeader title="Dashboard" />,
      }} />
      <Stack.Screen name="donateblood" options={{
        header: () => <CustomHeader title="Dashboard" />,
      }} />
      <Stack.Screen name="requestblood" options={{
        header: () => <CustomHeader title="Dashboard" />,
      }} />
      <Stack.Screen name="donationhistory" options={{
        header: () => <CustomHeader title="Dashboard" />,
      }} />
      <Stack.Screen name="bloodbanks" options={{
        header: () => <NotificationHeader title="" />,
      }} />
      <Stack.Screen name="profile" options={{
        header: () => <NotificationHeader title="" />,
      }} />
      <Stack.Screen name="notifications" options={{
        header: () => <CustomHeader title="" />,
      }} />
    </Stack>
  );
}