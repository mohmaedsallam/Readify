import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Categories from "../../components/Categories";
import { SafeAreaView } from "react-native-safe-area-context";
const initialBookCategories = [
  { name: "Thriller", icon: "albums-outline", color: "#FFD5B4" },
  { name: "Romance", icon: "heart-outline", color: "#F0B182" },
  { name: "Mystery", icon: "book-sharp", color: "#FFA662" },
  { name: "Fiction", icon: "book-outline", color: "#FFD5B4" },
  { name: "Biography", icon: "person-outline", color: "#F0B182" },
  { name: "Sci-fi", icon: "planet-outline", color: "#FFA662" },
  { name: "Fantasy", icon: "star-outline", color: "#FFD5B4" },
  { name: "Young Adult", icon: "school-outline", color: "#F0B182" },
  { name: "History", icon: "time-outline", color: "#FFA662" },
  { name: "Children", icon: "happy-outline", color: "#FFD5B4" },
  { name: "Horror", icon: "skull-outline", color: "#F0B182" },
  { name: "Graphic Novel", icon: "images-outline", color: "#FFA662" },
  { name: "Adventure", icon: "compass-outline", color: "#FFD5B4" },
  { name: "Self-Help", icon: "help-circle-outline", color: "#F0B182" },
  { name: "Science", icon: "flask-outline", color: "#FFA662" },
  { name: "Poetry", icon: "create-outline", color: "#FFD5B4" },
  { name: "Non-fiction", icon: "bookmarks-outline", color: "#F0B182" },
  { name: "Humor", icon: "happy-outline", color: "#FFA662" },
];

const Search = () => {
  const [bookCategories, setBookCategories] = useState(initialBookCategories);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={25} color="#A56635" />
        <TextInput
          style={styles.input}
          placeholderTextColor="#A56635"
          placeholder="Search"
          cursorColor="#A56635"
        />
      </View>
      <Categories />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: { backgroundColor: "#FFF8F3", flex: 1 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "#A56635",
    borderWidth: 1,
    padding: 10,
    margin: 30,
    // marginTop: 30,
    // backgroundColor: "#FFF8F3",
  },
  input: {
    flex: 1,
    height: 35,
    marginLeft: 10,
    // borderColor: "",
  },
  scrollView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  category: {
    width: "33%",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 0.5,
  },
  categoryName: {
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
    // color: "#000",
    color: "#6B240C",
  },
});
