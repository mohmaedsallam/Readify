// addPost.js
import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Platform,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Post from "../components/Post";

const addPost = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: false,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            // Handle submit post
            console.log("Post submitted:", { caption, image });
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
  }, [navigation, caption, image]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const submitPost = () => {
    // Handle submit post
    console.log("Post submitted:", { caption, image });
    // Code to send data to Firebase will be added here
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Caption</Text> */}
      <TextInput
        style={styles.input}
        value={caption}
        onChangeText={setCaption}
        placeholder="Enter caption"
      />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Post
          name="Preview"
          profilePic="https://via.placeholder.com/50" // Placeholder for the profile pic in the preview
          time="Just now"
          postImage={image}
          caption={caption}
        />
      )}
      {/* <TouchableOpacity style={styles.submitButton} onPress={submitPost}>
        <Text style={styles.submitButtonText}>Submit Post</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default addPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F5E9E0",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: "#FFF",
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: "#C78553",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
