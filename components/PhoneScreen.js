import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text, Linking} from 'react-native';

// PhoneScreen component for making phone calls
const PhoneScreen = ({batteryLevel}) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    // Handler to make a phone call
    const makePhoneCall = () => {
    let url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) =>
      console.error('An error occurred', err)
    );
  };

 return (
    <View style={styles.container}>
    <Text style={styles.batteryLevel}>Battery Level: {batteryLevel !== null ? `${(batteryLevel * 100).toFixed(0)}%` : 'Loading...'}</Text>
   <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={makePhoneCall}>
      <Text style={styles.buttonText}>Make Phone Call</Text>
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
   input: {
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 16,
    marginTop: 30,
    borderRadius: 5
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


export default PhoneScreen;
