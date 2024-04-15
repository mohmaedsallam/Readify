import { StyleSheet, Text, TextInput, View } from "react-native";
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
          backgroundColor: "#CCC",
          elevation: 7,
        }}
      >
        <View
          style={{
            // flex: 1,
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            paddingHorizontal: 15,
            borderRadius: 20,
          }}
        >
          <Ionicons name="search" size={24} color={"black"} />
          <TextInput placeholder="Title, author or ISBN" style={styles.input} />
          <Ionicons name="camera-outline" size={24} color={"black"} />
        </View>
        <Ionicons name="notifications-outline" size={24} color="black" />
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
    // borderRadius: 10,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: "black",
  },
});
