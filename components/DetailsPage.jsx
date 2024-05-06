import { Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Share,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Colors from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsPage = ({ id }) => {
  const [book, setBook] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const thumbnailUrl =
    book.volumeInfo?.imageLinks?.thumbnail ||
    "https://th.bing.com/th/id/OIP.wZcfZHnfHGNucVulgNQvDAAAAA?rs=1&pid=ImgDetMain";
  const bookTitle = book.volumeInfo?.title || "Unknown Title";
  const shareBook = async () => {
    try {
      await Share.share({
        title: book?.volumeInfo?.title,
        url: book.volumeInfo?.previewLink,
        message: `${book.volumeInfo?.previewLink}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const toggleFavorite = async () => {
    try {
      setIsFavorite(!isFavorite);

      const favoriteBooksString = await AsyncStorage.getItem("favoritebooks");
      let favoritebooks = favoriteBooksString
        ? JSON.parse(favoriteBooksString)
        : [];

      if (!isFavorite) {
        favoritebooks.push(book);
      } else {
        favoritebooks = favoritebooks.filter((b) => b.id !== book.id);
      }

      await AsyncStorage.setItem(
        "favoritebooks",
        JSON.stringify(favoritebooks)
      );
      // console.log(favoritebooks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const favoriteBooksString = await AsyncStorage.getItem("favoritebooks");
        let favoritebooks = favoriteBooksString
          ? JSON.parse(favoriteBooksString)
          : [];

        const isBookFavorite = favoritebooks.some((b) => b.id === book.id);
        setIsFavorite(isBookFavorite);
      } catch (err) {
        console.log(err);
      }
    };

    checkFavoriteStatus();
  }, [book.id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: false,
      headerBackground: () => <View style={styles.header}></View>,
      headerRight: () => (
        <View style={{ gap: 10, flexDirection: "row" }}>
          <TouchableOpacity style={styles.roundButton} onPress={shareBook}>
            <Ionicons name="share-outline" size={26} color={"#FFF"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFavorite} style={styles.roundButton}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={26}
              color={"#FFF"}
            />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={"#FFF"} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, shareBook]);

  useLayoutEffect(() => {
    const fetchBookDetails = async (bookId) => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyBtGaliMMof_6FS8qZe6BgxWGrXJL7kuRk`
        );
        const data = await response.json();
        setBook(data || []);
        setLoaded(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoaded(false);
      }
    };

    fetchBookDetails(id);
  }, []);

  if (loaded) {
    return <ActivityIndicator size="small" color="#B5703B" />;
  }

  const description = book?.volumeInfo?.description || "";
  const truncatedDescription =
    description.length > 250 ? `${description.slice(0, 250)}...` : description;

  const categories =
    book?.volumeInfo?.categories?.length > 3
      ? book?.volumeInfo?.categories?.slice(0, 3)
      : book?.volumeInfo?.categories;

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{
          uri: thumbnailUrl,
        }}
        style={{ height: 285, justifyContent: "center", alignItems: "center" }}
        blurRadius={7}
      >
        <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
      </ImageBackground>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{bookTitle}</Text>
        <Text style={styles.author}>
          By {book?.volumeInfo?.authors?.join(", ")}
        </Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Language:</Text>
            <Text style={styles.infoValue}>{book?.volumeInfo?.language}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Pages:</Text>
            <Text style={styles.infoValue}>
              {book?.volumeInfo?.pageCount || "N/A"}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Rating Count:</Text>
            <Text style={styles.infoValue}>
              {book?.volumeInfo?.ratingsCount || "N/A"}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Price:</Text>
            <Text style={styles.infoValue}>
              {book?.saleInfo?.listPrice?.amount
                ? `$${book?.saleInfo?.retailPrice?.amount}`
                : "N/A"}
            </Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {showFullDescription ? description : truncatedDescription}
        </Text>
        {description.length > 250 && (
          <TouchableOpacity
            onPress={() => setShowFullDescription(!showFullDescription)}
          >
            <Text style={styles.readMore}>
              {showFullDescription ? "Show less" : "Show more"}
            </Text>
          </TouchableOpacity>
        )}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesContainer}>
          {categories?.map((category, index) => (
            <View key={index} style={styles.categoryItem}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    marginBottom: 10,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    backgroundColor: "#A56635",
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
  thumbnail: {
    width: "40%",
    height: "85%",
    resizeMode: "cover",
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#A56635",
    marginTop: 12,
  },
  author: {
    fontSize: 16,
    color: "#9A5F32",
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoItem: {
    width: "50%",
    flexDirection: "row",

    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#764926",
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 14,
    color: "#472C17",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#A56635",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#472C17",
  },
  readMore: {
    textDecorationLine: "underline",
    color: "#4A3B32",
    marginTop: 8,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  categoryItem: {
    backgroundColor: "#CC9062",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    color: "#FFF",
    fontSize: 12,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DetailsPage;
