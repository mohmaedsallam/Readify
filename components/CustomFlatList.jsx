// CustomFlatList.js
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import BookCard from "./BookCard";

const CustomFlatList = ({ ActivityIndicatorColor, query, onRefresh }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            query
          )}&key=AIzaSyBtGaliMMof_6FS8qZe6BgxWGrXJL7kuRk`
        );
        const data = await response.json();
        setBooks(data.items || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  const renderItem = ({ item }) => <BookCard book={item} />;

  return isLoading ? (
    <ActivityIndicator color={ActivityIndicatorColor} size="large" />
  ) : (
    <>
      <Text style={{ fontWeight: "bold", marginLeft: 6 }}>
        {String(query).toUpperCase()}
      </Text>
      <FlatList
        // key={key}
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={20}
      />
    </>
  );
};

export default CustomFlatList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    // backgroundColor: "#FFF8F3",
  },
});

/* 
// CustomFlatList.js
 
 
           data={books}
          renderItem={renderBook}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          initialNumToRender={20}

 

  const renderItem = ({ item }) => <BookCard book={item.volumeInfo} />;

  return isLoading ? (
    <ActivityIndicator color={ActivityIndicatorColor} size="large" />
  ) : (
    <FlatList
      data={books}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default CustomFlatList;

AIzaSyBtGaliMMof_6FS8qZe6BgxWGrXJL7kuRk
 */
