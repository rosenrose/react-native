import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
// import * as util from "util";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "9df3465a846a3f853f168149173fd2ec";

export default function App() {
  const [isGranted, setIsGranted] = useState(false);
  const [city, setCity] = useState("로딩...");
  const [days, setDays] = useState([]);

  const getWeather = async () => {
    const position = await Location.getCurrentPositionAsync({});
    console.log(position);
    const {
      coords: { latitude, longitude },
    } = position;

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    console.log(location);
    setCity(location[0].city);

    const weather = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&exclude=alerts&units=metric`
      )
    ).json();
    console.log(weather.daily);
    setDays(weather.daily);
  };

  useEffect(() => {
    (async () => {
      const permission = await Location.requestForegroundPermissionsAsync();
      setIsGranted(permission.granted);
      if (!permission.granted) {
        return;
      }

      await getWeather();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        // persistentScrollbar={true}
        contentContainerStyle={styles.weather}
      >
        {days.length ? (
          days.map((day) => (
            <View key={day.dt} style={styles.day}>
              <Text style={styles.tempetature}>{day.temp.day.toFixed(1)}</Text>
              <Text style={styles.main}>{day.weather[0].main}</Text>
              <Text style={styles.description}>{day.weather[0].description}</Text>
            </View>
          ))
        ) : (
          <View style={styles.day}>
            <ActivityIndicator color="white" size="large" style={{ marginTop: 10 }} />
          </View>
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    color: "black",
    fontSize: 68,
    fontWeight: "bold", //["normal","bold","100","200","300","400","500","600","700","800","900"]
  },
  weather: {
    // backgroundColor: "teal",
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  tempetature: {
    fontSize: 150,
    marginTop: 50,
  },
  main: {
    fontSize: 60,
    marginTop: -30,
  },
  description: {
    fontSize: 20,
  },
});
