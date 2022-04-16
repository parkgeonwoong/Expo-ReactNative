import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </View>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
  },
  cityName: {
    fontSize: 36,
    fontWeight: "500",
  },
  weather: {
    flex: 3,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
  },
  day: {
    flex: 1,
    marginLeft: 20,
    // alignItems: "center",
  },
  temp: {
    marginTop: 30,
    fontSize: 128,
  },
  description: {
    marginLeft: 10,
    marginTop: -20,
    fontSize: 30,
  },
});
