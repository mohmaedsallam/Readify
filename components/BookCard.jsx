import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Link } from "expo-router";

const BookCard = ({ book }) => {
  const thumbnailUrl =
    book.volumeInfo?.imageLinks?.thumbnail ||
    "https://th.bing.com/th/id/OIP.wZcfZHnfHGNucVulgNQvDAAAAA?rs=1&pid=ImgDetMain";
  const bookTitle = book.volumeInfo?.title || "Unknown Title";
  const { volumeInfo } = book;
  // const thumbnail = volumeInfo.imageLinks?.thumbnail; // Get book thumbnail (if available)

  return (
    <Link href={`/listing/${book.id}`} asChild>
      <Pressable style={styles.container} android_ripple={{ color: "#EEE" }}>
        <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
        <Text style={styles.title}>{bookTitle}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 160,
    margin: 5,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
  },
  thumbnail: {
    // width: "100%",
    // height: 160,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 8,
  },
  title: {
    padding: 8,
    margin: 5,

    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BookCard;
