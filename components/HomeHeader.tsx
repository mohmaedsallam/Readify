import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const HomeHeader = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 7.5,
          backgroundColor: "#A56635",
          elevation: 7,
        }}
      >
        <View
          style={{
            // flex: 1,
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F5E9E0",
            paddingHorizontal: 15,
            borderRadius: 20,
          }}
        >
          <Ionicons name="search" size={24} color={"#472C17"} />
          <TextInput
            cursorColor={"#C27A43"}
            placeholder="Title, author or ISBN"
            style={styles.input}
          />
          <Ionicons name="camera-outline" size={24} color={"#472C17"} />
        </View>
        <Ionicons name="notifications-outline" size={24} color="white" />
      </View>
    </SafeAreaView>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  input: {
    height: 40,
    padding: 10,
    width: 240,
  },
});
