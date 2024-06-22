import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import Colors from "../constants/Colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const addBookTo = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(true);
  const navigation = useNavigation();

  const [book, setBook] = useState([]);
  const thumbnailUrl =
    book.volumeInfo?.imageLinks?.thumbnail ||
    "https://th.bing.com/th/id/OIP.wZcfZHnfHGNucVulgNQvDAAAAA?rs=1&pid=ImgDetMain";
  const bookTitle = book.volumeInfo?.title || "Unknown Title";

  const { id } = useLocalSearchParams();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: false,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="checkmark" size={28} color={"#fff"} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="close-outline" size={28} color={"#fff"} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  useLayoutEffect(() => {
    const fetchBookDetails = async (id) => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyBtGaliMMof_6FS8qZe6BgxWGrXJL7kuRk`
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
  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: "100%", height: 280 }}>
        <BackGroundImage
          book={book}
          thumbnailUrl={thumbnailUrl}
          bookTitle={bookTitle}
        />
      </View>

      <Text
        style={{
          marginVertical: 8,
          fontSize: 20,
          fontWeight: 600,
          textAlign: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#ddd",
        }}
      >
        Select A Shelf
      </Text>

      <View style={{ flex: 1, padding: 10 }}>
        <View
          style={{
            // flex: 1,
            padding: 15,
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 400, marginRight: 8 }}>
            Read
          </Text>
          <Text style={{ marginRight: "auto" }}>5 books</Text>
          <BouncyCheckbox onPress={(isChecked) => {}} />
        </View>
        <View
          style={{
            // flex: 1,
            padding: 15,
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 400, marginRight: 8 }}>
            Currently Reading{" "}
          </Text>
          <Text style={{ marginRight: "auto" }}>0 books</Text>
          <BouncyCheckbox onPress={(isChecked) => {}} />
        </View>
        <View
          style={{
            // flex: 1,
            padding: 15,

            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 400, marginRight: 8 }}>
            Want to read
          </Text>
          <Text style={{ marginRight: "auto" }}>4 books</Text>
          <BouncyCheckbox onPress={(isChecked) => {}} />
        </View>
      </View>
    </View>
  );
};

const BackGroundImage = ({ book, thumbnailUrl, bookTitle }) => {
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
          ></View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default addBookTo;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    height: 300,
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
