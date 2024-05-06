import React, { useState } from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import CustomFlatList from "../../components/CustomFlatList";
const Discover = () => {
  const [refreshing, setRefreshing] = useState(false);
  // const [selectedCategories] = useAtom(selectedCategoriesAtom); // Access the selectedCategories atom

  const handleRefresh = () => {
    setRefreshing(true);
    // Perform any necessary operations or fetch data here, if needed

    // For demonstration purposes, let's simulate a delay of 2 seconds
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          // colors={["#B5703B"]}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
    >
      <CustomFlatList
        ActivityIndicatorColor={"#B5703B"}
        query={"Thriller"}
        onRefresh={handleRefresh}
      />
      <CustomFlatList
        ActivityIndicatorColor={"#FAF4EF"}
        query={"harry potter"}
        onRefresh={handleRefresh}
      />

      <CustomFlatList
        ActivityIndicatorColor={"#FAF4EF"}
        query={"horror"}
        onRefresh={handleRefresh}
      />
      <CustomFlatList
        ActivityIndicatorColor={"#FAF4EF"}
        query={"crime"}
        onRefresh={handleRefresh}
      />
      <CustomFlatList
        ActivityIndicatorColor={"#FAF4EF"}
        query={"cinema"}
        onRefresh={handleRefresh}
      />
    </ScrollView>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAF4EF",
    padding: 10,
    gap: 20,
  },
});
