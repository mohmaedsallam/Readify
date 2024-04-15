import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

const Listings = ({ data: books }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={books?.items || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/listing/${item.id}`} asChild>
            <Pressable
              android_ripple={{ color: "#EEE" }}
              style={styles.container}
            >
              <Image
                source={{ uri: item.volumeInfo.imageLinks?.thumbnail }}
                style={styles.image}
              />
              <View style={styles.contentContainer}>
                <Text style={styles.title}>{item.volumeInfo.title}</Text>
                <Text>by {item.volumeInfo.authors?.join(", ")}</Text>
              </View>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,
  },
  image: {
    flex: 1,
    aspectRatio: 2 / 3,
    marginRight: 10,
    borderRadius: 4,
  },
  contentContainer: {
    flex: 4,
    borderColor: "#CCC",
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
});
