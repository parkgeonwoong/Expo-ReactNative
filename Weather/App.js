import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const API_KEY = "d1fe3418dfc59eb30f55c27f2a885061";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);

    // 날씨
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alert&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>

      <ScrollView
        horizontal
        // pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
        style={styles.scrollView}
      >
        {days.length === 0 ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#4361ee" />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>
                {parseFloat(day.temp.day).toFixed(1)}
              </Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text>{day.weather[0].description}</Text>
            </View>
          ))
        )}
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
    fontSize: 28,
    fontWeight: "500",
  },
  scrollView: {
    // flex: 3,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
  },
  weather: {
    margin: 5,
    backgroundColor: "white",
  },
  loading: {
    // flex: 1,
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "tomato",
  },
  day: {
    width: SCREEN_WIDTH,
    marginLeft: -5,
    // justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 128,
  },
  description: {
    // marginLeft: 10,
    marginTop: -10,
    fontSize: 40,
  },
});
