import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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

const Categories = () => {
  const router = useRouter();
  const [bookCategories, setBookCategories] = useState(initialBookCategories);

  const handlePress = (index: number) => {
    setBookCategories((prevState) =>
      prevState.map((category, i) =>
        i === index
          ? {
              ...category,
              icon:
                category.icon === "checkmark"
                  ? initialBookCategories[i].icon
                  : "checkmark",
            }
          : category
      )
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {bookCategories.map((category, index) => (
          <View key={index} style={[styles.category]}>
            <TouchableOpacity
              style={[styles.circle, { backgroundColor: category.color }]}
              onPress={() => handlePress(index)}
            >
              <Ionicons name={category.icon as any} size={40} color="#6B240C" />
            </TouchableOpacity>
            <Text style={styles.categoryName}>{category.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 20,
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

export default Categories;