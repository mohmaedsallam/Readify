import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
// import Categories from "../../components/Categories";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useNavigation } from "expo-router";
import Notification from "../../components/Notification";
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

const Search = () => {
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <SafeAreaView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: 15,
              paddingVertical: 7.5,
              backgroundColor: "#A56635",
              elevation: 7,
            }}
          >
            <View
              style={{
                width: "87%",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F5E9E0",
                paddingHorizontal: 15,
                borderRadius: 20,
              }}
            >
              <Ionicons name="search" size={24} color={"#472C17"} />
              <TextInput
                cursorColor={"#C27A43"}
                placeholder="Title, author or ISBN"
                style={styles.input}
                defaultValue={searchQuery}
                onChangeText={setSearchQuery}
                // onChangeText={(text) => setSearchQuery(text)}
              />
              <Ionicons name="camera-outline" size={24} color={"#472C17"} />
            </View>
            <Notification />
          </View>
        </SafeAreaView>
      ),
    });
  }, [navigation, searchQuery]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const queueResponse = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            searchQuery
          )}&key=AIzaSyBtGaliMMof_6FS8qZe6BgxWGrXJL7kuRk`
        );
        const queueData = await queueResponse.json();
        setBooks(queueData.items || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching queue books:", error);
        setIsLoading(false);
      }
    };
    if (searchQuery) {
      fetchBooks();
    }
  }, [searchQuery]); // Add searchQuery to the dependency array

  const renderItem = ({ item }) => {
    const thumbnailUrl =
      item.volumeInfo?.imageLinks?.thumbnail ||
      "https://th.bing.com/th/id/OIP.wZcfZHnfHGNucVulgNQvDAAAAA?rs=1&pid=ImgDetMain";
    const bookTitle = item.volumeInfo?.title || "missing Title";
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
  // console.log(books);
  return (
    <SafeAreaView style={styles.container}>
      {searchQuery ? (
        <>
          <FlatList
            data={books}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            ListHeaderComponent={() => (
              <Text
                style={{ fontWeight: "bold", fontSize: 20, marginLeft: 10 }}
              >
                "10 results were found"
              </Text>
            )}
          />
        </>
      ) : (
        <Categories setSearchQuery={setSearchQuery} />
      )}
    </SafeAreaView>
  );
};

export default Search;

const Categories = ({ setSearchQuery }) => {
  const router = useRouter();
  const [bookCategories, setBookCategories] = useState(initialBookCategories);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handlePress = (index, name) => {
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

    if (selectedCategories.includes(name)) {
      setSelectedCategories((prevState) =>
        prevState.filter((category) => category !== name)
      );
    } else {
      setSelectedCategories((prevState) => [...prevState, name]);
      setSearchQuery(name); // Set the search query when a category is selected
    }
  };

  console.log(selectedCategories);

  return (
    <View style={styles.categoriesContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {bookCategories.map((category, index) => (
          <View key={index} style={[styles.category]}>
            <TouchableOpacity
              style={[styles.circle, { backgroundColor: category.color }]}
              onPress={() => handlePress(index, category.name)}
            >
              <Ionicons name={category.icon} size={40} color="#6B240C" />
            </TouchableOpacity>
            <Text style={styles.categoryName}>{category.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#FAF4EF", flex: 1 },
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
    color: "#6B240C",
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
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#53331B",
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  //
  categoriesContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
