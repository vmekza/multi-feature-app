import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ToastAndroid,
  ActionSheetIOS,
  TouchableOpacity,
  Text,
} from 'react-native';
import ForecastScreen from './ForecastScreen';
import Header from './Header';
import CitySelector from './CitySelector';

// WeatherScreen component to display weather data
export default function WeatherScreen({ batteryLevel }) {
  const [weatherData, setWeatherData] = useState({
    temperature: '',
    windSpeed: '',
    description: '',
    iconCode: '',
    humidity: '',
  });
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const api_key = '42b07ea1220572d10e3727665938905d';
  const [unit, setUnit] = useState('metric');

  //Fetch weather data
  const fetchWeatherData = async (location, unitType = unit) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=${unitType}`
      );
      const data = await response.json();

      setWeatherData({
        temperature: data.main.temp,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
        iconCode: data.weather[0].icon,
        humidity: data.main.humidity,
      });
      setSelectedLocation(location);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
  };

  //Fetch forecast data
  const fetchForecastData = async (location) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${api_key}&units=metric`
      );
      const data = await response.json();
      setForecastData(data.list);
    } catch (error) {
      console.error('Failed to fetch forecast data:', error);
    }
  };

  //Handler for city selection
  const handleCitySelect = (location) => {
    fetchWeatherData(location);
    fetchForecastData(location);
    setIsButtonPressed(true);
  };

  //Refresh weather data on Android
  const refreshWeatherDataAndroid = () => {
    fetchWeatherData(selectedLocation);
    ToastAndroid.show('Weather data refreshed!', ToastAndroid.SHORT);
  };

  //Change units of measurement in iOS
  const changeUnits = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    fetchWeatherData(selectedLocation, newUnit);
  };

  //Display settings action sheet on iOS
  const showSettingsActionSheetIOS = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Change Units'],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          changeUnits();
        } else if (buttonIndex === 2) {
          selectCity();
        }
      }
    );
  };

  //Render platform-specific button
  const renderPlatformSpecificButton = () => {
    if (Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={refreshWeatherDataAndroid}>
          <Text style={styles.btnText}>Refresh</Text>
        </TouchableOpacity>
      );
    } else if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity
          onPress={showSettingsActionSheetIOS}
          style={styles.iosButton}>
          <Text style={styles.btnText}>Settings</Text>
        </TouchableOpacity>
      );
    }
  };

  //Render the main content of the screen
  const renderMainContent = () => (
    <View style={styles.container}>
      <Text style={styles.batteryLevel}>
        Battery Level:{' '}
        {batteryLevel !== null
          ? `${(batteryLevel * 100).toFixed(0)}%`
          : 'Loading...'}
      </Text>
      <Header location={selectedLocation} />
      <CitySelector onCitySelect={handleCitySelect} />
      {isButtonPressed && (
        <ForecastScreen
          weatherData={weatherData}
          forecastData={forecastData}
          unit={unit}
        />
      )}
      {renderPlatformSpecificButton()}
    </View>
  );

  return renderMainContent();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FFFA',
    padding: 8,
  },
  batteryLevel: {
    position: 'absolute',
    top: 10,
    right: 25,
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: 700,
  },
 
  button: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFF0F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  iosButton: {
    backgroundColor: '#92D8F8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    elevation: 5,
  },
  btnText: {
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});

