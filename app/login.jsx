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
import { login } from "../utils/auth";
import { useContext, useState } from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

const Login = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
  });

  const validateInputs = () => {
    let emailIsValid = email.trim().includes("@");
    let passwordIsValid = password.trim().length > 6;

    setCredentialsInvalid({
      email: !emailIsValid,
      password: !passwordIsValid,
    });

    if (!emailIsValid || !passwordIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      return false;
    }

    return true;
  };

  async function loginHandler() {
    if (!validateInputs()) {
      return;
    }

    setIsAuthenticating(true);
    try {
      const token = await login(email.trim(), password.trim());
      authCtx.authenticate(token);
      router.push("/BookCategoriesScreen");
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require("../assets/images/readify-no-background.png")}
      />
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder="Email"
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
      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Remember me</Text>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </View>
      <TouchableOpacity style={styles.logInBtn} onPress={loginHandler}>
        <Text style={styles.logInBtnText}>Log in</Text>
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
      <Text style={styles.signUp}>
        Don't have an account?{" "}
        <Text
          style={{ color: "#A56635", fontWeight: "bold" }}
          onPress={() => router.push("/signUp")}
        >
          Sign up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFF8F3",
  },
  icon: {
    marginHorizontal: "auto",
    // left: "25%",
    // top: "-5%",

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
  signUp: {
    textAlign: "center",
  },
  logInBtn: {
    backgroundColor: "#A56635",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 1,
  },
  logInBtnText: {
    textAlign: "center",
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default Login;
