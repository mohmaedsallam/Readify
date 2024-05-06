import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const Notification = () => {
  const router = useRouter();
  return (
    <View style={{ borderRadius: 50, overflow: "hidden", marginRight: 10 }}>
      <Pressable
        style={{
          height: 35, // Adjust the size as needed
          width: 35, // Adjust the size as needed
          borderRadius: 50, // Make it circular
          justifyContent: "center",
          alignItems: "center",
        }}
        android_ripple={{ color: "#DDD" }} // Set the ripple color
        onPress={() => router.push("/NotificationCenter")}
      >
        <Ionicons name="notifications-outline" size={26} color={"#fff"} />
      </Pressable>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
