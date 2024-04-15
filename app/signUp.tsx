import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  // CheckBox,
} from "react-native";
import { useRouter } from "expo-router";

const SignUp = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require("../assets/images/readify-no-background.png")}
      />
      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
      />
      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Remember me</Text>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </View>
      <TouchableOpacity
        style={styles.signUpBtn}
        onPress={() => router.push("/signUp")}
      >
        <Text
          style={styles.signUpBtnText}
          onPress={() => router.push("/BookCategoriesScreen")}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
      <Text style={styles.or}>OR</Text>
      <View style={styles.socialLogins}>
        <Image
          style={styles.socialIcon}
          source={require("../assets/images/facebook.jpeg")}
        />
        <Image
          style={styles.socialIcon}
          source={require("../assets/images/google.jpeg")}
        />
      </View>
      <Text style={styles.login}>
        Already have an account?{" "}
        <Text
          onPress={() => router.push("/login")}
          style={{ color: "#A56635", fontWeight: "bold" }}
        >
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFF8F3",
  },
  icon: {
    marginHorizontal: "auto",
    left: "25%",
    top: "-5%",
    marginBottom: 20,
    width: 180,
    height: 160,
  },
  input: {
    height: 55,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  label: {
    margin: 8,
  },
  forgotPassword: {
    marginLeft: "auto",
  },
  or: {
    textAlign: "center",
    marginBottom: 10,
  },
  socialLogins: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  socialIcon: {
    width: 50,
    height: 50,
  },
  login: {
    textAlign: "center",
  },
  signUpBtn: {
    backgroundColor: "#A56635",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 1,
  },
  signUpBtnText: {
    textAlign: "center",
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default SignUp;
