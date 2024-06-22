import React from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Post from "../../components/Post";
import { useRouter } from "expo-router";
import { appendBaseUrl } from "expo-router/build/fork/getPathFromState";

const Home = () => {
  const router = useRouter();
  const posts = [
    {
      id: 1,
      name: "John Doe",
      profilePic:
        "http://books.google.com/books/content?id=5iTebBW-w7QC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      time: "2 hours ago",
      caption: "Had a great day at the beach!",
      postImage:
        "http://books.google.com/books/content?id=5iTebBW-w7QC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    },
    {
      id: 2,
      name: "Jane Smith",
      profilePic:
        "http://books.google.com/books/content?id=xNgstAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      time: "3 hours ago",
      caption: "Lovely evening with friends!",
      postImage:
        "http://books.google.com/books/content?id=xNgstAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    },
    // Add more posts as needed
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <Post
            key={post.id}
            name={post.name}
            profilePic={post.profilePic}
            time={post.time}
            postImage={post.postImage}
            caption={post.caption}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("addPost")}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5E9E0",
    padding: 10,
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#C78553",
    justifyContent: "center",
    alignItems: "center",
    bottom: 80,
    right: 35,
  },
});

export default Home;
