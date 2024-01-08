import React, { useState, useEffect } from 'react';

import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import WeatherForecastListItem from './WeatherForecastListItem';

// ForecastScreen component to display forecast data
const ForecastScreen = ({ weatherData, forecastData, unit }) => {
  const { temperature, windSpeed, description, iconCode, humidity } =
    weatherData;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const [filteredForecast, setFilteredForecast] = useState([]);
  const unitSymbol = unit === 'metric' ? '°C' : '°F';
  const windSpeedUnit = unit === 'metric' ? 'm/s' : 'mph';

  useEffect(() => {
    const filterForecast = () => {
      const filtered = [];
      const dates = new Set();

      // Filtering forecast data to avoid duplicate dates
      forecastData.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayName = dayNames[date.getDay()];
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const combinedDate = `${dayName}, ${day}/${month}`;

        if (!dates.has(`${day}/${month}`)) {
          dates.add(`${day}/${month}`);
          filtered.push({ ...item, combinedDate });
        }
      });

      return filtered;
    };

    setFilteredForecast(filterForecast());
  }, [forecastData]);
  return (
    <View style={styles.container}>
      <View style={styles.currentWeatherContainer}>
        <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
        <Text style={styles.temperature}>
          {Math.round(temperature)}
          {unitSymbol}
        </Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.windAndHumidity}>
          Wind: {Math.round(windSpeed)} {windSpeedUnit}
        </Text>
        <Text style={styles.windAndHumidity}>Humidity: {humidity} %</Text>
      </View>

      <FlatList
        data={filteredForecast}
        renderItem={({ item }) => (
          <WeatherForecastListItem
            day={item.combinedDate}
            temperature={item.main.temp}
            windSpeed={item.wind.speed}
            iconCode={item.weather[0].icon}
            unit={unit}
          />
        )}
        keyExtractor={(item) => item.dt.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  currentWeatherContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 28,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  windAndHumidity: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ForecastScreen;
