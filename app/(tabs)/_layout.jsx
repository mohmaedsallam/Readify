import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Header } from "react-native/Libraries/NewAppScreen";
import HomeHeader from "../../components/HomeHeader";
import { useQuery } from "@tanstack/react-query";

export default () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Discover") {
            iconName = "compass-outline";
          } else if (route.name === "Search") {
            iconName = "search-outline";
          } else if (route.name === "More") {
            iconName = "ellipsis-horizontal-sharp";
          }
          return (
            <Ionicons
              name={iconName}
              size={28}
              color={focused ? "#A56635" : "#8F8F8F"}
            />
          );
        },
        tabBarLabel: ({ focused }) => (
          <Text
            style={{ color: focused ? "#A56635" : "#8F8F8F", fontSize: 14 }}
          >
            {route.name}
          </Text>
        ),
        tabBarActiveTintColor: "#A56635",
        tabBarStyle: {
          height: 55,
          paddingBottom: 3,
          paddingTop: 5,
        },
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#A56635",
        },
        header: () => <HomeHeader />,
      })}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#A56635",
          },
        }}
      />
      <Tabs.Screen name="Discover" options={{}} />
      <Tabs.Screen name="Search" options={{ headerShown: false }} />
      <Tabs.Screen name="More" options={{}} />
    </Tabs>
  );
};
