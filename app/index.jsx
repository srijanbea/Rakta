import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from 'expo-router';

export default function OnboardingScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/splash.png')} style={styles.image} />
      <Text style={styles.title}>Rakta</Text>
      <Text style={styles.subtitle}>Your reliable blood donation companion.</Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#555555',
  },
});
