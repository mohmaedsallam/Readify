import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";

const More = () => {
  const [favoritebooks, setFavoritebooks] = useState([]);

  useEffect(() => {
    const getFavoritebooks = async () => {
      try {
        const favoriteBooksString = await AsyncStorage.getItem("favoritebooks");
        const favoritebooks = favoriteBooksString
          ? JSON.parse(favoriteBooksString)
          : [];
        setFavoritebooks(favoritebooks);
      } catch (err) {
        console.log("Error getting favorite books:", err);
      }
    };

    getFavoritebooks();
  }, [favoritebooks]);

  const renderItem = ({ item }) => {
    // console.log("Item:", item); // Debugging: Check the item structure
    const thumbnailUrl =
      item.volumeInfo?.imageLinks?.thumbnail ||
      "https://th.bing.com/th/id/OIP.wZcfZHnfHGNucVulgNQvDAAAAA?rs=1&pid=ImgDetMain";
    const bookTitle = item.volumeInfo?.title || "Unknown Title";
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity style={styles.bookContainer} activeOpacity={0.7}>
          <Image source={{ uri: thumbnailUrl }} style={styles.bookImage} />
          <Text style={styles.bookTitle} numberOfLines={2}>
            {bookTitle}
          </Text>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritebooks.reverse()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  bookContainer: {
    width: "48%",
    marginVertical: 16,
    alignItems: "center",
  },
  bookImage: {
    width: "100%",
    height: 245,
    resizeMode: "cover",
    borderRadius: 8,
  },
  bookTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#53331B",
  },
});
