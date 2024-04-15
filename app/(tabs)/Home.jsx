import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Listings from "../../components/Listings";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data, isLoading } = useQuery({
    queryFn: () =>
      fetch(
        "https://www.googleapis.com/books/v1/volumes?q=react&key=AIzaSyBtGaliMMof_6FS8qZe6BgxWGrXJL7kuRk"
      ).then((response) => response.json()),
    queryKey: ["book"],
  });

  if (isLoading) return <ActivityIndicator size="small" color="#0000ff" />;
  return (
    <View style={styles.container}>
      <Listings data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#FFF8F3", flex: 1 },
});

export default Home;
