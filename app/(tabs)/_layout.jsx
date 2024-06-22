import React from "react";
import { Text, StatusBar } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import Notification from "../../components/Notification";

export default () => {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#A56635" />

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
            } else if (route.name === "MyBooks") {
              iconName = "ellipsis-horizontal-sharp";
            } else if (route.name === "Profile") {
              iconName = "person-circle-outline";
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
            backgroundColor: "#FAF4EF",
          },
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#A56635",
          },

          headerRight: () => <Notification />,
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
        <Tabs.Screen
          name="MyBooks"
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{ color: focused ? "#A56635" : "#8F8F8F", fontSize: 14 }}
              >
                My Books
              </Text>
            ),
            tabBarIcon: ({ focused }) => {
              return (
                <AntDesign
                  name="book"
                  size={28}
                  color={focused ? "#A56635" : "#8F8F8F"}
                />
              );
            },
          }}
          title="My books"
        />
        <Tabs.Screen name="Discover" options={{}} />
        <Tabs.Screen name="Search" options={{ headerShown: true }} />
        <Tabs.Screen name="Profile" options={{}} />
      </Tabs>
    </>
  );
};
