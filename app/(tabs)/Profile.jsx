import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const friendsData = [
  {
    id: "1",
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "3",
    name: "Alex Johnson",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    name: "John Davis",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: "5",
    name: "Michael B",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: "6",
    name: "Garcia",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: "7",
    name: "Martinez",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: "8",
    name: "Anderson",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    id: "9",
    name: "James Lee",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
  },
];

const Profile = () => {
  const [favoritebooks, setFavoritebooks] = useState([]);
  const router = useRouter();

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
  }, []);

  const renderBookItem = ({ item }) => {
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

  const renderFriendItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.friendContainer}>
        <Image source={{ uri: item.image }} style={styles.friendImage} />
        <Text style={styles.friendName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/88/3a/33/883a339a3bbf87677311256ac5363088.jpg",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Mo</Text>
        <Text style={styles.info}>
          {favoritebooks.length} books . 9 friends
        </Text>
      </View>

      <TouchableOpacity
        style={styles.settings}
        onPress={() => router.push("settings")}
      >
        <Ionicons name="settings-outline" size={24} color="#C27A43" />
        <Text style={styles.settingsText}>SETTINGS</Text>
      </TouchableOpacity>

      <View style={styles.booksSection}>
        <Text style={styles.sectionTitle}>{favoritebooks.length} BOOKS</Text>
        <FlatList
          data={favoritebooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.friendsSection}>
        <Text style={styles.sectionTitle}>9 FRIENDS</Text>
        <FlatList
          data={friendsData}
          renderItem={renderFriendItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.friendList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    alignItems: "center",
    padding: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#8E582E",
    borderWidth: 2,
    resizeMode: "contain",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "#3B2413",
  },
  info: {
    fontSize: 16,
    color: "gray",
    marginTop: 5,
    color: "#6E6E73",
  },
  settings: {
    alignItems: "center",
    // marginVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  settingsText: {
    fontSize: 18,
    color: "#C27A43",
    fontWeight: "bold",
    marginLeft: 5,
  },
  booksSection: {
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#C27A43",
    width: 100,
    color: "#3B2413",
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
  friendsSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    flex: 1,
  },
  friendList: {
    alignItems: "center",
  },
  row: {
    justifyContent: "space-between",
  },
  friendContainer: {
    width: 100,
    alignItems: "center",
    marginVertical: 10,
  },
  friendImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  friendName: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
    color: "#3B2413",
    fontWeight: "bold",
  },
});
