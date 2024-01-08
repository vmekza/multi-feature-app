import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  TextInput,
  Linking,
  TouchableOpacity
} from 'react-native';
import * as Location from 'expo-location';

// LocationScreen component to display and handle location data
export default function LocationScreen({batteryLevel}) {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 'Not known',
    longitude: 'Not known',
  });
  const [destination, setDestination] = useState('');
  
  // Handler to get the current position of the device
  const getCurrentPosition = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      // Getting the current position
      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setCurrentLocation(location.coords);
    } catch (error) {
      console.error(error);
      Alert.alert('Error while getting location', error.message);
    }
  };

  // Openning Google Maps for directions
  const openMapsForDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${destination}`;
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };


  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.batteryLevel}>Battery Level: {batteryLevel !== null ? `${(batteryLevel * 100).toFixed(0)}%` : 'Loading...'}</Text>
    
     <Text style={styles.text}>
  {typeof currentLocation === 'object'
    ? `Latitude: ${currentLocation.latitude}\nLongitude: ${currentLocation.longitude}`
    : currentLocation}
    </Text>

      <TouchableOpacity style={styles.button} onPress={getCurrentPosition} >
      <Text style={styles.buttonText}>Show current position</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        onChangeText={setDestination}
        value={destination}
        placeholder="Enter destination"
      />
      <TouchableOpacity style={styles.button} onPress={openMapsForDirections}>
      <Text style={styles.buttonText}>Get Directions</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FFFA', 
  },
  text: {
   textTransform: "uppercase"
  },
   batteryLevel: {
    position: "absolute",
    top: 10,
    right: 25,
    textTransform: "uppercase",
    fontSize: 10,
    fontWeight: 700
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginTop: 30,
    borderRadius: 5
  },

  button: {
    backgroundColor: '#FFF0F5',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
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


