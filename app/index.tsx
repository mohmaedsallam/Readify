import { View, Text, Image } from "react-native";
import React from "react";

import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
const index = () => {
  const router = useRouter();
  const handleEndOnboarding = () => router.push("/loginSignUp");
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />

      <Onboarding
        onDone={handleEndOnboarding}
        onSkip={handleEndOnboarding}
        pages={[
          {
            backgroundColor: "#FFF",
            image: (
              <LottieView
                source={require("../assets/images/reading-while-setting.json")}
                autoPlay
                loop
                style={{ width: 300, height: 300 }}
              />
            ),
            title: "Readify",
            subtitle:
              "The reading of all good books is like conversation with the finest (people) of the past centuries.",
          },
          {
            backgroundColor: "#FFF8F3",
            image: (
              <LottieView
                // source={require("../assets/images/reading-while-setting.json")}
                source={require("../assets/images/sliding-books.json")}
                autoPlay
                loop
                style={{ width: 300, height: 300 }}
              />
            ),
            title: "Readify",
            subtitle: "Books are a uniquely portable magic.",
          },
        ]}
      />
    </View>
  );
};

export default index;
