import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const NotificationItem = () => {
  return (
    <View style={{ flexDirection: "row", padding: 10 }}>
      <Image
        style={{ width: 40, height: 40, borderRadius: 50 }}
        source={require("../assets/images/facebook.jpeg")}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          paddingBottom: 15,
          borderBottomColor: "#CCC",
          borderBottomWidth: 1,
          gap: 15,
        }}
      >
        <Text style={{ color: "#472C17" }}>
          Hello my name is mohamed, i'm from egypt, i would love to ask u out
          for a book date, exchange our ideas and books too
        </Text>
        <Text style={{ color: "#9A5F32" }}>Jan 10 at 8:01 AM</Text>
      </View>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({});
