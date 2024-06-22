import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const DiscussionForum = ({ bookId }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    // Fetch posts for the specific book
    fetchPosts(bookId);
  }, [bookId]);

  const fetchPosts = async (id) => {
    // API call to fetch posts
    // setPosts(fetchedPosts);
  };

  const addPost = async () => {
    // API call to add a new post
    // After successful addition:
    // fetchPosts(bookId);
    setNewPost("");
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postAuthor}>{item.author}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <Text style={styles.postDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newPost}
          onChangeText={setNewPost}
          placeholder="Add to the discussion..."
        />
        <TouchableOpacity style={styles.button} onPress={addPost}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  postContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  postAuthor: {
    fontWeight: "bold",
  },
  postContent: {
    marginTop: 5,
  },
  postDate: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DiscussionForum;
