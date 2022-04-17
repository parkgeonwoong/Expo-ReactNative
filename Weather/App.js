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
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("screen"); // 휴대폰 화면
const API_KEY = "d1fe3418dfc59eb30f55c27f2a885061"; // 날씨 API
const icons = {
  // icon맞춰 불러오기
  Clouds: "cloudy",
  Clear: "day-sunny",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    // 사용자 위치 요청
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    // 위도, 경도 옵션에 맞춰 불러오기
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    // 주소 알아오기
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    // 도시이름 가져오기
    setCity(location[0].city);

    // 날씨 API
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
        <Fontisto name="android" size={32} color="black" />
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
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "80%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={68}
                  color="white"
                />
              </View>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={{ color: "white" }}>
                {day.weather[0].description}
              </Text>
              <Text style={{ color: "white" }}>
                {new Date(day.dt * 1000).toString().substring(0, 10)}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
      <StatusBar style="light" />
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
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    margin: 5,
    paddingHorizontal: 40,
    backgroundColor: "white",
    // borderRadius: 10,
    // elevation: 5,
  },
  cityName: {
    fontSize: 32,
    fontWeight: "500",
  },
  scrollView: {
    // flex: 3,
    margin: 35,
    borderRadius: 10,
    backgroundColor: "#4895ef",
    elevation: 10,
  },
  weather: {
    margin: 5,
    backgroundColor: "#4895ef",
  },
  loading: {
    // flex: 1,
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -35,
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 20,
    color: "white",
  },
  temp: {
    marginTop: 50,
    marginLeft: -10,
    fontWeight: "600",
    fontSize: 80,
    color: "white",
  },
  description: {
    // marginLeft: 10,
    marginTop: -10,
    fontSize: 30,
    fontWeight: "500",
    color: "white",
  },
});
