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
    <>
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", marginLeft: 6 }}>
          {String("Favorites").toUpperCase()}
        </Text>
        <FlatList
          data={favoritebooks.reverse()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={1}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", marginLeft: 6 }}>
          {String("Want to Read").toUpperCase()}
        </Text>
        <FlatList
          data={favoritebooks.reverse()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={1}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", marginLeft: 6 }}>
          {String("Read").toUpperCase()}
        </Text>
        <FlatList
          data={favoritebooks.reverse()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={1}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", marginLeft: 6 }}>
          {String("Currently Reading").toUpperCase()}
        </Text>
        <FlatList
          data={favoritebooks.reverse()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={1}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    padding: 6,
    flex: 1,
    backgroundColor: "#FFF",
  },

  bookContainer: {
    width: 110,
    height: 160,
    margin: 5,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
  },
  bookImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#53331B",
    padding: 2,
  },
});
