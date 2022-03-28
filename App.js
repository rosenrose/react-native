import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>서산</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        // persistentScrollbar={true}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.tempetature}>27°</Text>
          <Text style={styles.description}>맑음</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.tempetature}>27°</Text>
          <Text style={styles.description}>맑음</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.tempetature}>27°</Text>
          <Text style={styles.description}>맑음</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.tempetature}>27°</Text>
          <Text style={styles.description}>맑음</Text>
        </View>
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
    fontSize: 160,
    marginTop: 50,
  },
  description: {
    fontSize: 60,
    marginTop: -30,
  },
});
