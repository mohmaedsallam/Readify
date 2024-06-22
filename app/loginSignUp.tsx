import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  return (
    <>
      {/* <StatusBar style="dark" backgroundColor="#FFF8F3" /> */}
      <SafeAreaView style={styles.container}>
        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/images/readify-no-background.png")}
            style={styles.icon}
          />
        </View>
        <View style={{ flex: 3, width: "100%", alignItems: "center" }}>
          <View style={styles.btnsContainer}>
            <TouchableOpacity
              style={styles.logInBtn}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.logInBtnText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signUpBtn}
              onPress={() => router.push("/signUp")}
            >
              <Text style={styles.signUpBtnText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8F3",
  },
  iconContainer: { flex: 2, justifyContent: "flex-end" },
  icon: { width: 200, height: 175 },
  btnsContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    gap: 20,
    paddingHorizontal: 25,
    paddingBottom: 40,
    // backgroundColor: "red",
  },
  logInBtn: {
    backgroundColor: "#A56635",
    padding: 15,
    borderRadius: 8,
    elevation: 1,
  },
  logInBtnText: {
    textAlign: "center",
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  signUpBtn: {
    padding: 15,
    borderRadius: 8,
    borderColor: "#A56635",
    borderWidth: 1,
    backgroundColor: "#FFF8F3",
    elevation: 1,
  },
  signUpBtnText: {
    textAlign: "center",
    color: "#A56635",
    fontSize: 25,
    fontWeight: "bold",
  },
});
export default Home;
