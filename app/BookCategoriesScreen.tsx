import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import Categories from "../components/Categories";

const BookCategoriesScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" backgroundColor="#FFF8F3" />

      <View style={styles.container}>
        <Text style={styles.title}>Choose your favorite Categories</Text>
        <Categories />
        <TouchableOpacity style={styles.arrowContainer}>
          <Ionicons
            style={styles.arrow}
            name="arrow-forward"
            size={40}
            color="white"
            onPress={() => router.push("/(tabs)/Home")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F3",
    // alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 20,
  },
  title: {
    color: "#794B28",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  arrowContainer: {
    // backgroundColor: "#B66F39",
    alignSelf: "flex-end",
  },
  arrow: {
    backgroundColor: "#B66F39",
    top: 10,
    // left: 290,
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 35,
    textAlign: "center",
    lineHeight: 60,
  },
});

export default BookCategoriesScreen;
