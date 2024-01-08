import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// WeatherForecastListItem component to display weather data for a single day
const WeatherForecastListItem = ({ day, temperature, windSpeed, iconCode, unit  }) => {
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

const unitSymbol = unit === 'metric' ? '°C' : '°F';
const windSpeedUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <View style={styles.container}>
      <Text style={styles.day}>{day}</Text>
      <Image source={{ uri: iconUrl }} style={styles.icon} />
       <Text style={styles.temperature}>{Math.round(temperature)}{unitSymbol} </Text>
      <Text style={styles.wind}>Wind: {Math.round(windSpeed)} {windSpeedUnit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  day: {
    fontSize: 18,
  },
  icon: {
    width: 50,
    height: 50,
  },
  temperature: {
    fontSize: 18,
  },
   wind: {
    fontSize: 16,
  },
});

export default WeatherForecastListItem;
