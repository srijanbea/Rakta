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
    padding: 16,
    backgroundColor: '#004aad'
  },
  image: {
    width: '100%', // Ensure the image takes full width of its container
    height: undefined, // Let the height adjust based on the aspect ratio
    aspectRatio: 2, // Adjust this if needed, e.g., 1 for square, or the actual aspect ratio of your image
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
    paddingHorizontal: 20, // Reduced paddingHorizontal to balance the content
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
    marginRight: 10, // Reduced marginRight for better alignment
  },
});
