import { StyleSheet, Text, View, TouchableOpacity, Share } from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import DetailsPage from "../../components/DetailsPage";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
const Page = () => {
  const { id } = useLocalSearchParams();

  return <DetailsPage id={id} />;
};

export default Page;

const styles = StyleSheet.create({
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#A56635",
    alignItems: "center",
    justifyContent: "center",
    // color: "#A56635",
  },
  header: {
    backgroundColor: "#A56635",
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
});
