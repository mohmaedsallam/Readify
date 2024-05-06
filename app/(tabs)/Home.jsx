import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import BookCard from "../../components/BookCard"; // Assuming you have a BookCard component
import CustomFlatList from "../../components/CustomFlatList";

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <CustomFlatList ActivityIndicatorColor={"#FF5733"} query={"Thriller"} />
      <CustomFlatList
        ActivityIndicatorColor={"#FAF4EF"}
        query={"harry potter"}
      />
      <CustomFlatList ActivityIndicatorColor={"#FAF4EF"} query={"basketball"} />
      <CustomFlatList ActivityIndicatorColor={"#FAF4EF"} query={"Mystery"} />
      <CustomFlatList ActivityIndicatorColor={"#FAF4EF"} query={"Children"} />
      <CustomFlatList ActivityIndicatorColor={"#FAF4EF"} query={"horror"} />
      <CustomFlatList ActivityIndicatorColor={"#FAF4EF"} query={"crime"} />
      <CustomFlatList ActivityIndicatorColor={"#FAF4EF"} query={"cinema"} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAF4EF",
    padding: 10,
  },
});

export default Home;
