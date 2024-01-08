import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

// HomeScreen component for navigation between different screens
const HomeScreen = ({navigation, batteryLevel}) => {

  // Navigation to the Weather screen
  const goToWeatherScreen = () => {
    navigation.navigate('Weather'); 
  };

  // Navigation to the Location screen
   const goToLocationScreen = () => {
    navigation.navigate('Location');
  };

  // Navigation to the Phone screen
   const goToPhoneScreen = () => {
    navigation.navigate('Phone');
  };

 return (
    <View style={styles.container}>
    <Text style={styles.batteryLevel}>Battery Level: {batteryLevel !== null ? `${(batteryLevel * 100).toFixed(0)}%` : 'Loading...'}</Text>
      <TouchableOpacity style={styles.button} onPress={goToWeatherScreen}>
        <Text style={styles.buttonText}>Go to Weather</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToLocationScreen}>
        <Text style={styles.buttonText}>Go to Location</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToPhoneScreen}>
        <Text style={styles.buttonText}>Go to Phone</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FFFA',
    
  },
  batteryLevel: {
    position: "absolute",
    top: 10,
    right: 25,
    textTransform: "uppercase",
    fontSize: 10,
    fontWeight: 700
  },
  button: {
    backgroundColor: '#FFF0F5',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    textTransform: 'uppercase',
    fontWeight: '700'
  },
});


export default HomeScreen;
