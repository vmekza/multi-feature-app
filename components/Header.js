import { Text, View, StyleSheet } from 'react-native';

// Header component to display the city name
const Header = ({location}) => {
  return(
  <View>
      <Text style={styles.header_text}>{location}</Text>
  </View>
 
  )
}

const styles = StyleSheet.create ({
  header_text: {
    fontSize: 20,
    color: 'black',
    marginTop: 30,
    textTransform: 'uppercase'
  }
});

export default Header;