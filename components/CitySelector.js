import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

// CitySelector component for selecting a city
const CitySelector = ({ onCitySelect }) => {
  const [location, setLocation] = useState('');

  const handleDisplayPress = () => {
    onCitySelect(location);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setLocation}
        value={location}
        placeholder="Enter city name..."
      />
      <TouchableOpacity style={styles.btn} onPress={handleDisplayPress}>
        <Text style={styles.btnText}>Display</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 16,
    marginTop: 30,
    borderRadius: 5,
  },
  btn: {
    backgroundColor: '#FFF0F5',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnText: {
    color: 'black',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});

export default CitySelector;
