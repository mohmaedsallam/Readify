import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { createUser } from "../utils/auth";
import LoadingOverlay from "../components/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

const SignUp = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  const validateInputs = () => {
    let emailIsValid = email.trim().includes("@");
    let passwordIsValid = password.trim().length > 6;
    let emailsAreEqual = email.trim() === confirmEmail.trim();
    let passwordsAreEqual = password.trim() === confirmPassword.trim();

    setCredentialsInvalid({
      email: !emailIsValid,
      confirmEmail: !emailIsValid || !emailsAreEqual,
      password: !passwordIsValid,
      confirmPassword: !passwordIsValid || !passwordsAreEqual,
    });

    if (
      !emailIsValid ||
      !passwordIsValid ||
      !emailsAreEqual ||
      !passwordsAreEqual
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      return false;
    }

    return true;
  };

  async function signupHandler() {
    if (!validateInputs()) {
      return;
    }

    setIsAuthenticating(true);
    try {
      const token = await createUser(email.trim(), password.trim());
      authCtx.authenticate(token);
      router.push("/BookCategoriesScreen");
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again later."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require("../assets/images/readify-no-background.png")}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Email"
        autoCapitalize="none"
        value={confirmEmail}
        onChangeText={setConfirmEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        autoCapitalize="none"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Remember me</Text>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </View>
      <TouchableOpacity style={styles.signUpBtn} onPress={signupHandler}>
        <Text style={styles.signUpBtnText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.or}>OR</Text>
      <View style={styles.socialLogins}>
        <TouchableOpacity>
          <Image
            style={styles.socialIcon}
            source={require("../assets/images/facebook.jpeg")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.socialIcon}
            source={require("../assets/images/google.jpeg")}
          />
        </TouchableOpacity>
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
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 15,
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
    marginBottom: 15,
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
