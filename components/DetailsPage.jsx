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
  Pressable,
  Linking,
} from "react-native";
import { router, useNavigation, useRouter } from "expo-router";
import Colors from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import DiscussionForum from "./DiscussionForum";
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
  const router = useRouter();
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
      <BackGroundImage
        book={book}
        thumbnailUrl={thumbnailUrl}
        bookTitle={bookTitle}
        shareBook={shareBook}
      />
      <View style={styles.contentContainer}>
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
        <View>
          <Text>Discussion Forum</Text>
          <DiscussionForum bookId={book.id} />
        </View>
      </View>
    </ScrollView>
  );
};

const BackGroundImage = ({ book, thumbnailUrl, bookTitle, shareBook }) => {
  return (
    <ImageBackground
      source={{
        uri: thumbnailUrl,
      }}
      style={{
        // height: 240,
        flex: 1,
        padding: 15,
        flexDirection: "row",
      }}
      blurRadius={7}
    >
      <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
        <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
        <View
          style={{
            flex: 1,
            gap: 6,
          }}
        >
          <Text style={styles.title}>{bookTitle}</Text>
          <Text style={styles.author}>{book?.volumeInfo?.authors[0]} </Text>
          <Text style={styles.author}>{book?.volumeInfo?.publisher} </Text>
          <View
            style={{
              // flex: 1,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text style={styles.infoValue}>
              {book?.volumeInfo?.publishedDate || "N/A"} .{" "}
              {book?.volumeInfo?.pageCount || "N/A"} pages{" "}
            </Text>
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text
              style={[styles.infoValue, { fontWeight: "bold", marginRight: 2 }]}
            >
              {book?.volumeInfo?.averageRating || "N/A"}
            </Text>
            <AntDesign name="star" size={12} color="#A56635" />
            <Text style={[styles.infoValue, { marginHorizontal: 8 }]}>
              {book?.volumeInfo?.ratingsCount || "N/A"} ratings .
            </Text>
            <Text style={styles.infoValue}>
              {String(book?.volumeInfo?.language).toUpperCase()}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 5,
            }}
          >
            <BlurredButton
              iconName="add"
              title="Add"
              onPress={() =>
                router.push({ pathname: "addBookTo", params: { id: book.id } })
              }
            />
            <BlurredButton iconName="share" title="Share" onPress={shareBook} />
            <BlurredButton id={book.id} iconName="cart" title="Buy" />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const BlurredButton = ({ iconName, title, onPress, id }) => {
  const handlePress = async () => {
    if (iconName === "cart") {
      const buyLink = `https://play.google.com/store/books/details?id=${id}`;
      const supported = await Linking.canOpenURL(buyLink);
      if (supported) {
        await Linking.openURL(buyLink);
      } else {
        console.log("Don't know how to open this URL:", buyLink);
      }
    } else if (iconName === "book") {
      const readLink = `http://play.google.com/books/reader?id=${id}`;
      const supported = await Linking.canOpenURL(readLink);
      if (supported) {
        await Linking.openURL(readLink);
      } else {
        console.log("Don't know how to open this URL:", readLink);
      }
    } else {
      onPress();
    }
  };
  return (
    <Pressable
      onPress={handlePress}
      style={styles.button}
      android_ripple={{ color: "rgba(255, 255, 255, 0.3)" }}
    >
      <Ionicons name={iconName} size={20} color="white" />
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF4EF",
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
    width: "37%",
    height: "95%",
    resizeMode: "contain",
    borderRadius: 11,
    // alignSelf: "flex-end",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FAF4EF",
    // marginTop: 12,
  },
  author: {
    fontSize: 14,
    color: "#FAF4EF",
    // marginBottom: 8,
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
    color: "#FAF4EF",
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
    // textDecorationLine: "underline",
    color: "#4A3B32",
    marginTop: 8,
    fontWeight: "bold",
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
  button: {
    width: 65,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default DetailsPage;
