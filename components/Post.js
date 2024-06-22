import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

const Post = ({ name, profilePic, time, caption, postImage }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
        <View style={{ marginRight: "auto" }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Feather
          name="more-horizontal"
          style={styles.icon}
          size={24}
          color="#C27A43"
        />
      </View>

      <Text style={styles.caption}>{caption}</Text>
      <Image source={{ uri: postImage }} style={styles.postImage} />
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Ionicons
            name="heart-outline"
            size={20}
            color="#C27A43"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons
            name="chatbubble-outline"
            size={20}
            color="#C27A43"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons
            name="share-social-outline"
            size={20}
            color="#C27A43"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#FAF4EF",
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden",
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#F5E9E0",
    borderRadius: 8,
    padding: 8,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  time: {
    color: "#777",
    fontSize: 12,
  },
  caption: {
    fontSize: 14,
    // marginBottom: 2,
    color: "#333",
    fontWeight: "500",
    lineHeight: 18,
    backgroundColor: "#F5E9E0",
    padding: 10,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  postImage: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginBottom: 10,
    backgroundColor: "#F5E9E0",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#C27A43",
    fontWeight: "bold",
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
});

export default Post;
