import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Notification from "../components/Notification";
import { Ionicons } from "@expo/vector-icons";
import NotificationItem from "../components/NotificationItem";
import chats from "../assets/data/chats.json";
import ChatRow from "../components/ChatRow";
import { defaultStyles } from "../constants/Styles";
const NotificationCenter = () => {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("notifications");

  const handlePress = (tab) => {
    setActiveTab(tab);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ borderRadius: 50, overflow: "hidden", marginRight: 10 }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              height: 25, // Adjust the size as needed
              width: 25, // Adjust the size as needed
              borderRadius: 50, // Make it circular
              justifyContent: "center",
              alignItems: "center",
            }}
            android_ripple={{ color: "#DDD" }}
          >
            <Ionicons name="chevron-back" size={24} color={"#FFF"} />
          </Pressable>
        </View>
      ),

      headerRight: () => <Notification />,
    });
  }, [navigation]);
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          height: 30,
          backgroundColor: "#A56635",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => handlePress("notifications")}
          style={[
            styles.pressable,
            activeTab === "notifications" && styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.text,
              activeTab === "notifications" && styles.activeText,
            ]}
          >
            Notifications
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handlePress("messages")}
          style={[
            styles.pressable,
            activeTab === "messages" && styles.activeTab,
          ]}
        >
          <Text
            style={[styles.text, activeTab === "messages" && styles.activeText]}
          >
            Messages
          </Text>
        </Pressable>
      </View>
      {activeTab === "notifications" ? (
        <>
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
        </>
      ) : (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            paddingBottom: 40,
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
          <FlatList
            data={chats}
            renderItem={({ item }) => <ChatRow {...item} />}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View style={[defaultStyles.separator, { marginLeft: 90 }]} />
            )}
            scrollEnabled={false}
          />
        </ScrollView>
      )}
    </ScrollView>
  );
};

export default NotificationCenter;

const styles = StyleSheet.create({
  pressable: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#3B2413",
  },
  text: {
    color: "white",
    fontWeight: "normal",
  },
  activeText: {
    fontWeight: "bold",
  },
});
