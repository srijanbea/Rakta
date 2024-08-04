import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/rakta-logo-white.png')} style={styles.image} resizeMode="contain" />
      <Text style={styles.subtitle}>Your reliable blood donation companion.</Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
        <Icon name="arrow-forward" size={20} color="#004aad" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#004aad',
  },
  image: {
    width: '80%',
    height: undefined,
    aspectRatio: 1.5,
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 100,
    color: '#fff',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    elevation: 2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#004aad',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});