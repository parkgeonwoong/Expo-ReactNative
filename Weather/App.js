import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>

      <ScrollView
        horizontal
        // pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
        style={styles.scrollView}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>

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
    flex: 0.5,
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
  scrollView: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
  },
  weather: {
    margin: 5,
    backgroundColor: "white",
  },
  day: {
    width: SCREEN_WIDTH,
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
