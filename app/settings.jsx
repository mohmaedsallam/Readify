import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Settings = () => {
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: false,
      headerTitle: "Settings & Support",
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
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Settings</Text>
        <Ionicons name="chevron-forward" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>App interface language</Text>
        <Ionicons name="chevron-forward" size={24} color="gray" />
      </TouchableOpacity>
      <Text style={styles.subText}>English (United States)</Text>
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push("help")}
      >
        <Text style={styles.optionText}>Help</Text>
        <Ionicons name="chevron-forward" size={24} color="gray" />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Readify</Text>
      </View>
      <Text style={styles.description}>
        Find more books you'll love.{"\n"}
        Use the scan feature to easily keep track of books.{"\n"}
        Get recommendations from readers like you.
      </Text>
      <View style={styles.linksContainer}>
        <TouchableOpacity>
          <Text style={styles.link}> Terms of Use .</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.link}>Privacy Policy .</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.link}>Ads Policy .</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.link}>Open Source Software</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.version}>Version 2.56.0 ©2024</Text>
      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>SIGN OUT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  optionText: {
    fontSize: 16,
    color: "#472C17",
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#5F3A1F",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
    color: "#3B2413",
  },
  linksContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  link: {
    color: "#764926",
    marginHorizontal: 5,
    marginVertical: 2,
  },
  version: {
    textAlign: "center",
    color: "gray",
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  signOutText: {
    color: "#764926",
    fontWeight: "bold",
  },
});
